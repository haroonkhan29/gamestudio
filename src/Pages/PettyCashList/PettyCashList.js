import React, { useState, useEffect } from 'react';
import './PettyCash.css'; 
import DateFilterInput from './DateFilterInput';

const PettyCashList = () => {
  const [pettyCashData, setPettyCashData] = useState([]);
  const [totalCashIn, setTotalCashIn] = useState(0);
  const [totalCashOut, setTotalCashOut] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [editableRow, setEditableRow] = useState(null);
  const [rowData, setRowData] = useState({}); 
  const [imageChanges, setImageChanges] = useState({}); 
  const [selectedDate, setSelectedDate] = useState(""); 
  const [showTable, setShowTable] = useState(true);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  useEffect(() => {
    calculateTotals();
    calculateTotalBalance();
  }, [pettyCashData]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/pettycash');
      const data = await response.json();
      let filteredData = data;
      if (selectedDate) {
        filteredData = data.filter(item => item.date === selectedDate);
      }
      setPettyCashData(filteredData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateTotal = (field) => {
    return pettyCashData.reduce((total, expense) => total + parseFloat(expense[field] || 0), 0);
  };

  const calculateTotals = () => {
    const cashInTotal = calculateTotal('cashIn');
    const cashOutTotal = calculateTotal('cashOut');
    setTotalCashIn(cashInTotal);
    setTotalCashOut(cashOutTotal);
  };

  const calculateTotalBalance = () => {
    const balance = totalCashIn - totalCashOut;
    setTotalBalance(balance);
  };

  const handleEditClick = (id) => {
    setEditableRow(id);
  };

  const handleCellEdit = (id, field, value) => {
    const updatedData = pettyCashData.map((item) => {
      if (item._id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setPettyCashData(updatedData);
    setRowData({ ...rowData, [id]: { ...rowData[id], [field]: value } }); 
  };

  const handleImageChange = (id, file) => {
    setImageChanges({ ...imageChanges, [id]: file });
  };

  const handleUpdateClick = async (id) => {
    const updatedItem = pettyCashData.find(item => item._id === id);
    try {
      const formData = new FormData();
      for (const key in updatedItem) {
        formData.append(key, rowData[id]?.[key] || updatedItem[key]);
      }
      if (imageChanges[id]) {
        formData.append('image', imageChanges[id]);
      }

      const response = await fetch(`http://localhost:8080/pettycash/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        setEditableRow(null);
        setImageChanges({ ...imageChanges, [id]: null }); 
        fetchData();
      } else {
        console.error('Failed to update item.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/pettycash/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData(); 
      } else {
        console.error('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openFullScreenImage = (imageSrc) => {
    setSelectedImageSrc(imageSrc);
    setShowFullScreenImage(true);
    setShowTable(false); // Hide the table
  };

  const closeFullScreenImage = () => {
    setSelectedImageSrc(null);
    setShowFullScreenImage(false);
    setShowTable(true); // Show the table
  };

  return (
    <div>
      <div className="header">
        <h1>Petty Cash View</h1>
      </div>
      <DateFilterInput selectedDate={selectedDate} handleDateChange={handleDateChange} />
      {showTable && (
      <table className="customs-table">
        <thead>
          <tr className="month-header">
            <th>Date</th>
            <th>Expense Description</th>
            <th>Remarks</th>
            <th>Quantity</th>
            <th>Cash In</th>
            <th>Cash Out</th>
            <th>Image</th>
            <th className='year-header'>Balance</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {pettyCashData
            .sort((a, b) => new Date(b.date) - new Date(a.date)) 
            .map((item) => (
              <tr key={item._id}>
                <td>
                  {editableRow === item._id ? (
                    <input type="date" defaultValue={item.date} onBlur={(e) => handleCellEdit(item._id, 'date', e.target.value)} />
                  ) : (
                    new Date(item.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'numeric', year: 'numeric' })
                  )}
                </td>             
                <td>
                  {editableRow === item._id ? (
                    <select defaultValue={item.expenseDescription} onBlur={(e) => handleCellEdit(item._id, 'expenseDescription', e.target.value)}>
                      {["Air Freshener", "Bike Maintenance", "Drinking Water", "Electricity bill", "Event Expense", "Harpic + sweep+Duster+Mop", "Internet Bill Naya Tel", "Internet Bill of Devices", "Internet PTCL Bill", "Maintenance", "Others", "Petrol", "Phone bill", "Refreshment for Guest", "Sugar", "Sewerage Bill", "Tea Bags", "Tea Bags (Green Tea)", "Tea Milk", "Tissue Box", "Tissue hygiene washroom", "Tissue Roll", "Water Supply Tank"].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    item.expenseDescription
                  )}
                </td>
                <td>{editableRow === item._id ? <input type="text" defaultValue={item.remarks} onBlur={(e) => handleCellEdit(item._id, 'remarks', e.target.value)} /> : item.remarks}</td>
                <td>{editableRow === item._id ? <input type="text" defaultValue={item.quantity} onBlur={(e) => handleCellEdit(item._id, 'quantity', e.target.value)} /> : item.quantity}</td>
                <td>{editableRow === item._id ? <input type="text" defaultValue={item.cashIn || 0} onBlur={(e) => handleCellEdit(item._id, 'cashIn', e.target.value)} /> : item.cashIn || 0}</td>
                <td>{editableRow === item._id ? <input type="text" defaultValue={item.cashOut || 0} onBlur={(e) => handleCellEdit(item._id, 'cashOut', e.target.value)} /> : item.cashOut || 0}</td>
                <td>
                  {editableRow === item._id ? (
                    <input type="file" onChange={(e) => handleImageChange(item._id, e.target.files[0])} accept="image/*" />
                  ) : (
                    item.image && (
                      <img
                        src={`http://localhost:8080/${item.image}`}
                        alt="Expense Receipt"
                        style={{ maxWidth: '100px' }}
                        onClick={() => openFullScreenImage(`http://localhost:8080/${item.image}`)}
                      />
                    )
                  )}
                </td>
                <td>{(!isNaN(parseFloat(item.cashIn)) ? parseFloat(item.cashIn) : 0) - (!isNaN(parseFloat(item.cashOut)) ? parseFloat(item.cashOut) : 0)}</td>
                <td className="button-container">
                  {editableRow === item._id && (Object.keys(rowData[item._id] || {}).length > 0 || imageChanges[item._id]) ? (
                    <button onClick={() => handleUpdateClick(item._id)}>Update</button>
                  ) : (
                    <button onClick={() => handleEditClick(item._id)}>{editableRow === item._id ? 'Update' : 'Edit'}</button>
                  )}
                </td>
                <td className="button-container">
                  <button onClick={() => handleDeleteClick(item._id)}>
                    <i className="" style={{ color: "white" }}></i> Delete
                  </button>
                </td>
                <td className='button-container'>
                <button onClick={() => openFullScreenImage(`http://localhost:8080/${item.image}`)}>View</button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="totalHeader"><strong>Total</strong></td>
            <td className="total">{totalCashIn}</td>
            <td className="total">{totalCashOut}</td>
            <td className='totalHeader'></td>
            <td className="balance">{totalBalance}</td>
            <td className="balances">Edit</td>
            <td className="balances">Delete</td>
            <td className="balances">View</td>
          </tr>
        </tfoot>
      </table>
)}

      {showFullScreenImage && selectedImageSrc && (
        <div className="full-screen-image-modal">
          <div className="modal-content">
            <div className="close-icon" onClick={closeFullScreenImage}>
              &times;
            </div>
            <img src={selectedImageSrc} alt="Full Size" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PettyCashList;

import React, { useState } from 'react';
import './PettyCashForm.css'; 

const PettyCashForm = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const initialFormData = {
    date: currentDate,
    expenseDescription: '',
    remarks: '',
    quantity: '',
    cashIn: '',
    cashOut: '',
    image: null
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('date', formData.date);
    formDataToSend.append('expenseDescription', formData.expenseDescription);
    formDataToSend.append('remarks', formData.remarks);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('cashIn', formData.cashIn);
    formDataToSend.append('cashOut', formData.cashOut);
    formDataToSend.append('image', formData.image);

    try {
      const response = await fetch('http://localhost:8080/pettycash', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      console.log(data); 
      setSubmitted(true);
      setFormData(initialFormData); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const expenseDescriptions = [
    "Air Freshener",
    "Bike Maintenance",
    "Drinking Water",
    "Electricity bill",
    "Event Expense",
    "Harpic + sweep+Duster+Mop",
    "Internet Bill Naya Tel",
    "Internet Bill of Devices",
    "Internet PTCL Bill",
    "Maintenance",
    "Others",
    "Petrol",
    "Phone bill",
    "Refreshment for Guest",
    "Sugar",
    "Sewerage Bill",
    "Tea Bags",
    "Tea Bags (Green Tea)",
    "Tea Milk",
    "Tissue Box",
    "Tissue hygiene washroom",
    "Tissue Roll",
    "Water Supply Tank"
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const formInputs = document.querySelectorAll('input, select'); 
      const currentIndex = Array.from(formInputs).indexOf(e.target); 
  
      if (currentIndex < formInputs.length - 1) {
        const nextInput = formInputs[currentIndex + 1];
        nextInput.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      const formInputs = [
        'date',
        'expenseDescription',
        'remarks',
        'quantity',
        'cashIn',
        'cashOut',
        'image'
      ];
      const currentIndex = formInputs.indexOf(e.target.name);
  
      if (currentIndex > 0) {
        const previousInput = document.getElementsByName(formInputs[currentIndex - 1])[0];
        previousInput.focus();
      }
    } else if (e.key === 'ArrowRight') {
      const formInputs = [
        'date',
        'expenseDescription',
        'remarks',
        'quantity',
        'cashIn',
        'cashOut',
        'image'
      ];
      const currentIndex = formInputs.indexOf(e.target.name);
        if (currentIndex < formInputs.length - 1) {
        const nextInput = document.getElementsByName(formInputs[currentIndex + 1])[0];
        nextInput.focus();
      }
    }
  };
  

  return (
    <div>
      <div className="header">
        <h1>Petty Cash</h1>
      </div>
      <div className="bank-detail-formss" onKeyDown={handleKeyDown} tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Expense</th>
              <th>Remarks</th>
              <th>Quantity</th>
              <th>Cash In</th>
              <th>Cash Out</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="date" name="date" value={formData.date} onChange={handleChange} /></td>
              <td>
                <select name="expenseDescription" value={formData.expenseDescription} onChange={handleChange}>
                  <option value="">Select Expense Description</option>
                  {expenseDescriptions.map((expense, index) => (
                    <option key={index} value={expense}>{expense}</option>
                  ))}
                </select>
              </td>
              <td><input type="text" name="remarks" value={formData.remarks} onChange={handleChange} /></td>
              <td><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} /></td>
              <td><input type="number" name="cashIn" value={formData.cashIn} onChange={handleChange} /></td>
              <td><input type="number" name="cashOut" value={formData.cashOut} onChange={handleChange} /></td>
              <td><input type="file" name="image" onChange={handleFileChange} /></td>
            </tr>
          </tbody>
        </table>
        <button className='saving' type="button" onClick={handleSubmit}>Save</button>
        {submitted && <p>Success!</p>}
      </div>
    </div>
  );
};

export default PettyCashForm;



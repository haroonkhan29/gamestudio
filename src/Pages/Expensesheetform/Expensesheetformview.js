import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";

const Expensesheetformview = () => {
    const [showWelcome, setShowWelcome] = useState(false);
  const { progressDetails, setProgressDetails } = useProgressContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [employeesProgress, setEmployeesProgress] = useState([]);
  const [officesProgress, setOfficesProgress] = useState([]);
  const [marketingsProgress, setMarketingsProgress] = useState([]);
  const [eventssProgress, setEventssProgress] = useState([]);
  const [editedEmployeeData, setEditedEmployeeData] = useState({});
  const [editedOfficeData, setEditedOfficeData] = useState({});
  const [editedMarketingData, setEditedMarketingData] = useState({});
  const [editedEventsData, setEditedEventsData] = useState({});

  useEffect(() => {
    fetchAllProgress();
  }, []);


  const handleDelete = (deletedProgressId) => {
    setEmployeesProgress(employeesProgress.filter(detail => detail._id !== deletedProgressId));
    setOfficesProgress(officesProgress.filter(detail => detail._id !== deletedProgressId));
    setMarketingsProgress(marketingsProgress.filter(detail => detail._id !== deletedProgressId));
    setEventssProgress(eventssProgress.filter(detail => detail._id !== deletedProgressId));
};


  const fetchAllProgress = async () => {
    try {
      const response = await axios.get("http://localhost:8080/expensesheet");
      const progressData = response.data;
      setProgressDetails(progressData);
      setEmployeesProgress(progressData.filter(detail => detail.employeesCost));
      setOfficesProgress(progressData.filter(detail => detail.officesCost));
      setMarketingsProgress(progressData.filter(detail => detail.marketingsCost));
      setEventssProgress(progressData.filter(detail => detail.eventss));

    } catch (error) {
      setError("No Internet!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSuccess = () => {
    // setSuccessMessage("Changes saved successfully!");
    // setTimeout(() => {
    //   setSuccessMessage(null);
    // }, 3000);
    fetchAllProgress(); 
  };


  const handleNextButtonClick = () => {
    setShowWelcome(true);
  };
  const navigate = useNavigate();
  
    const handleBackButtonClick = () => {
      navigate(-1); 
    };

    
  if (loading) return <CircularProgress />;
  if (error) return <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>;

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div className="header">
        <h1>Expense 2024</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
         <Link to="/next-sheet">
          </Link>
      <button onClick={handleBackButtonClick}  style={{ marginBottom: '10px' }}>Back</button>
      {showWelcome && <h2>Hello, Welcome!</h2>}
      </div>
      <div>
        <DataTable
          progressData={employeesProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Employees Costs"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedEmployeeData} 
          setEditedData={setEditedEmployeeData} 
        />
      </div>

      <div>
        <DataTable
          progressData={officesProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Offices Costs"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedOfficeData} // Pass edited data for office table
          setEditedData={setEditedOfficeData} // Function to set edited data for office table
        />
      </div>

      <div>
        <DataTable
          progressData={marketingsProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Marketing Cost"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedMarketingData} // Pass edited data for marketing table
          setEditedData={setEditedMarketingData} // Function to set edited data for marketing table
        />
      </div>
     
      <div>
        <DataTable
          progressData={eventssProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Events Activitie"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedEventsData} // Pass edited data for events table
          setEditedData={setEditedEventsData} // Function to set edited data for events table
        />
      </div>

      <div>
        <TotalTable
          employeesProgress={employeesProgress}
          officesProgress={officesProgress}
          onDelete={handleDelete} // Pass handleDelete function
          marketingsProgress={marketingsProgress}
          eventssProgress={eventssProgress}
        />
      </div>
    </div>
  );
};

const DataTable = ({ progressData, onSaveSuccess, onDelete, header, editedData, setEditedData }) => {
  const [localEditedData, setLocalEditedData] = useState({});
    const inputRefs = useRef([]);
  
    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, progressData.length);
    }, [progressData]);
  
    const handleSave = async (index) => {
      if (progressData[index]) {
        const progressId = progressData[index]._id;
        try {
          await axios.put(`http://localhost:8080/expensesheet/${progressId}`, editedData[index]);
          onSaveSuccess();
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      } else {
        console.error("Error: progressData[index] is undefined.");
      }
    };
    const handleDelete = async (progressId) => {
      try {
          await axios.delete(`http://localhost:8080/expensesheet/${progressId}`);
          onSaveSuccess();
          onDelete(progressId); // Update state to remove the deleted row
      } catch (error) {
          console.error("Error deleting progress:", error);
      }
  };
    const handleInputChange = (e, key, id) => {
      const { value } = e.target;
      setEditedData(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          [key]: value,
        },
      }));
      handleSave(id);

    };
  
    const handleKeyDown = (e, rowIndex, colIndex) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const nextColIndex = colIndex === 12 ? 1 : colIndex + 0;
        if (nextColIndex < 12) {
          const nextInput = inputRefs.current[rowIndex][nextColIndex];
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    };
  
    const calculateSubtotals = () => {
      const subtotals = {
        jans: 0, febs: 0, marchs: 0, aprils: 0, mays: 0, junes: 0,
        julys: 0, augs: 0, seps: 0, octs: 0, novs: 0, decs: 0,
      };
  
      progressData.forEach(detail => {
        subtotals.jans += parseFloat(detail.jans) || 0;
        subtotals.febs += parseFloat(detail.febs) || 0;
        subtotals.marchs += parseFloat(detail.marchs) || 0;
        subtotals.aprils += parseFloat(detail.aprils) || 0;
        subtotals.mays += parseFloat(detail.mays) || 0;
        subtotals.junes += parseFloat(detail.junes) || 0;
        subtotals.julys += parseFloat(detail.julys) || 0;
        subtotals.augs += parseFloat(detail.augs) || 0;
        subtotals.seps += parseFloat(detail.seps) || 0;
        subtotals.octs += parseFloat(detail.octs) || 0;
        subtotals.novs += parseFloat(detail.novs) || 0;
        subtotals.decs += parseFloat(detail.decs) || 0;
      });
  
      return subtotals;
    };
  
    const subtotals = calculateSubtotals();
  
    const headerStyle = {
      // backgroundColor: header === "Employee Cost" ? "#5d7b9c" : "pink",
      // color: header === "Employee Cost" ? "white" : "black"
    };
    const isEditable = (header, key) => {
      const nonEditableHeaders = ["Employees Costs", "Offices Costs", "Marketing Cost", "Events Activitie"];
      return !nonEditableHeaders.includes(header) || (key !== "employeesCost" && key !== "officesCost" && key !== "marketingsCost" && key !== "eventss");
    };
    const formatYearTotal = (total) => {
      return total.endsWith(".00") ? total.slice(0, -3) : total;
    };
    return (
      <div>
        {header === "Employee Cost" && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => handleSave(0)} style={{ marginBottom: '10px' }}>
              Save
            </button>
          </div>
        )}
        <table className="styled-tabl">
          {/* <thead>
            <tr>
              <th></th>
              <th className="expense-header" colSpan="">Actual/Expenses</th>
              <th>JAN</th>
              <th>FEB</th>
              <th>MAR</th>
              <th>APR</th>
              <th>MAY</th>
              <th>JUN</th>
              <th>JUL</th>
              <th>AUG</th>
              <th>SEPT</th>
              <th>OCT</th>
              <th>NOV</th>
              <th>DEC</th>
              <th>YEAR</th>
              <th>Action</th>
            </tr>
          </thead> */}
          <thead className="styled-tabl">
          <tr className="" style={headerStyle}>
              <th>S.No</th>
              {header === "Employees Costs" ? (
                
            <th className="no-wrap employee-costs-header"  style={{marginLeft: '20px'}}>{header}</th>
          ) : header === "Marketing Cost" ? (
            <th className="no-wrap Marketing-costs-header" style={{marginLeft: '20px'}}>{header}</th>
          ) : header === "Events Activitie" ? (
            <th className="no-wrap Events-costs-header" style={{marginLeft: '20px'}}>{header}</th>
          // ) : header === "Offices Costs" ? (
          //   <th className="no-wrap" style={{marginLeft: ''}}>{header}</th>
          ) : (
              <th  className="no-wrap">{header}</th>
            )}
              <th>JAN</th>
              <th>FEB</th>
              <th>MAR</th>
              <th>APR</th>
              <th>MAY</th>
              <th>JUN</th>
              <th>JUL</th>
              <th>AUG</th>
              <th>SEPT</th>
              <th>OCT</th>
              <th>NOV</th>
              <th>DEC</th>
              <th className="year-header" style={{ backgroundColor: "yellow", color: "black" }}>YEAR</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((detail, rowIndex) => (
              <React.Fragment key={detail._id}>
                {rowIndex === 7 && (
                  <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
                  </tr>
                )}
                <tr key={`dataRow${detail._id}`}>
                  <td>{rowIndex + 1}</td>
                  <td className="no-wrap">
                  {isEditable(header, "employeesCost") ? (
                    <input
                      style={{ background: "#5d7b9c", color: 'white', fontWeight: "bold" }}
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.employeesCost || editedData[rowIndex]?.officesCost || editedData[rowIndex]?.marketingsCost || editedData[rowIndex]?.eventss || detail.employeesCost || detail.officesCost || detail.marketingsCost || detail.eventss || ""}
                      onChange={(e) => handleInputChange(e, "employeesCost", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      //   onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                    />
                ) : (
                    <span style={{ color: 'rgb(2, 131, 211)', fontWeight: 'bold' }}>
                    {detail.employeesCost || detail.officesCost || detail.marketingsCost || detail.eventss}
                  </span>
                )}
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.jans || editedData[rowIndex]?.officesjan || editedData[rowIndex]?.marketingsjan || editedData[rowIndex]?.eventssjan || detail.jans || detail.officesjan || detail.marketingjsan || detail.eventssjan || ""}
                      onChange={(e) => handleInputChange(e, "jans", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.febs || editedData[rowIndex]?.officesfeb || editedData[rowIndex]?.marketingsfeb || editedData[rowIndex]?.eventssfeb || detail.febs || detail.officesfeb || detail.marketingsfeb || detail.eventssfeb || ""}
                      onChange={(e) => handleInputChange(e, "febs", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.marchs || editedData[rowIndex]?.officesmarch || editedData[rowIndex]?.marketingsmarch || editedData[rowIndex]?.eventssmarch || detail.marchs || detail.officesmarch || detail.marketingsmarch || detail.eventssmarch || ""}
                      onChange={(e) => handleInputChange(e, "marchs", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={
                        editedData[rowIndex]?.aprils ||
                        editedData[rowIndex]?.officesapril ||
                        editedData[rowIndex]?.marketingsapril ||
                        editedData[rowIndex]?.eventssapril ||
                        detail.aprils ||
                        detail.officesapril ||
                        detail.marketingsapril ||
                        detail.eventssapril ||
                        ""
                      }
                      onChange={(e) => handleInputChange(e, "aprils", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.mays || editedData[rowIndex]?.officesmay || editedData[rowIndex]?.marketingsmay || editedData[rowIndex]?.eventssmay || detail.mays || detail.officesmay || detail.marketingsmay || detail.eventssmay || ""}
                      onChange={(e) => handleInputChange(e, "mays", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.junes || editedData[rowIndex]?.officesjune || editedData[rowIndex]?.marketingsjune || editedData[rowIndex]?.eventssjune || detail.junes || detail.officesjune || detail.marketingsjune || detail.eventssjune || ""}
                      onChange={(e) => handleInputChange(e, "junes", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.julys || editedData[rowIndex]?.officesjuly || editedData[rowIndex]?.marketingsjuly || editedData[rowIndex]?.eventssjuly || detail.julys || detail.officesjuly || detail.marketingsjuly || detail.eventssjuly || ""}
                      onChange={(e) => handleInputChange(e, "julys", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.augs || editedData[rowIndex]?.officesaug || editedData[rowIndex]?.marketingsaug || editedData[rowIndex]?.eventssaug || detail.augs || detail.officesaug || detail.marketingsaug || detail.eventssaug || ""}
                      onChange={(e) => handleInputChange(e, "augs", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 8)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.seps || editedData[rowIndex]?.officessep || editedData[rowIndex]?.marketingssep || editedData[rowIndex]?.eventsssep || detail.seps || detail.officessep || detail.marketingssep || detail.eventsssep || ""}
                      onChange={(e) => handleInputChange(e, "seps", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 9)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.octs || editedData[rowIndex]?.officesoct || editedData[rowIndex]?.marketingsoct || editedData[rowIndex]?.eventssoct || detail.octs || detail.officesoct || detail.marketingsoct || detail.eventssoct || ""}
                      onChange={(e) => handleInputChange(e, "octs", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 10)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.novs || editedData[rowIndex]?.officesnov || editedData[rowIndex]?.marketingsnov || editedData[rowIndex]?.eventssnov || detail.novs || detail.officesnov || detail.marketingsnov || detail.eventssnov || ""}
                      onChange={(e) => handleInputChange(e, "novs", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 11)}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.decs || editedData[rowIndex]?.officesdec || editedData[rowIndex]?.marketingsdec || editedData[rowIndex]?.eventssdec || detail.decs || detail.officesdec || detail.marketingsdec || detail.eventssdec || ""}
                      onChange={(e) => handleInputChange(e, "decs", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 12)}
                    />
                  </td>
                  <td className="year-header">
                    <input
                      style={{ background: "", color: "rgb(2, 131, 211)", fontWeight: "bold" }}
                      value={formatYearTotal((
                        parseFloat(editedData[rowIndex]?.jans || detail.jans || 0) +
                        parseFloat(editedData[rowIndex]?.febs || detail.febs || 0) +
                        parseFloat(editedData[rowIndex]?.marchs || detail.marchs || 0) +
                        parseFloat(editedData[rowIndex]?.aprils || detail.aprils || 0) +
                        parseFloat(editedData[rowIndex]?.mays || detail.mays || 0) +
                        parseFloat(editedData[rowIndex]?.junes || detail.junes || 0) +
                        parseFloat(editedData[rowIndex]?.julys || detail.julys || 0) +
                        parseFloat(editedData[rowIndex]?.augs || detail.augs || 0) +
                        parseFloat(editedData[rowIndex]?.seps || detail.seps || 0) +
                        parseFloat(editedData[rowIndex]?.octs || detail.octs || 0) +
                        parseFloat(editedData[rowIndex]?.novs || detail.novs || 0) +
                        parseFloat(editedData[rowIndex]?.decs || detail.decs || 0)
                      ).toFixed(2))}
                      disabled
                    />
                  </td>
                  <td className="button-container">
                                <button onClick={() => handleDelete(detail._id)}>
                                <i className="" style={{ color: "white" }}></i> Delete
                                </button>
                            </td>
                </tr>
              </React.Fragment>
            ))}
            <tr style={{ fontWeight: "bold", color: "rgb(255, 255, 255)", backgroundColor: "rgb(36, 163, 115)" , marginRight: "30px" }}>
              <td colSpan="2" className="subtotal-cell">Subtotal</td>
              <td>{subtotals.jans}</td>
              <td>{subtotals.febs}</td>
              <td>{subtotals.marchs}</td>
              <td>{subtotals.aprils}</td>
              <td>{subtotals.mays}</td>
              <td>{subtotals.junes}</td>
              <td>{subtotals.julys}</td>
              <td>{subtotals.augs}</td>
              <td>{subtotals.seps}</td>
              <td>{subtotals.octs}</td>
              <td>{subtotals.novs}</td>
              <td>{subtotals.decs}</td>
              <td className="subtotal-value">{Object.values(subtotals).reduce((sum, value) => sum + value, 0)}</td>
              <td>Action</td>

            </tr>
                   </tbody>
        </table>
      </div>
    );
  };

  const TotalTable = ({ employeesProgress, officesProgress, marketingsProgress, eventssProgress }) => {
    const totalSubtotals = {
      jans: 0, febs: 0, marchs: 0, aprils: 0, mays: 0, junes: 0,
      julys: 0, augs: 0, seps: 0, octs: 0, novs: 0, decs: 0,
    };
  
    [employeesProgress, officesProgress, marketingsProgress, eventssProgress].forEach(progressData => {
      progressData.forEach(detail => {
        totalSubtotals.jans += parseFloat(detail.jans) || 0;
        totalSubtotals.febs += parseFloat(detail.febs) || 0;
        totalSubtotals.marchs += parseFloat(detail.marchs) || 0;
        totalSubtotals.aprils += parseFloat(detail.aprils) || 0;
        totalSubtotals.mays += parseFloat(detail.mays) || 0;
        totalSubtotals.junes += parseFloat(detail.junes) || 0;
        totalSubtotals.julys += parseFloat(detail.julys) || 0;
        totalSubtotals.augs += parseFloat(detail.augs) || 0;
        totalSubtotals.seps += parseFloat(detail.seps) || 0;
        totalSubtotals.octs += parseFloat(detail.octs) || 0;
        totalSubtotals.novs += parseFloat(detail.novs) || 0;
        totalSubtotals.decs += parseFloat(detail.decs) || 0;
      });
    });
  
    const total = Object.values(totalSubtotals).reduce((sum, value) => sum + value, 0);
  
    return (
      <div>
        <table className="styled-tabl">
          <thead>
          <tr>
            <th>Total Expenses</th>
              <th>JAN</th>
              <th>FEB</th>
              <th>MAR</th>
              <th>APR</th>
              <th>MAY</th>
              <th>JUNE</th>
              <th>JULY</th>
              <th>AUG</th>
              <th>SEPT</th>
              <th>OCT</th>
              <th>NOV</th>
              <th>DEC</th>
              <th>YEAR</th>
    
            </tr>
          </thead>
          <tbody>
          <tr className="month-header ">        
              <td className="subtotal-cell">Total Expenses</td>
              <td className="subtotal-cell">{totalSubtotals.jans}</td>
              <td className="subtotal-cell">{totalSubtotals.febs}</td>
              <td className="subtotal-cell">{totalSubtotals.marchs}</td>
              <td className="subtotal-cell">{totalSubtotals.aprils}</td>
              <td className="subtotal-cell">{totalSubtotals.mays}</td>
              <td className="subtotal-cell">{totalSubtotals.junes}</td>
              <td className="subtotal-cell">{totalSubtotals.julys}</td>
              <td className="subtotal-cell">{totalSubtotals.augs}</td>
              <td className="subtotal-cell">{totalSubtotals.seps}</td>
              <td className="subtotal-cell">{totalSubtotals.octs}</td>
              <td className="subtotal-cell">{totalSubtotals.novs}</td>
              <td className="subtotal-cell"> {totalSubtotals.decs}</td>
              <td className="year-header">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
export default Expensesheetformview;

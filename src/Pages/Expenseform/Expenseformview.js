import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import { CircularProgress } from "@mui/material";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";

const Expenseformview = () => {
  const [showWelcome, setShowWelcome] = useState(false); // Define showWelcome state
  const { progressDetails, setProgressDetails } = useProgressContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [employeeProgress, setEmployeeProgress] = useState([]);
  const [officeProgress, setOfficeProgress] = useState([]);
  const [marketingProgress, setMarketingProgress] = useState([]);
  const [eventsProgress, setEventsProgress] = useState([]);
  const [editedEmployeeData, setEditedEmployeeData] = useState({});
  const [editedOfficeData, setEditedOfficeData] = useState({});
  const [editedMarketingData, setEditedMarketingData] = useState({});
  const [editedEventsData, setEditedEventsData] = useState({});

  useEffect(() => {
    fetchAllProgress();
  }, []);


  const handleDelete = (deletedProgressId) => {
    setEmployeeProgress(employeeProgress.filter(detail => detail._id !== deletedProgressId));
    setOfficeProgress(officeProgress.filter(detail => detail._id !== deletedProgressId));
    setMarketingProgress(marketingProgress.filter(detail => detail._id !== deletedProgressId));
    setEventsProgress(eventsProgress.filter(detail => detail._id !== deletedProgressId));
};


  const fetchAllProgress = async () => {
    try {
      const response = await axios.get("http://localhost:8080/expenseform");
      const progressData = response.data;
      setProgressDetails(progressData);
      setEmployeeProgress(progressData.filter(detail => detail.employeeCost));
      setOfficeProgress(progressData.filter(detail => detail.officeCost));
      setMarketingProgress(progressData.filter(detail => detail.marketingCost));
      setEventsProgress(progressData.filter(detail => detail.events));

    } catch (error) {
      setError("No Internet!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSuccess = () => {
    // setSuccessMessage("successfully!");
    // setTimeout(() => {
      // setSuccessMessage(null);
    // }, 500);
    fetchAllProgress(); 
  };

  const handleNextButtonClick = () => {
    setShowWelcome(true); // Define the behavior when the button is clicked
  };

  if (loading) return <CircularProgress />;
  if (error) return <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>;

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div className="header">
        <h1>Expense 2023</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {showWelcome && <h2>Hello, Welcome!</h2>}
      <Link to="/next-sheet">
  <button className="next-button" onClick={handleNextButtonClick} style={{ marginBottom: '10px' }}>
    2024
  </button>
  
</Link>

</div>
      <div>
        <DataTable
          progressData={employeeProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Employees Costs" 
          onDelete={handleDelete} 
          editedData={editedEmployeeData}
          setEditedData={setEditedEmployeeData}
        />
      </div>

      <div>
        <DataTable
          progressData={officeProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Offices Costs"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedOfficeData}
          setEditedData={setEditedOfficeData}
        />
      </div>

      <div>
        <DataTable
          progressData={marketingProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Marketing Cost"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedMarketingData}
          setEditedData={setEditedMarketingData}
        />
      </div>
     
      <div>
        <DataTable
          progressData={eventsProgress}
          onSaveSuccess={handleSaveSuccess}
          header="Events Activitie"
          onDelete={handleDelete} // Pass handleDelete function
          editedData={editedEventsData}
          setEditedData={setEditedEventsData}
        />
      </div>

      <div>
        <TotalTable
          employeeProgress={employeeProgress}
          officeProgress={officeProgress}
          onDelete={handleDelete} // Pass handleDelete function
          marketingProgress={marketingProgress}
          eventsProgress={eventsProgress}
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
        await axios.put(`http://localhost:8080/expenseform/${progressId}`, editedData[index]);
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
        await axios.delete(`http://localhost:8080/expenseform/${progressId}`);
        onSaveSuccess();
        onDelete(progressId); 
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
    jan: 0, feb: 0, march: 0, april: 0, may: 0, june: 0,
    july: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
  };

  progressData.forEach(detail => {
    subtotals.jan += parseFloat(detail.jan) || 0;
    subtotals.feb += parseFloat(detail.feb) || 0;
    subtotals.march += parseFloat(detail.march) || 0;
    subtotals.april += parseFloat(detail.april) || 0;
    subtotals.may += parseFloat(detail.may) || 0;
    subtotals.june += parseFloat(detail.june) || 0;
    subtotals.july += parseFloat(detail.july) || 0;
    subtotals.aug += parseFloat(detail.aug) || 0;
    subtotals.sep += parseFloat(detail.sep) || 0;
    subtotals.oct += parseFloat(detail.oct) || 0;
    subtotals.nov += parseFloat(detail.nov) || 0;
    subtotals.dec += parseFloat(detail.dec) || 0;
  });

  return subtotals;
};

const subtotals = calculateSubtotals();

const headerStyle = {
 
};
const isEditable = (header, key) => {
  const nonEditableHeaders = ["Employees Costs", "Offices Costs", "Marketing Cost", "Events Activitie"];
  return !nonEditableHeaders.includes(header) || (key !== "employeeCost" && key !== "officeCost" && key !== "marketingCost" && key !== "events");
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
              <th> </th>
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
                  {isEditable(header, "employeeCost") ? (
    <input 
      style={{ background: "#5d7b9c", color: 'white', fontWeight: "bold" }}
      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
      value={
        `${editedData[rowIndex]?.employeeCost || detail.employeeCost || ""} ` +
        `${editedData[rowIndex]?.officeCost || detail.officeCost || ""} ` +
        `${editedData[rowIndex]?.marketingCost || detail.marketingCost || ""} ` +
        `${editedData[rowIndex]?.events || detail.events || ""}`
      }
      onChange={(e) => handleInputChange(e, "employeeCost", rowIndex)}
      onBlur={() => handleSave(rowIndex)}
      // onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
    />
  ) : (
    <span style={{ color: 'rgb(2, 131, 211)', fontWeight: 'bold' }}>
      {`${detail.employeeCost || ""} ${detail.officeCost || ""} ${detail.marketingCost || ""} ${detail.events || ""}`}
    </span>
                    )}
                  </td>
               
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.jan || editedData[rowIndex]?.officejan || editedData[rowIndex]?.marketingjan || editedData[rowIndex]?.eventsjan || detail.jan || detail.officejan || detail.marketingjan || detail.eventsjan || ""}
                      onChange={(e) => handleInputChange(e, "jan", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                      disabled={!isEditable(header, "jan")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.feb || editedData[rowIndex]?.officefeb || editedData[rowIndex]?.marketingfeb || editedData[rowIndex]?.eventsfeb || detail.feb || detail.officefeb || detail.marketingfeb || detail.eventsfeb || ""}
                      onChange={(e) => handleInputChange(e, "feb", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                      disabled={!isEditable(header, "feb")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.march || editedData[rowIndex]?.officemarch || editedData[rowIndex]?.marketingmarch || editedData[rowIndex]?.eventsmarch || detail.march || detail.officemarch || detail.marketingmarch || detail.eventsmarch || ""}
                      onChange={(e) => handleInputChange(e, "march", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                      disabled={!isEditable(header, "march")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={
                        editedData[rowIndex]?.april || editedData[rowIndex]?.officeapril || editedData[rowIndex]?.marketingapril || editedData[rowIndex]?.eventsapril || detail.april || detail.officeapril || detail.marketingapril || detail.eventsapril || ""}
                      onChange={(e) => handleInputChange(e, "april", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                      disabled={!isEditable(header, "april")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.may || editedData[rowIndex]?.officemay || editedData[rowIndex]?.marketingmay || editedData[rowIndex]?.eventsmay || detail.may || detail.officemay || detail.marketingmay || detail.eventsmay || ""}
                      onChange={(e) => handleInputChange(e, "may", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                      disabled={!isEditable(header, "may")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.june || editedData[rowIndex]?.officejune || editedData[rowIndex]?.marketingjune || editedData[rowIndex]?.eventsjune || detail.june || detail.officejune || detail.marketingjune || detail.eventsjune || ""}
                      onChange={(e) => handleInputChange(e, "june", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
                      disabled={!isEditable(header, "june")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.july || editedData[rowIndex]?.officejuly || editedData[rowIndex]?.marketingjuly || editedData[rowIndex]?.eventsjuly || detail.july || detail.officejuly || detail.marketingjuly || detail.eventsjuly || ""}
                      onChange={(e) => handleInputChange(e, "july", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
                      disabled={!isEditable(header, "july")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.aug || editedData[rowIndex]?.officeaug || editedData[rowIndex]?.marketingaug || editedData[rowIndex]?.eventsaug || detail.aug || detail.officeaug || detail.marketingaug || detail.eventsaug || ""}
                      onChange={(e) => handleInputChange(e, "aug", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 8)}
                      disabled={!isEditable(header, "aug")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.sep || editedData[rowIndex]?.officesep || editedData[rowIndex]?.marketingsep || editedData[rowIndex]?.eventssep || detail.sep || detail.officesep || detail.marketingsep || detail.eventssep || ""}
                      onChange={(e) => handleInputChange(e, "sep", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 9)}
                      disabled={!isEditable(header, "sep")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.oct || editedData[rowIndex]?.officeoct || editedData[rowIndex]?.marketingoct || editedData[rowIndex]?.eventsoct || detail.oct || detail.officeoct || detail.marketingoct || detail.eventsoct || ""}
                      onChange={(e) => handleInputChange(e, "oct", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 10)}
                      disabled={!isEditable(header, "oct")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.nov || editedData[rowIndex]?.officenov || editedData[rowIndex]?.marketingnov || editedData[rowIndex]?.eventsnov || detail.nov || detail.officenov || detail.marketingnov || detail.eventnov || ""}
                      onChange={(e) => handleInputChange(e, "nov", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 11)}
                      disabled={!isEditable(header, "nov")}
                    />
                  </td>
                  <td>
                    <input
                      ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                      value={editedData[rowIndex]?.dec || editedData[rowIndex]?.officedec || editedData[rowIndex]?.marketingdec || editedData[rowIndex]?.eventsdec || detail.dec || detail.officedec || detail.marketingdec || detail.eventsdec || ""}
                      onChange={(e) => handleInputChange(e, "dec", rowIndex)}
                      onBlur={() => handleSave(rowIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 12)}
                      disabled={!isEditable(header, "dec")}
                    />
                  </td>
                  
                  <td className="year-header">
                  <input
                      style={{ background: "", color: "rgb(2, 131, 211)", fontWeight: "bold" }}
                      value={formatYearTotal((
                        parseFloat(editedData[rowIndex]?.jan || detail.jan || 0) +
                        parseFloat(editedData[rowIndex]?.feb || detail.feb || 0) +
                        parseFloat(editedData[rowIndex]?.march || detail.march || 0) +
                        parseFloat(editedData[rowIndex]?.april || detail.april || 0) +
                        parseFloat(editedData[rowIndex]?.may || detail.may || 0) +
                        parseFloat(editedData[rowIndex]?.june || detail.june || 0) +
                        parseFloat(editedData[rowIndex]?.july || detail.july || 0) +
                        parseFloat(editedData[rowIndex]?.aug || detail.aug || 0) +
                        parseFloat(editedData[rowIndex]?.sep || detail.sep || 0) +
                        parseFloat(editedData[rowIndex]?.oct || detail.oct || 0) +
                        parseFloat(editedData[rowIndex]?.nov || detail.nov || 0) +
                        parseFloat(editedData[rowIndex]?.dec || detail.dec || 0)
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
              <td>{subtotals.jan}</td>
              <td>{subtotals.feb}</td>
              <td>{subtotals.march}</td>
              <td>{subtotals.april}</td>
              <td>{subtotals.may}</td>
              <td>{subtotals.june}</td>
              <td>{subtotals.july}</td>
              <td>{subtotals.aug}</td>
              <td>{subtotals.sep}</td>
              <td>{subtotals.oct}</td>
              <td>{subtotals.nov}</td>
              <td>{subtotals.dec}</td>
              <td className="subtotal-value">{Object.values(subtotals).reduce((sum, value) => sum + value, 0)}</td>
              <td>Action</td>

            </tr>
                   </tbody>
        </table>
      </div>
    );
  };

  const TotalTable = ({ employeeProgress, officeProgress, marketingProgress, eventsProgress }) => {
    const totalSubtotals = {
      jan: 0, feb: 0, march: 0, april: 0, may: 0, june: 0,
      july: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
    };
  
    [employeeProgress, officeProgress, marketingProgress, eventsProgress].forEach(progressData => {
      progressData.forEach(detail => {
        totalSubtotals.jan += parseFloat(detail.jan) || 0;
        totalSubtotals.feb += parseFloat(detail.feb) || 0;
        totalSubtotals.march += parseFloat(detail.march) || 0;
        totalSubtotals.april += parseFloat(detail.april) || 0;
        totalSubtotals.may += parseFloat(detail.may) || 0;
        totalSubtotals.june += parseFloat(detail.june) || 0;
        totalSubtotals.july += parseFloat(detail.july) || 0;
        totalSubtotals.aug += parseFloat(detail.aug) || 0;
        totalSubtotals.sep += parseFloat(detail.sep) || 0;
        totalSubtotals.oct += parseFloat(detail.oct) || 0;
        totalSubtotals.nov += parseFloat(detail.nov) || 0;
        totalSubtotals.dec += parseFloat(detail.dec) || 0;
      });
    });
  
    const total = Object.values(totalSubtotals).reduce((sum, value) => sum + value, 0);
  
    return (
      <div>
        <table className="styled-tabl">
          <thead>
          <tr>
             <th>Total Expense</th>
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
            </tr>
          </thead>
          <tbody>
          <tr className="month-header ">
              <td className="subtotal-cell">Total Expenses</td>
              <td className="subtotal-cell">{totalSubtotals.jan}</td>
              <td className="subtotal-cell">{totalSubtotals.feb}</td>
              <td className="subtotal-cell">{totalSubtotals.march}</td>
              <td className="subtotal-cell">{totalSubtotals.april}</td>
              <td className="subtotal-cell">{totalSubtotals.may}</td>
              <td className="subtotal-cell">{totalSubtotals.june}</td>
              <td className="subtotal-cell">{totalSubtotals.july}</td>
              <td className="subtotal-cell">{totalSubtotals.aug}</td>
              <td className="subtotal-cell">{totalSubtotals.sep}</td>
              <td className="subtotal-cell">{totalSubtotals.oct}</td>
              <td className="subtotal-cell">{totalSubtotals.nov}</td>
              <td className="subtotal-cell"> {totalSubtotals.dec}</td>
              <td className="year-header">{total}</td>

            </tr>
          </tbody>
        </table>
      </div>
    );
  };
export default Expenseformview;

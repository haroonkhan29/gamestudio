import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";

const InventoryView = () => {
  const { progressDetails, setProgressDetails } = useProgressContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [googleProgress, setGoogleProgress] = useState([]);
  const [gameProgress, setGameProgress] = useState([]);

  useEffect(() => {
    fetchAllProgress();
  }, []);

  const fetchAllProgress = async () => {
    try {
      const response = await axios.get("http://localhost:8080/inventory");
      const progressData = response.data;
      setProgressDetails(progressData);
      setGoogleProgress(progressData.filter(detail => detail.item));
    } catch (error) {
      setError("No Internet!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSuccess = () => {
    setSuccessMessage("Changes saved successfully!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
    fetchAllProgress(); 
  };

  if (loading) return <CircularProgress />;
  if (error) return <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>;

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {/* <h2>Mar-24 1/3/2024</h2> */}
      <div className="header">
        <h1>Inventory View</h1>
      </div>

      <div>
        <h2> Mobile Devices </h2>
        <DataTable progressData={googleProgress} onSaveSuccess={handleSaveSuccess} />
      </div>

    </div>
  );
};

const DataTable = ({ progressData, onSaveSuccess, hideTotalUserLoss }) => {
  const [editedData, setEditedData] = useState({});
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, progressData.length);
  }, [progressData]);

  const handleSave = async (index) => {
    if (progressData[index]) {
      const progressId = progressData[index]._id;
      try {
        await axios.put(`http://localhost:8080/inventory/${progressId}`, editedData[index]);
        onSaveSuccess();
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    } else {
      console.error("Error: progressData[index] is undefined.");
    }
  };

  const handleInputChange = (e, key, id) => {
    const { value } = e.target;
    setEditedData((prevState) => ({
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
      const nextColIndex = colIndex === 9 ? 0 : colIndex + 0; 
      if (nextColIndex < 9) { 
        const nextInput = inputRefs.current[rowIndex][nextColIndex];
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (e.key === "Backspace") {
      const currentInput = e.target;
      const { value, selectionStart } = currentInput;
      if (selectionStart === 0 && value === "") {
        const prevColIndex = colIndex === 0 ? 9 : colIndex - 1;
        const prevInput = inputRefs.current[rowIndex][prevColIndex];
        if (prevInput) {
          prevInput.focus();
          const prevInputValue = prevInput.value;
          prevInput.value = prevInputValue.slice(0, -1);
          const event = new Event("change", { bubbles: true });
          prevInput.dispatchEvent(event);
          handleSave(rowIndex);
        }
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => handleSave(0)} style={{ marginBottom: '10px' }}>
          Save
        </button>
      </div>
      <table className="styled-tables">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item</th>
            <th>Brand</th>
            <th>Model No</th>
            <th>Device Version</th>
            <th>IMEI</th>
            {!hideTotalUserLoss && <th>Issued To</th>}
            <th>Qty</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
        {progressData.map((detail, rowIndex) => (
  <React.Fragment key={detail._id}>
    {rowIndex === 17 && (
      <>
<tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
        <th style={{ color: "black", backgroundColor: "#bdddff" }}>Computer Systems</th>
      </tr>

      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Accessories</th>
        <th>Issued To</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
    {rowIndex === 37 && (
            <>
            <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
                    <th style={{ color: "black", backgroundColor: "#bdddff" }}>AC</th>
                  </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Accessories</th>
        <th>Ton Capicaity</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
     {rowIndex === 43 && (
        <>
        <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
                <th style={{ color: "black", backgroundColor: "#bdddff" }}>LED TV</th>
              </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
      {rowIndex === 47 && (
         <>
         <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
                 <th style={{ color: "black", backgroundColor: "#bdddff" }}>Wifi Cameras</th>
               </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
     {rowIndex === 52 && (
       <>
       <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
               <th style={{ color: "black", backgroundColor: "#bdddff" }}>Chairs</th>
             </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
     {rowIndex === 58 && (
      <>
      <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
              <th style={{ color: "black", backgroundColor: "#bdddff" }}>Table</th>
            </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
     {rowIndex === 64 && (
       <>
       <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
               <th style={{ color: "black", backgroundColor: "#bdddff" }}>BOOKS</th>
             </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
     {rowIndex === 67 && (
       <>
       <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
               <th style={{ color: "black", backgroundColor: "#bdddff" }}>Plants</th>
             </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
     {rowIndex === 70 && (
       <>
       <tr key={`headerRow${rowIndex}`} style={{ color: "#5d7b9c", backgroundColor: "transparent" }}>
               <th style={{ color: "black", backgroundColor: "#bdddff" ,fontSize: "14px"}}>Internet Nayatel Device</th>
             </tr>
      <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
        <th>S.No</th>
        <th>Item</th>
        <th>Brand</th>
        <th>Model No</th>
        <th>Version</th>
        <th>Accessories</th>
        {!hideTotalUserLoss && <th>Location</th>}
        <th>Qty</th>
        <th>Comments</th>
      </tr>
      </>
    )}
            <tr key={`dataRow${detail._id}`}>

            <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.sNo ||  detail.sNo || ""}
                  onChange={(e) => handleInputChange(e, "sNo", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                />
              </td>


              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.item || detail.item || ""}
                  onChange={(e) => handleInputChange(e, "item", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.brand  || detail.brand  || ""}
                  onChange={(e) => handleInputChange(e, "brand", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.modelNo  || detail.modelNo  || ""}
                  onChange={(e) => handleInputChange(e, "modelNo", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.deviceVersion || detail.deviceVersion || ""}
                  onChange={(e) => handleInputChange(e, "deviceVersion", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.iMEI || detail.iMEI || ""}
                  onChange={(e) => handleInputChange(e, "iMEI", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
                />
              </td>
              {!hideTotalUserLoss && (
                <td>
                  <input
                    ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                    value={editedData[rowIndex]?.issuedTo || detail.issuedTo  || ""}
                    onChange={(e) => handleInputChange(e, "issuedTo", rowIndex)}
                    onBlur={() => handleSave(rowIndex)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
                  />
                </td>
              )}
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.qty  || detail.qty  || ""}
                  onChange={(e) => handleInputChange(e, "qty", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 8)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.comments || detail.comments || ""}
                  onChange={(e) => handleInputChange(e, "comments", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 9)}
                />
              </td>
            </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryView;

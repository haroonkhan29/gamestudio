import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";

const ProgressView = () => {
  const { progressDetails, setProgressDetails } = useProgressContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [googleProgress, setGoogleProgress] = useState([]);
  const [gameProgress, setGameProgress] = useState([]);
  const [iOSProgress, setIOSProgress] = useState([]);

  useEffect(() => {
    fetchAllProgress();
  }, []);

  const fetchAllProgress = async () => {
    try {
      const response = await axios.get("http://18.217.96.83:3001/progress");
      const progressData = response.data;
      setProgressDetails(progressData);
      setGoogleProgress(progressData.filter(detail => detail.googleAccount));
      setGameProgress(progressData.filter(detail => detail.gameAccount));
      setIOSProgress(progressData.filter(detail => detail.iOSAccount));
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
      <h2>Mar-24 1/3/2024</h2>
      <div className="header">
        <h1>Apps Progress View</h1>
      </div>

      <div>
        <h2> Apps Progress (Till Date)</h2>
        <DataTable progressData={googleProgress} onSaveSuccess={handleSaveSuccess} />
      </div>

      <div>
        <h2>Game Apps ActionShore Account (Jan23-Jan-24)</h2>
        <DataTable progressData={gameProgress} onSaveSuccess={handleSaveSuccess} />
      </div>

      <div>
        <h2>(iOS Apps) Progress till Nov22-Jan-24</h2>
        <DataTable progressData={iOSProgress} onSaveSuccess={handleSaveSuccess} hideTotalUserLoss />
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
        await axios.put(`http://18.217.96.83:3001/progress/${progressId}`, editedData[index]);
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
      const nextColIndex = colIndex === 7 ? 1 : colIndex + 0; 
      if (nextColIndex < 7) { 
        const nextInput = inputRefs.current[rowIndex][nextColIndex];
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (e.key === "Backspace") {
      const currentInput = e.target;
      const { value, selectionStart } = currentInput;
      if (selectionStart === 0 && value === "") {
        const prevColIndex = colIndex === 0 ? 7 : colIndex - 1;
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
            <th>Account Name</th>
            <th>Apps</th>
            <th>App Published Date</th>
            <th>Daily Install (Avg)</th>
            <th>Total Install till Date</th>
            {!hideTotalUserLoss && <th>Total User Loss (Avg)</th>}
            <th>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((detail, rowIndex) => (
              <React.Fragment key={detail._id}>
                  {rowIndex === 7 && (
                <tr key={`headerRow${rowIndex}`} style={{ backgroundColor: "#5d7b9c", color: "#fff" }}>
                  <th>S.No</th>
                  <th>Account Name</th>
                  <th>Apps</th>
                  <th>App Published Date</th>
                  <th>Daily Install (Avg)</th>
                  <th>Total Install till Date</th>
                  {!hideTotalUserLoss && <th>Total User Loss (Avg)</th>}
                  <th>Conversion Rate</th>
                </tr>
              )}
            <tr key={`dataRow${detail._id}`}>
              <td>{rowIndex + 1}</td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.googleAccount || editedData[rowIndex]?.gameAccount || editedData[rowIndex]?.iOSAccount || detail.googleAccount || detail.gameAccount || detail.iOSAccount || ""}
                  onChange={(e) => handleInputChange(e, "googleAccount", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.googleApps || editedData[rowIndex]?.gameApps || editedData[rowIndex]?.iOSApps || detail.googleApps || detail.gameApps || detail.iOSApps || ""}
                  onChange={(e) => handleInputChange(e, "googleApps", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.googleappPublishedDate || editedData[rowIndex]?.gameappPublishedDate || editedData[rowIndex]?.iOSappPublishedDate || detail.googleappPublishedDate || detail.gameappPublishedDate || detail.iOSappPublishedDate || ""}
                  onChange={(e) => handleInputChange(e, "googleappPublishedDate", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.googleTotalInstalls || editedData[rowIndex]?.gameTotalInstalls || editedData[rowIndex]?.iOSTotalInstalls || detail.googleTotalInstalls || detail.gameTotalInstalls || detail.iOSTotalInstalls || ""}
                  onChange={(e) => handleInputChange(e, "googleTotalInstalls", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                />
              </td>
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.googleTotalUninstalls || editedData[rowIndex]?.gameTotalUninstalls || editedData[rowIndex]?.iOSTotalUninstalls || detail.googleTotalUninstalls || detail.gameTotalUninstalls || detail.iOSTotalUninstalls || ""}
                  onChange={(e) => handleInputChange(e, "googleTotalUninstalls", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                />
              </td>
              {!hideTotalUserLoss && (
                <td>
                  <input
                    ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                    value={editedData[rowIndex]?.googletotalUserLoss || editedData[rowIndex]?.gametotalUserLoss || editedData[rowIndex]?.iOStotalUserLoss || detail.googletotalUserLoss || detail.gametotalUserLoss || detail.iOStotalUserLoss || ""}
                    onChange={(e) => handleInputChange(e, "googletotalUserLoss", rowIndex)}
                    onBlur={() => handleSave(rowIndex)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
                  />
                </td>
              )}
              <td>
                <input
                  ref={(el) => (inputRefs.current[rowIndex] = [...(inputRefs.current[rowIndex] || []), el])}
                  value={editedData[rowIndex]?.googleConversionRate || editedData[rowIndex]?.gameConversionRate || editedData[rowIndex]?.iOSConversionRate || detail.googleConversionRate || detail.gameConversionRate || detail.iOSConversionRate || ""}
                  onChange={(e) => handleInputChange(e, "googleConversionRate", rowIndex)}
                  onBlur={() => handleSave(rowIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
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

export default ProgressView;

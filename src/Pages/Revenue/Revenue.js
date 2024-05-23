import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import "./Revenue.css";

const SPREADSHEET_ID = "1xZc-XdKE1lvoUFQwlTLpN57DyoDo-YPlz24_0SxaQjY";
const FETCH_INTERVAL = 1000;
const Revenue = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Appstark");
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(new Date());
  const fetchData = async (range, startDate, endDate) => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`,
        {
          params: {
            key: "AIzaSyD54iNbpWpMyDs0KsH0RMotlPwkebiA-gw",
          },
        }
      );

      if (response.data.values) {
        const groupedData = [];

        let currentDateData = [];
        response.data.values.forEach((row) => {
          const date = row[0];
          if (date !== "") {
            if (currentDateData.length > 0) {
              groupedData.push(currentDateData);
            }
            currentDateData = [date];
          }
          currentDateData.push(row.slice(1));
        });
        groupedData.push(currentDateData);
        const filteredData = groupedData.filter((dateData) => {
          const currentDate = new Date(dateData[0]);
          return (
            (startDate === null || currentDate >= startDate) &&
            currentDate <= endDate
          );
        });

        setData(filteredData);
      } else {
        console.error("No data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
    }
  };

  useEffect(() => {
    fetchData(activeButton, startDate, endDate);
    const intervalId = setInterval(() => {
      fetchData(activeButton, startDate, endDate);
    }, FETCH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [activeButton, startDate, endDate]);

  const handleButtonClick = (range) => {
    setActiveButton(range);
  };

  const rowIndices = {
    Appstark: {
      "first-row": [],
      "eighth-row": [],
    },

    "D-Apps": {
      "first-row": [],
      "eighth-row": [],
    },
    Actionshore: {
      "first-row": [],
      "eighth-row": [],
    },
    "Adnan Haider iOS (DApps)": {
      "first-row": [],
      "eighth-row": [],
    },
    "Kamran Haider iOS (Appstark)": {
      "first-row": [],
      "eighth-row": [],
    },
   
    
  };

  const getRowClass = (activeButton, rowIndex) => {
    let isFirstRow, isEighthRow;

    if (activeButton === "Appstark") {
      isFirstRow = rowIndex % 8 === 0;
      isEighthRow = (rowIndex - 7) % 8 === 0;
    } else if (activeButton === "D-Apps") {
      isFirstRow = rowIndex % 8 === 0;
      isEighthRow = (rowIndex - 7) % 8 === 0;
    } else if (activeButton === "Actionshore") {
      isFirstRow = rowIndex % 4 === 0;
      isEighthRow = (rowIndex - 3) % 4 === 0;
    }else if (activeButton === "Adnan Haider iOS (DApps)") {
      isFirstRow = rowIndex % 4 === 0;
      isEighthRow = (rowIndex - 3) % 4 === 0;
    }else if (activeButton === "Kamran Haider iOS (Appstark)") {
      isFirstRow = rowIndex % 4 === 0;
      isEighthRow = (rowIndex - 3) % 4 === 0;
    }
    if (isFirstRow) {
      rowIndices[activeButton]["first-row"].push(rowIndex);
      return "first-row";
    } else if (isEighthRow) {
      rowIndices[activeButton]["eighth-row"].push(rowIndex);
      return "eighth-row";
    }

    return "";
  };

  return (
    <div className="">
      <div className="header">
        <h1>App Revenue</h1>
      </div>
      <div className="sidebar">
        <button
          className={`btn ${
            activeButton === "Appstark" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleButtonClick("Appstark")}
        >
          Appstark
        </button>
        <button
          className={`btn ${
            activeButton === "D-Apps" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleButtonClick("D-Apps")}
        >
          D-Apps
        </button>
        <button
          className={`btn ${
            activeButton === "Actionshore" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleButtonClick("Actionshore")}
        >
          Actionshore
        </button>
        <button
          className={`btn ${
            activeButton === "Adnan Haider iOS (DApps)" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleButtonClick("Adnan Haider iOS (DApps)")}
        >
         Adnan Haider iOS (DApps)
        </button>
        <button
          className={`btn ${
            activeButton === "Kamran Haider iOS (Appstark)" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleButtonClick("Kamran Haider iOS (Appstark)")}
        >
         Kamran Haider iOS (Appstark)
        </button>
      </div>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <table className="revenue-table">
  <thead></thead>
  <tbody>
    {data.slice().reverse().map((row, index) => (
      <React.Fragment key={index}>
        <tr>
          <td colSpan="" className="date-row" style={{ textAlign: 'left' }}>{row[0]}</td>
        </tr>
        {row.slice(1).map((appRow, rowIndex) => (
          <tr key={rowIndex} className={getRowClass(activeButton, rowIndex)}>
            {appRow.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ textAlign: cellIndex === 1 || cellIndex === 8 ? "left" : "center" }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>


      <CircularProgress />
    </div>
  );
};

export default Revenue;





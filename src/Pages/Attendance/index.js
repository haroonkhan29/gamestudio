import React, { useState, useEffect } from "react";
import {CircularProgress , IconButton} from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import "./Attendance.css";

const formatDate = (timestamp) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(timestamp).toLocaleDateString('en-pk', options);
};
const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString().split('T')[0];
};

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); 
  const [formattedSelectedDate, setFormattedSelectedDate] = useState(formatDate(new Date())); 
  const [showDateHeader, setShowDateHeader] = useState(true); 
  const [editedAttendance, setEditedAttendance] = useState(null);
  
    useEffect(() => {
      fetchAttendanceData();
    }, [selectedDate]);
  
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/attendance?date=${selectedDate}`);
        const data = await response.json();
        setAttendanceData(data);
        setFormattedSelectedDate(formatDate(new Date(selectedDate)));
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError("Error fetching attendance data");
      } finally {
        setLoading(false);
      }
    };
  
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
    };
  
    const updateAttendance = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`http://localhost:8080/attendance?date=${selectedDate}`);
        const data = await response.json();
        setAttendanceData(data);
        setFormattedSelectedDate(formatDate(new Date(selectedDate)));
      } catch (error) {
        console.error("Error updating attendance data:", error);
        setError("Error updating attendance data");
      } finally {
        setLoading(false);
      }
    };
  
    const handleUpdateButtonClick = () => {
      updateAttendance();
    };
  

  return (
    <div>
      <div className="header">
      <h1>Attendance</h1>   
      </div>
      <div className="date-filter1">
      <label htmlFor="date" className="custom-label"></label>
      <input
        type="date"
        value={selectedDate || getCurrentDate()}  
        onChange={(e) => handleDateChange(e.target.value)}
        className="custom-date-input"
      />
      </div>
      {loading && <CircularProgress />}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div>
        <h2>{formattedSelectedDate}</h2>
        <div className="update">
        <IconButton className="update" onClick={handleUpdateButtonClick}>Update
          <UpdateIcon className="update-icon" />
         </IconButton>        
        </div>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              {showDateHeader && <th></th>}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`http://localhost:8080/uploads/${attendance.profilePic}`}
                    alt=""
                    className="profile-picture1"
                  />
                </td>
                {/* <td>{formatDate(new Date(attendance.timestamp))}</td> */}
                <td>{attendance.id}</td>
                <td>{attendance.fullName}</td>
                <td>{attendance.department}</td>
                <td>{attendance.tittle}</td>
                <td className={attendance.status.toLowerCase()}>
                  {attendance.status}
                </td>
                <td className={attendance.timestamp === selectedDate ? 'selected-date' : ''}>
                {formatDate(new Date(attendance.timestamp))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
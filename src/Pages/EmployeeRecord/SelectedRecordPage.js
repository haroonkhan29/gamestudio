import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Select.css";

const SelectedRecordPage = ({ selectedRecord, onClose }) => {
  
  return (
    <div className="modal-overlays">
      <div className="modal-content">
      <div className="modal-headers">
    <CloseIcon className="close-icons" onClick={onClose} />
    </div>
        <h2 className="record-heading">Employee</h2>
        <div className="record-details">
          <img
            src={`http://18.217.96.83:3001/uploads/${selectedRecord.profilePic}`}
            alt="Profiles"
            className="profile-picturess"
          />
          
          <p className="record-item"><strong>ID</strong> {selectedRecord.id}</p>
          <p className="record-item"><strong>Status</strong> {selectedRecord.status}</p>
          <p className="record-item"><strong>Full Name</strong> {selectedRecord.fullName}</p>
          <p className="record-item"><strong>Email</strong> {selectedRecord.email}</p>
          <p className="record-item"><strong>DOB</strong> {selectedRecord.dob}</p>
          <p className="record-item"><strong>Joining Date</strong> {selectedRecord.joining}</p>
          <p className="record-item"><strong>Leaving Date</strong> {selectedRecord.leavingDate}</p>
          <p className="record-item"><strong>Department</strong> {selectedRecord.department}</p>
          <p className="record-item"><strong>Job Title</strong> {selectedRecord.tittle}</p>
          <p className="record-item"><strong>Account Number</strong> {selectedRecord.account}</p>
          <p className="record-item"><strong>Salary</strong> {selectedRecord.salary}</p>
          <p className="record-item"><strong>Contact</strong> {selectedRecord.contact}</p>
          <p className="record-item"><strong>City</strong> {selectedRecord.addressCity}</p>
          <p className="record-item"><strong>Postal Code</strong> {selectedRecord.addressPostalCode}</p>
          <p className="record-item">
            <strong>CNIC:</strong>{" "}
            {`${selectedRecord.cnic.slice(0, 5)}-${selectedRecord.cnic.slice(5, 12)}-${selectedRecord.cnic.slice(12, 13)}`}
          </p>
          <p className="record-item"><strong>Gender</strong> {selectedRecord.gender}</p>
        </div>
        
      </div>
    </div>
  );
};

export default SelectedRecordPage;

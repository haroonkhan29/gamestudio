import React from "react";
import "./PrintableDocument.css";

const PrintableDocument = ({ record, onClose }) => {
  return (
    <div className="printable-document">
      <h2>View Record</h2>
      <div>
        <p>Date: {record.date}</p>
        <p>Accounts: {record.account}</p>
        <p>Project: {record.project}</p>
        <p>Developer: {record.developer}</p>
        <p>Status: {record.status}</p>
        <p>Task: {record.task}</p>
        <p>Deadline: {record.deadline}</p>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PrintableDocument;

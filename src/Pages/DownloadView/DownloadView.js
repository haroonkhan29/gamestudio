import React, { useState, useEffect } from "react";
import { useDownloadContext } from "../../DownloadContext";
import { CircularProgress } from "@mui/material";
import "./DateCalendar.css";
import PrintableDocument from "./PrintableDocument";
import { orderBy } from "lodash";
import EditForm from "./EditForm";

const AssignmentView = () => {
  const { downloadData, setDownloadData } = useDownloadContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isPrintableVisible, setIsPrintableVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const recordsPerPage = 9;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filteredRecords = downloadData.filter((record) => {
    const recordDate = new Date(record.date);
    const startFilterDate = startDate ? new Date(startDate) : null;
    const endFilterDate = endDate ? new Date(endDate) : null;

    return (!startFilterDate || recordDate >= startFilterDate) && (!endFilterDate || recordDate <= endFilterDate);
  });

  const sortedRecords = orderBy(filteredRecords, ["date"], ["desc"]);
  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsPrintableVisible(true);
  };

  const handleClosePrintable = () => {
    setSelectedRecord(null);
    setIsPrintableVisible(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-PK', options);
    return formattedDate;
  };
  const handleDeleteRecord = async (index, recordId) => {
    try {
      setLoading(true); 
      if (!recordId) {
        console.error("Invalid _id for deletion");
        return;
      }
      const response = await fetch(`http://3.140.190.237:3002/dailyAssignment/${recordId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedRecords = downloadData.filter(record => record._id !== recordId);
      setDownloadData(updatedRecords);
    } catch (error) {
      console.error("Error during delete:", error.message);
    } finally {
      setLoading(false);
    }
  };  
  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setIsEditVisible(true);
  };

  const handleSaveEdit = (editedRecord) => {
    const updatedRecords = [...downloadData];
    const indexToUpdate = updatedRecords.findIndex((r) => r._id === editedRecord._id);
    updatedRecords[indexToUpdate] = editedRecord;
    setDownloadData(updatedRecords);

    setIsEditVisible(false);
    setSelectedRecord(null);
  };

  const handleCancelEdit = () => {
    setIsEditVisible(false);
    setSelectedRecord(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://3.140.190.237:3002/dailyAssignment/getAll");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDownloadData(data);
      } catch (error) {
        console.error("Error during fetch:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setDownloadData]);

  const handleExportData = () => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  
    const header = [
      "Date",
      "",
      "Account",
      "Project",
      "",
      "",
      "",
      "Developer",
      "",
      "",
      "Status",
      "",
      "Task",
      "",
      "",
      "",
      "",
      "Deadline"
    ];
  
    const exportedData = filteredRecords.flatMap(record => [
      [
        `'${new Date(record.date).toLocaleDateString('en-PK', options)}'`,
        "",
        record.account,
        record.project,
        "",
        "",
        "",
        record.developer,
        "",
        "",
        record.status,
        "",
        record.task,
        "",
        "",
        "",
        "",
        `'${new Date(record.deadline).toLocaleDateString('en-PK', options)}'`
      ],
    ]);
  
    exportedData.unshift(header);
  
    const csvContent = exportedData.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <div className="header">
        <h1>Assignment View</h1>
      </div>
      <div className="date-filter">
        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="custom-date-input"
        />
        <label htmlFor="end-date">End Date</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="custom-date-input"
        />
      </div>
      <button onClick={handleExportData}>Export</button>
     {loading ? ( 
        <CircularProgress />
      ) : (
        <div>
        {isEditVisible && selectedRecord && (
          <EditForm
            record={selectedRecord}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            date={selectedRecord.date}
            deadline={selectedRecord.deadline} 
          />
        )}
      <div className="bank-view-containers">
      <table className={`styled-tables ${isPrintableVisible ? "hidden" : ""}`}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Studio</th>
              <th>Project</th>
              <th>Developer</th>
              <th>Status</th>
              <th>Task</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((download, index) => (
              <tr key={index}>
               <td>{formatDate(download.date)}</td>
                <td>{download.account}</td>
                <td>{download.project}</td>
                <td>{download.developer}</td>
                <td>{download.status}</td>
                <td>{download.task}</td>
                <td>{formatDate(download.deadline)}</td>
                <td className="button-container">
                <button onClick={() => handleEditRecord(download)}>
               <i className="fas fa-edit" style={{ color: "white" }}></i> Edit
                </button>
                  <button onClick={() => handleDeleteRecord(index, download._id)}>
                    <i className="fas fa-trash-alt" style={{ color: "white" }}></i> Delete
                  </button>
                  <button onClick={() => handleViewRecord(download)}>
                  <i className="fas fa-eye" style={{ color: "white" }}></i> View
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isPrintableVisible && (
        <PrintableDocument
          record={selectedRecord}
          onClose={handleClosePrintable}
        />
      )}
      
      <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
    <i className="fas fa-chevron-left"></i>
  </button>
  {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, index) => {
    const page = currentPage - 2 + index;
    return page > 0 && page <= totalPages ? (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        style={{
          color: currentPage === page ? "white" : "",
          backgroundColor:
            currentPage === page ? "#3498db" : "transparent",
        }}
      >
        {page}
      </button>
    ) : null;
  })}
  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
    <i className="fas fa-chevron-right"></i>
  </button>
</div>
</div>
</div>
   )}
    </div>
  );
};

export default AssignmentView;

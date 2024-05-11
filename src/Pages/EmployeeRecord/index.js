import React, { useContext, useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EmployeeContext from "../../EmployeeContext";
import "./EmployeeTable.css";
import EditForm from "../EditForm/EditForm";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SelectedRecordPage from "./SelectedRecordPage"; 


const EmployeeTable = () => {
  const { employee, setEmployee } = useContext(EmployeeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isRecordSelected, setIsRecordSelected] = useState(false);

  const recordsPerPage = 50;

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch("http://localhost:8080/employee");
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleEdit = (index) => {
    const selectedRecordIndex = (currentPage - 1) * recordsPerPage + index;
    const selectedRecord = filteredEmployees[selectedRecordIndex];
    setSelectedEmployee({ ...selectedRecord, index: selectedRecordIndex });
    setIsEditing(true);
    handleClose();
  };
  const handleProfilePicClick = (event, index) => {
    event.preventDefault();
    const selectedRecordIndex = (currentPage - 1) * recordsPerPage + index;
    const selectedRecord = filteredEmployees[selectedRecordIndex];
    setSelectedRecord(selectedRecord);
    setIsRecordSelected(true);
  };

  const handleDelete = async () => {
    if (selectedEmployeeIndex !== null) {
      const recordIndex = (currentPage - 1) * recordsPerPage + selectedEmployeeIndex;
      confirmAlert({
        title: "Delete",
        message: "Are you sure you want to delete this employee?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
                await fetch(`http://localhost:8080/employee/${employee[recordIndex]._id}`, {
                  method: 'DELETE',
                });
                const updatedEmployee = [...employee];
                updatedEmployee.splice(recordIndex, 1);
                setEmployee(updatedEmployee);
              } catch (error) {
                console.error('Error deleting employee:', error);
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
    handleClose();
  };
  const handleCloseRecord = () => {
    setIsRecordSelected(false); 
  };

  const handleEditSubmit = (editedData) => {
    const updatedEmployee = [...employee];
    updatedEmployee[selectedEmployee.index] = editedData;
    setEmployee(updatedEmployee);
    setIsEditing(false);
    setSelectedEmployee(null);
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployeeIndex(index);
    // handleEdit(index); 
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const filteredEmployees = employee
    ? employee.filter((data) =>
        data.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.id.toString().includes(searchTerm) || 
        data.department.toLowerCase().includes(searchTerm.toLowerCase()) || 
        data.tittle.toLowerCase().includes(searchTerm.toLowerCase()) 
      )
    : [];
  const currentRecords = filteredEmployees.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tableWrapper">
      <div className="searchWrapper">
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by ID / Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
          />
          <button className="searchButton">
            <SearchIcon />
          </button>
        </div>
      </div>
      {currentRecords.length ? (
    <div>
    <table className="employeeTable custom-table">
            <thead>
              <tr>
              <th>Action</th> {/* Move "Action" to the first column */}
                <th>Profile</th>
                <th>ID</th>
                <th>Status</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Joining Date</th>
                <th>Leaving Data</th>
                <th>Department</th>
                <th>Job title</th>
                {/* <th>Account Number</th> */}
                {/* <th>Salary</th> */}
                {/* <th>Contact</th> */}
                {/* <th>City</th> */}
                {/* <th>Postal Code</th> */}
                {/* <th>CNIC</th> */}
                {/* <th>Gender</th> */}
              </tr>
            </thead>
            <tbody>
            {currentRecords.map((data, index) => (
  <tr
    key={index}
    className={`${
      data.gender === "female" ? "femaleRow" : ""
    } ${data.leavingDate ? "leavingDateRow" : ""} ${
      data.status === "Former" ? "formerRow" : ""
    }`}
  >
    {/* Action column */}
    <td>
      <MoreHorizIcon
        className="icon"
        aria-controls={`employee-menu-${index}`}
        aria-haspopup="true"
        onClick={(event) => handleClick(event, index)}
      />
      <Menu
        id={`employee-menu-${index}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleEdit(selectedEmployeeIndex); }}>
          <EditIcon className="menuIcon" />
          <span className="menuText">Edit</span>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon className="menuIcon1" />
          <span className="menuText1">Delete</span>
        </MenuItem>
      </Menu>
    </td>

    {/* Profile column */}
    <td onClick={(event) => handleProfilePicClick(event, index)}>
      <img
        src={`http://localhost:8080/uploads/${data.profilePic}`}
        alt=""
        className="profile-picture"
      />
    </td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.id } </td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.status } </td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.fullName}</td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.email}</td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.dob}</td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.joining}</td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.leavingDate}</td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.department}</td>
                  <td onClick={(event) => handleProfilePicClick(event, index)}>{data.tittle}</td>
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>{data.account}</td> */}
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>{data.salary}</td> */}
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>{data.contact}</td> */}
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>{data.addressCity}</td> */}
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>{data.addressPostalCode}</td> */}
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>
                    {data.cnic.slice(0, 5)}-{data.cnic.slice(5, 12)}-
                    {data.cnic.slice(12, 13)}
                  </td> */}
                  {/* <td onClick={(event) => handleProfilePicClick(event, index)}>{data.gender}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <NavigateBeforeIcon /> 
            </button>
            <span>{currentPage}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRecord >= employee.length}>
              <NavigateNextIcon /> 
            </button>
          </div>
        </div>
      ) : (
        <h1>No record </h1>
      )}

      {isEditing && selectedEmployee && (
        <EditForm
          id={selectedEmployee._id} 
          data={selectedEmployee}
          onSubmit={handleEditSubmit}
          setIsEditing={setIsEditing}
          currentProfilePicPath={selectedEmployee.profilePic}
        />
      )}
     {isRecordSelected && (
        <SelectedRecordPage
          selectedRecord={selectedRecord}
          onClose={handleCloseRecord} 
        />
      )}
    </div>
  );
};

export default EmployeeTable;

import React, { useState, useContext, useEffect } from "react";
import "./sidebar.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation } from "react-router-dom"; 
import Button from '@mui/material/Button';
import SemiDonut from "../Chart/SemiDonut";
import EmployeeContext from "../../EmployeeContext";
import {
  Box,
  Typography,
  Drawer,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Input from "../Input/Input";
import { InputsData } from "../Input/InputsData";
import ValidateInput from "../../Validator";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EMAILREGEX =
  /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const PHONEREGEX = /^((0)?)(3)([0-9]{9})$/;
const SearchMenu = ({ drawerWidth, open }) => {
  const { employee, setEmployee } = useContext(EmployeeContext);
  const [totalEmployees, setTotalEmployees] = useState(employee.length);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    status: "",
    fullName: "",
    email: "",
    dob: "",
    joining: "",
    leavingDate: "",
    department: "",
    tittle: "",
    cnic: "",
    account: "",
    salary: "",
    gender: "",
    contact: "",
    addressCity: "",
    addressPostalCode: "",
    selectedFileName: "",
  });
  const [showEmployeeForm, setShowEmployeeForm] = useState(true); 

  const formData = new FormData();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formData.append('profilePic', file);
  };
  
  function handleInputs(e) {
    const { name, value } = e.target;
    if (name === "contact" || name === "cnic") {
      const isNumeric = /^\d+$/.test(value);
      if (isNumeric) {
        setNewEmployee((pre) => ({
          ...pre,
          [name]: value,
        }));
      }
    } else {
      setNewEmployee((pre) => ({
        ...pre,
        [name]: value,
      }));
    }
  }

  function toggleForm() {
    setShowEmployeeForm(!showEmployeeForm); 
  }

 function handleFormSubmit(e) {
  e.preventDefault();
  
    const validationRules = {
      id: /^[a-zA-Z0-9]*$/,
      status: "",
      fullName: /^[a-zA-Z ]*$/,
      email: /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/,
      dob: /^.*$/,
      joining: /^.*$/,
      leavingDate: /^.*$/,
      department: /^[a-zA-Z ]*$/,
      tittle: /^[a-zA-Z ]*$/,
      // cnic: /^(3)([0-9]{9})$/,
      account: /^[a-zA-Z0-9]*$/,
      salary: /^[0-9]*$/,
      gender: /^(Male|Female|Other)$/i,
      contact: /^(3)([0-9]{9})$/,
      addressCity: /^[a-zA-Z ]*$/,
      addressPostalCode: /^[0-9]*$/,
    };
  
    let hasErrors = false;
    const newValidationErrors = {};
    // for (const [field, regex] of Object.entries(validationRules)) {
    //   const value = newEmployee[field] || ''; 
  
    //   if (!value.trim() || !ValidateInput(value, regex)) {
    //     newValidationErrors[field] = `Invalid ${field}`;
    //     hasErrors = true;
    //   }
    // }
  
    // if (hasErrors) {
    //   for (const [field, error] of Object.entries(newValidationErrors)) {
    //     toast.error(`${error}`, { icon: '❌' });
    //   }
    //   return;
    // }    

    formData.append("id", newEmployee.id);
    formData.append("status", newEmployee.status);
    formData.append("fullName", newEmployee.fullName);
    formData.append("email", newEmployee.email);
    formData.append("dob", newEmployee.dob);
    formData.append("joining", newEmployee.joining);
    formData.append("leavingDate", newEmployee.leavingDate);
    formData.append("department", newEmployee.department);
    formData.append("tittle", newEmployee.tittle);
    formData.append("cnic", newEmployee.cnic);
    formData.append("account", newEmployee.account);
    formData.append("salary", newEmployee.salary);
    formData.append("gender", newEmployee.gender);
    formData.append("contact", newEmployee.contact);
    formData.append("addressCity", newEmployee.addressCity);
    formData.append("addressPostalCode", newEmployee.addressPostalCode);

    fetch('http://18.217.96.83:3001/employee/', 
    {      
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
          console.log('Response from backend:', data);
          setEmployee([...employee, newEmployee]);
          toast.success("Employee added successfully", { icon: '🚀' });
          setNewEmployee({
            profilePic: "",
            id: "",
            status: "",
            fullName: "",
            email: "",
            dob: "",
            joining: "",
            leavingDate: "",
            department: "",
            tittle: "",
            cnic: "",
            account: "",
            salary: "",
            gender: "",
            contact: "",
            addressCity: "",
            addressPostalCode: "",
          });
        
        })
      .catch(error => {
        console.error('Error adding employee:', error);
        toast.error("Error adding employee", { icon: '❌' });      });
  }
  
  useEffect(() => {
    setTotalEmployees(employee.length);
  }, [employee]);
  const location = useLocation(); 
  const isEmployeePage = location.pathname === "/record"; 
  const conditionalDrawerWidth = isEmployeePage ? drawerWidth : 0;

  return (
    <Drawer
      sx={{
        width: conditionalDrawerWidth,
        padding: "10px 15px",
        backgroundColor: "#342D27",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
    
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
          {/* {isEmployeePage && (
        <Button onClick={toggleForm}>
          {showEmployeeForm ? 'Hide' : 'Show'}
        </Button>
      )} */}
      {/* <Search style={{ border: "2px solid rgba(65, 36, 255, 1)" }}>
        <SearchIconWrapper>
          <SearchIcon style={{ color: "gray" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Employee"
          inputProps={{ "aria-label": "search" }}
        />
      </Search> */}

{showEmployeeForm && (
          <>

      {isEmployeePage && (
        <div>
      <Typography marginLeft={3} variant="h6" marginTop={4} fontWeight={700}>
        Total Employee
      </Typography>
      <SemiDonut totalEmployees={totalEmployees} />
      </div>
    )}
       {isEmployeePage && (
        <div>
      <Typography marginLeft={3} variant="h6" marginTop={4} fontWeight={700}>
        Add Employee
      </Typography>

      <Box marginTop={2}>
        
        {InputsData.map((input, index) => {
          if (input.type === "select") {
            return (
              <div style={wrapper}>
                <InputLabel id="demo-simple-select-standard-label">
                  {input.label}
                </InputLabel>
                
                <Select
                  labelId="demo-simple-select-standard-label"
                  id={input.id}
                  name={input.name}
                  value={newEmployee[input.name]}
                  onChange={handleInputs}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {input.Options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            );
          }
          else if (input.type == "file"){
            return (
              <div key={index} style={wrapper}>
              <InputLabel id="demo-simple-select-standard-label" style={{ display: 'none' }}>
                  {input.label}
                </InputLabel>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                variant="contained"
                component="label"
                htmlFor={input.id}
                style={{ marginRight: '10px', width: '260px', height: '48px' ,   backgroundColor: 'steelblue'}} 
                 >
                <CloudUploadIcon style={{ width: '30px', height: '30px' }} />
                <input
                  type="file"
                  id={input.id}
                  name={input.name}
                  onChange={handleFileChange}
                  className={input.className} 
                  style={{ display: 'none' }}

                />
                </Button>
                <div style={{ marginTop: '10px' }}>
                <Typography variant="body1" color="textSecondary">
                {selectedFileName}
                </Typography>
              </div>
              </div>
              </div>
            );
          }
          else {
            return (
              <Input
                key={index}
                id={input.id}
                label={input.label}
                name={input.name}
                type={input.type}
                value={newEmployee[input.name]}
                onChange={handleInputs}
                placeholder={input.placeholder}
              />
            );
          }
        })}

        <div className="btnwrapper">
          <button onClick={handleFormSubmit} className="btn1">
            Add
          </button>
        </div>
      </Box>
      </div>
        )}
        </>
      
      )}
      
    </Drawer>
    
  );
};

const wrapper = {
  display: "flex",
  justifyContent: "left",
  margin: "30px 25px",
  flexDirection: "column",
};

export default SearchMenu;

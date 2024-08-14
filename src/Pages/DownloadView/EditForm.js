import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AppleIconComponent from "../Downloads/AppleIconComponent";
import AndriodIconComponent from "../Downloads/AndriodIconComponent";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UpdateIcon from '@mui/icons-material/Update';

import {pink} from '@mui/material/colors';
import "./Form.css";


const EditForm = ({ record, onSave, onCancel, date, deadline }) => {
  const [editedRecord, setEditedRecord] = useState({ ...record, date, deadline });
  const initialDeveloperList = [];
  const initialProjectList = [];

  const [developerList, setDeveloperList] = useState(initialDeveloperList);
  const [projectList, setProjectList] = useState(initialProjectList);

  useEffect(() => {
  fetch("http://3.140.190.237:3002/project/getAll")
  .then((response) => response.json())
  .then((data) => setProjectList(data))
  .catch((error) => console.error("Error fetching projects:", error));
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleDeveloperInputChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
  };

  const handleProjectInputChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
  };
  const updateApiData = async () => {
    try {
      const response = await fetch(`http://3.140.190.237:3002/dailyAssignment/${editedRecord._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedRecord),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const updatedData = await response.json();
      onSave(updatedData); // Assuming that onSave function handles the updated data
    } catch (error) {
      console.error("Error during API update:", error.message);
    }
  };
  
  const handleSave = () => {
    updateApiData();
  };
  const handleAccountCheckboxChange = (name) => {
    setEditedRecord((prevData) => ({
      ...prevData,
      account: name,
    }));
  };
  const handleStatusCheckboxChange = (name) => {
    setEditedRecord((prevData) => ({
      ...prevData,
      status: name,
    }));
  };
  return (
    <div>
    <div className="header1">
      <h1>Daily Assignment</h1>
    </div>
    <div className="modal-overlay">
    <div className="edit-form2">
      <h2 style={{ color: "#141414" }}> </h2>
      <div className="button-row">
      <form>
          <div className="form-row">
          <div className="input-group">
            <label>
              Date
              <input
                type="date"
                name="date"
                value={editedRecord.date ? new Date(editedRecord.date).toISOString().split('T')[0] : ''}
                onChange={handleInputChange}
                required
              />
            </label>
            </div>
            </div>
            <div className="form-row">
            <div className="input-group1">
            <label className="status-label">Studio</label>
            <FormControlLabel
           control={
          <AndriodIconComponent
         checked={editedRecord.account === 'D.Apps'}
         onChange={() => handleAccountCheckboxChange('D.Apps')}
         />
         }
    label="D.Apps"
    style={{ color: 'green' }}

  />
    <FormControlLabel
    control={
      <AndriodIconComponent
        checked={editedRecord.account === 'AppStark'}
        onChange={() => handleAccountCheckboxChange('AppStark')}
      />
    }
    label="AppStark"
    style={{ color: 'green' }}

  />

<FormControlLabel
    control={
      <AndriodIconComponent
        checked={editedRecord.account === 'NanfaStudio'}
        onChange={() => handleAccountCheckboxChange('NanfaStudio')}
      />
    }
    label="NanfaStudio"
    style={{ color: 'green' }}

  />

  <FormControlLabel
    control={
      <AppleIconComponent
        checked={editedRecord.account === 'iOS(A.H)'}
        onChange={() => handleAccountCheckboxChange('iOS(A.H)')}
      />
    }
    label="iOS(A.H)"
    style={{ color: 'green' }}
  />
   <FormControlLabel
    control={
      <AppleIconComponent
        checked={editedRecord.account === 'iOS(K.H)'}
        onChange={() => handleAccountCheckboxChange('iOS(K.H)')}
      />
    }
    label="iOS(K.H)"
    style={{ color: 'green' }}
  />
   <FormControlLabel
       control={
      <Checkbox
        checked={editedRecord.account === 'ActionShore'}  
        onChange={() => handleAccountCheckboxChange('ActionShore')}
        icon={<BeenhereIcon style={{ color: 'red', fontSize: 40 }} />}  
        checkedIcon={<BeenhereIcon style={{ color: pink[600] , fontSize: 40}} />}  
      />
    }
    label="ActionShore"
    style={{ color: 'green' }}
  />
     <FormControlLabel
       control={
      <Checkbox
        checked={editedRecord.account === 'Open'}  
        onChange={() =>handleAccountCheckboxChange('Open')}
        icon={<CropSquareIcon style={{ color: 'black' , fontSize: 40}} />}  
        checkedIcon={<CropSquareIcon style={{ color: pink[600] , fontSize: 40}} />}  
      />
    }
    label="Open"
    style={{ color: 'green' }}

  />
</div>
</div>
            <div className="form-row">
            <div className="input-group">
            <label>
              Project
              <input
                type="text"
                name="project"
                value={editedRecord.project}
                onChange={(e) => handleProjectInputChange(e)}
                list="projectList"
                required
              />
              <datalist id="projectList">
                {projectList.map((project) => (
                  <option key={project._id} value={project.name} />
                ))}
                {/* <option value="Project A" /> */}
                {/* <option value="Project B" /> */}
                {/* <option value="Project C" /> */}
                {/* <option value="Project C" /> */}

              </datalist>
            </label>
            </div>
            </div>
          <div className="form-row">
            <div className="input-group">              
            <label>
              Developer
              <input
                type="text"
                name="developer"
                value={editedRecord.developer}
                onChange={(e) => handleDeveloperInputChange(e)}
                list="developerList"
                required
              />
              <datalist id="developerList">
              {developerList.map((developer) => (
              <option key={developer.name} value={developer.name} />
               ))}
          <option value="Afifa Nafees" />
          <option value="Daud Anjum (QA)" />
          <option value="Fiza Raouf" />
          <option value="Fahad" />
          <option value="Haroon Afridi (MERN)" />
         <option value="Rana Umar" />
         <option value="Sebtain Minhas" />
         <option value="Tanveer Kayani" />
         <option value="Usman Raza" />
         <option value="Usama Sajjad (Designer)" />
         </datalist>
         </label>
         </div>
          </div>
          <div className="form-row">
         <div className="input-group1">
         <label className="status-label">Status</label>
      <FormControlLabel
       control={
      <Checkbox
        checked={editedRecord.status === 'InProcess'}  
        onChange={() => handleStatusCheckboxChange('InProcess')}
        icon={< RunningWithErrorsIcon style={{ color: 'yellow', fontSize: 40 }} />}  
        checkedIcon={< RunningWithErrorsIcon style={{ color: pink[600], fontSize: 40 }} />}  
      />
    }
    label="InProcess"
    style={{ color: 'green' }}

  />

  <FormControlLabel
    control={
      <Checkbox
        checked={editedRecord.status === 'Q.A'}  
        onChange={() => handleStatusCheckboxChange('Q.A')}
        icon={<BeenhereIcon  style={{ color: 'black', fontSize: 40 }} />}  
        checkedIcon={<BeenhereIcon  style={{ color: pink[600], fontSize: 40 }} />}  
      />
    }
    label="Q.A"
    style={{ color: 'green' }}

  />

  <FormControlLabel
    control={
      <Checkbox
        checked={editedRecord.status === 'Pending'}  
        onChange={() => handleStatusCheckboxChange('Pending')}
        icon={<PendingActionsIcon style={{ color: 'red' , fontSize: 40}} />}  
        checkedIcon={<PendingActionsIcon style={{ color: pink[600] , fontSize: 40}} />}  
      />
    }
    label="Pending"
    style={{ color: 'green' }}

  />
   <FormControlLabel
    control={
      <Checkbox
        checked={editedRecord.status === 'Completed'} 
        onChange={() => handleStatusCheckboxChange('Completed')}
        icon={<CloudDoneIcon style={{ color: 'green', fontSize: 40 }} />} 
        checkedIcon={<CloudDoneIcon style={{ color: pink[600], fontSize: 40 }} />} 
      />
    }
    label="Completed"
    style={{ color: 'green' }}

  />
     <FormControlLabel
    control={
      <Checkbox
        checked={editedRecord.status === 'Upload'} 
        onChange={() => handleStatusCheckboxChange('Upload')}
        icon={<FileUploadIcon style={{ color: 'Blue' , fontSize: 40}} />}  
        checkedIcon={<FileUploadIcon style={{ color: pink[600], fontSize: 40 }} />}  
      />
    }
    label="Upload"
    style={{ color: 'green' }}

    />
    
    <FormControlLabel
      control={
        <Checkbox
          checked={editedRecord.status === 'Update'} 
          onChange={() => handleStatusCheckboxChange('Update')}
          icon={<UpdateIcon style={{ color: 'green' , fontSize: 40}} />}  
          checkedIcon={<UpdateIcon style={{ color: pink[600], fontSize: 40 }} />}  
        />
      }
      label="Update"
      style={{ color: 'green' }}

    />
       </div>
         </div>
            <div className="form-row">
            <div className="input-group">   
            <label>
              Task
              <input
                type="text"
                name="task"
                value={editedRecord.task}
                onChange={handleInputChange}
                required
              />
            </label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group"> 
            <label>
              Deadline
              <input
                type="date"
                name="deadline"
                value={editedRecord.deadline ? new Date(editedRecord.deadline).toISOString().split('T')[0] : ''}
                onChange={handleInputChange}
                required
              />
            </label>
            </div>
          </div>
          <br/>
          <div className="button-row">
          <button className="update" onClick={handleSave}>Update</button>
          <button className="cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
);
};

export default EditForm;

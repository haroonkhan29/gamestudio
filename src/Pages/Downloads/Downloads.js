import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDownloadContext } from "../../DownloadContext";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {pink} from '@mui/material/colors';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import PendingIcon from '@mui/icons-material/Pending';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UpdateIcon from '@mui/icons-material/Update';
import AppleIconComponent from "./AppleIconComponent";
import AndriodIconComponent from "./AndriodIconComponent";
import "./Download.css";

const DailyAssignment = () => {
  const { addDownload } = useDownloadContext();
  const Navigate = useNavigate();

  const initialDeveloperList = [];
  const initialProjectList = [];

  const [developerList, setDeveloperList] = useState(initialDeveloperList);
  const [projectList, setProjectList] = useState(initialProjectList);

  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    account: "",
    date: today, 
    project: "",
    developer: "",
    status: "",
    task: "",
    deadline: today, 
  });

  useEffect(() => {
    // fetch("http://35.184.241.89:3000/developer/getAll")
    //   .then((response) => response.json())
    //   .then((data) => setDeveloperList(data))
    //   .catch((error) => console.error("Error fetching developers:", error));

    fetch("http://3.140.190.237:3002/project/getAll")
    .then((response) => response.json())
    .then((data) => {
      // Sort the project list in ascending order based on the project name
      const sortedProjectList = data.sort((a, b) => a.name.localeCompare(b.name));
      setProjectList(sortedProjectList);
    })
    .catch((error) => console.error("Error fetching projects:", error));
}, []);

  const handleDeveloperInputChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
  };

  const handleProjectInputChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'date' || name === 'deadline' ? value : value;
    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
  };
  const handleAccountCheckboxChange = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      account: name,
    }));
  };
  const handleStatusCheckboxChange = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      status: name,
    }));
  };
  const deleteDeveloper = async (developerId) => {
    try {
      await fetch(`http://3.140.190.237:3002/developer/${developerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Developer with ID ${developerId} deleted successfully.`);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await fetch(`http://3.140.190.237:3002/project/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Project with ID ${projectId} deleted successfully.`);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://3.140.190.237:3002/developer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.developer }),
      });

      await fetch("http://3.140.190.237:3002/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.project }),
      });

      const response = await fetch("http://3.140.190.237:3002/dailyAssignment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }

    addDownload(formData);
    setFormData({
      account: "",
      date: new Date().toISOString().split('T')[0],
      project: "",
      developer: "",
      status: "",
      task: "",
      deadline: new Date().toISOString().split('T')[0],

    });
  };

  return (
    <div>
      <div className="header">
        <h1>Daily Assignment</h1>
      </div>
      <div className="bank-detail-form2 ">
        <h2 style={{ color: "#141414" }}> </h2>
        <div className="button-row">
        <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-row main-row">
  <div className="grid-container">
    <div className="label">Date</div>
    <div className="label">Project</div>
    <div className="label">Developer</div>
    <div className="label">Task</div>
    <div className="label">Deadline</div>

    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
    <input type="text" 
    name="project" 
    value={formData.project} 
    onChange={handleProjectInputChange} 
    required list="projectList"
    />
      <datalist id="projectList">
                  {projectList.map((project) => (
                    <option key={project._id} value={project.name} />
                  ))}
                </datalist>
    <input type="text" name="developer" value={formData.developer} onChange={handleDeveloperInputChange} required list="developerList" />
    <datalist id="developerList">
                {developerList.map((developer) => (
                <option key={developer.name} value={developer.name} />
                 ))}
            <option value="Afifa Nafees" />
            <option value="Adan Mehmood" />
            <option value="Daud Anjum (QA)" />
            <option value="Fiza Raouf" />
            <option value="Fahad" />
            <option value="Haroon Afridi (MERN)" />
           <option value="Rana Umar" />
           <option value="Sebtain Minhas" />
           <option value="Tanveer Kayani" />
           <option value="Tuba Naz" />
           <option value="Usman Raza" />
           <option value="Usama Sajjad (Designer)" />
           <option value="Umair Liaqat" />
           <option value="Zahid Sarfraz" />


           </datalist>
    <input type="text" name="task" value={formData.task} onChange={handleInputChange} required />
    <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} required />
  </div>
</div>

        <br/>
              <div className="form-row">
              <label className="status-label">Studio</label>
              <FormControlLabel
             control={
            <AndriodIconComponent
           checked={formData.account === 'D.Apps'}
           onChange={() => handleAccountCheckboxChange('D.Apps')}
           />
           }
      label="D.Apps"
      style={{ color: 'green' }}

    />
      <FormControlLabel
      control={
        <AndriodIconComponent
          checked={formData.account === 'AppStark'}
          onChange={() => handleAccountCheckboxChange('AppStark')}
        />
      }
      label="AppStark"
      style={{ color: 'green' }}

    />
        <FormControlLabel
      control={
        <AndriodIconComponent
          checked={formData.account === 'NanfaStudio'}
          onChange={() => handleAccountCheckboxChange('NanfaStudio')}
        />
      }
      label="NanfaStudio"
      style={{ color: 'green' }}

    />
    <FormControlLabel
      control={
        <AppleIconComponent
          checked={formData.account === 'iOS(A.H)'}
          onChange={() => handleAccountCheckboxChange('iOS(A.H)')}
        />
      }
      label="iOS(A.H)"
      style={{ color: 'green' }}
    />
     <FormControlLabel
      control={
        <AppleIconComponent
          checked={formData.account === 'iOS(K.H)'}
          onChange={() => handleAccountCheckboxChange('iOS(K.H)')}
        />
      }
      label="iOS(K.H)"
      style={{ color: 'green' }}
    />
     <FormControlLabel
         control={
        <Checkbox
          checked={formData.account === 'ActionShore'}  
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
          checked={formData.account === 'Open'}  
          onChange={() =>handleAccountCheckboxChange('Open')}
          icon={<CropSquareIcon style={{ color: 'black' , fontSize: 40}} />}  
          checkedIcon={<CropSquareIcon style={{ color: pink[600] , fontSize: 40}} />}  
        />
      }
      label="Open"
      style={{ color: 'green' }}

    />
  </div>
  <br/>                 
          <div className="form-row">
          <label className="status-label">Status</label>
        <FormControlLabel
         control={
        <Checkbox
          checked={formData.status === 'InProcess'}  
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
          checked={formData.status === 'Q.A'}  
          onChange={() => handleStatusCheckboxChange('Q.A')}
          icon={<BeenhereIcon  style={{ color: 'Black ', fontSize: 40 }} />}  
          checkedIcon={<BeenhereIcon  style={{ color: pink[600], fontSize: 40 }} />}  
        />
      }
      label="Q.A"
      style={{ color: 'green' }}

    />

    <FormControlLabel
      control={
        <Checkbox
          checked={formData.status === 'Pending'}  
          onChange={() => handleStatusCheckboxChange('Pending')}
          icon={<PendingActionsIcon style={{ color: 'Red' , fontSize: 40}} />}  
          checkedIcon={<PendingActionsIcon style={{ color: pink[600] , fontSize: 40}} />}  
        />
      }
      label="Pending"
      style={{ color: 'green' }}

    />
     <FormControlLabel
      control={
        <Checkbox
          checked={formData.status === 'Completed'} 
          onChange={() => handleStatusCheckboxChange('Completed')}
          icon={<CloudDoneIcon style={{ color: 'Green', fontSize: 40 }} />} 
          checkedIcon={<CloudDoneIcon style={{ color: pink[600], fontSize: 40 }} />} 
        />
      }
      label="Completed"
      style={{ color: 'green' }}

    />
   
       <FormControlLabel
      control={
        <Checkbox
          checked={formData.status === 'Upload'} 
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
          checked={formData.status === 'Update'} 
          onChange={() => handleStatusCheckboxChange('Update')}
          icon={<UpdateIcon style={{ color: 'green' , fontSize: 40}} />}  
          checkedIcon={<UpdateIcon style={{ color: pink[600], fontSize: 40 }} />}  
        />
      }
      label="Update"
      style={{ color: 'green' }}

    />
         </div>
            
            <br/>
            <div className="form-row">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DailyAssignment;

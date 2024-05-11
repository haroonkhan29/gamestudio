import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./EditForm.css";

const EditForm = ({ id, data, onSubmit, setIsEditing, currentProfilePicPath }) => {
  const [editedData, setEditedData] = useState(data);
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
  };

  const handleSubmit = async () => {
    confirmAlert({
      title: "Confirm Update",
      message: <div><p>Are you sure you want to update this record?</p></div>,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const formData = new FormData();
              if (profilePicFile) {
                formData.append("profilePic", profilePicFile);
              }
              formData.append("data", JSON.stringify(editedData));

              const response = await fetch(`http://localhost:8080/employee/${id}`, {
                method: 'PUT',
                body: formData,
              });

              if (response.ok) {
                const updatedEmployee = await response.json();
                onSubmit(updatedEmployee);
                setIsEditing(false);
              } else {
                console.error('Failed to update employee:', response.statusText);
              }
            } catch (error) {
              console.error('Error updating employee:', error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    setProfilePicFile(null);
  };
  return (
    <div className="modal-overlay">
      <div className="editFormWrapper">
        
        <form onSubmit={(e) => e.preventDefault()}>
        <label>
            Profile Picture
            <input
              type="file"
              name="profilePic"
              onChange={(e) => handleFileChange(e)}
            />
          </label>

          <div className="current-profile-pic">
             {profilePicFile && (
              <img
              src={profilePicFile ? URL.createObjectURL(profilePicFile) : `http://localhost:8080/${currentProfilePicPath}`}              
                alt="New Profile Pic"
                className="profile-pic"
              />
            )}
          </div>
              <label> ID<span className="required">*</span>
              <input
                type="text"
                name="id"
                value={editedData.id}
                onChange={handleChange}
                required
              />
            </label>
            <label>
            Status
            <input
              name="status"
              value={editedData.status}
              onChange={handleChange}
              list="statusList"
              required
            />
              <datalist id="statusList">
              <option value="">Select Status</option>
              <option value="Active"> </option>
              <option value="Former"></option>
              </datalist>
          </label>
          <label>
            
          Full Name<span className="required">*</span>
            <input
              type="text"
              name="fullName"
              value={editedData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
          Email<span className="required">*</span>
            <input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date of Birth
            <input
              type="date"
              name="dob"
              value={editedData.dob}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Joining Date
            <input
              type="date"
              name="joining"
              value={editedData.joining}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Leaving Date
            <input
              type="date"
              name="leavingDate"
              value={editedData.leavingDate}
              onChange={handleChange}
            />
          </label>
          <label>
          Department
            <input
              type="text"
              name= "department"
              value={editedData.department}
              onChange={handleChange}
            />
          </label>
          <label>
            Job Title
            <input
              type="text"
              name="tittle"
              value={editedData.tittle}
              onChange={handleChange}
            />
          </label>
          <label>
            Account Number
            <input
              type="text"
              name="account"
              value={editedData.account}
              onChange={handleChange}
            />
          </label>
          <label>
            Salary
            <input
              type="number"
              name="salary"
              value={editedData.salary}
              onChange={handleChange}
              required
            />
          </label>
        
          <label>
            Contact<span className="required">*</span>

            <input
              type="text"
              name="contact"
              value={editedData.contact}
              onChange={handleChange}
            />
          </label>
          <label>
            City
            <input              
              name="addressCity"
              value={editedData.addressCity}
              onChange={handleChange}
              list="addressCityList"
              required
              />
              <datalist id="addressCityList">
              <option value="Abbottabad">Abbottabad</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Multan">Multan</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Rawalpindi">Rawalpindi</option>
              </datalist>
          </label>

          <label>
            Postal Code
            <input
              type="text"
              name="addressPostalCode"
              value={editedData.addressPostalCode}
              onChange={handleChange}
            />
          </label>
          <label>
            CNIC<span className="required">*</span>

            <input
              type="text"
              name="cnic"
              value={editedData.cnic}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Gender
            <input
              name="gender"
              value={editedData.gender}
              onChange={handleChange}
              list="genderList"
              required
            />
              <datalist id="genderList">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              </datalist>
          </label>
          {/* <br/> */}
          <div className="button-group">
          <button type="button" className="update-button" onClick={handleSubmit}>
              Update
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default EditForm;
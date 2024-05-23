import React, { useState } from "react";
import axios from "axios";
import  "./Form.css";

const AdMobEditForm = ({ selectedAdMob, onClose, onUpdate }) => {
  const [editedDate, setEditedDate] = useState(selectedAdMob.date);
  const [editedAccountName, setEditedAccountName] = useState(
    
    selectedAdMob.accountName
  );
  const [editedProfilePic, setEditedProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    selectedAdMob.profilePic
    ? `http://localhost:8080/uploads/${selectedAdMob.profilePic}`
    : null
);
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("date", editedDate);
      formData.append("accountName", editedAccountName);
      if (editedProfilePic) {
        formData.append("profilePic", editedProfilePic);
      }
      const response = await axios.put(
        `http://localhost:8080/admob/${selectedAdMob._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
    <div className="edit-form">
      <label>
        Date
        <input
          type="date"
          value={editedDate}
          onChange={(e) => setEditedDate(e.target.value)}
        />
      </label>
      <label>
        Account Name
        <select
          type="text"
          value={editedAccountName}
          onChange={(e) => setEditedAccountName(e.target.value)}
      >
        <option value="AppStark">AppStark</option>
        <option value="D.Apps">D.Apps</option>
        <option value="ActionShore">ActionShore</option>
      </select>
      </label>
      <label>
      AdMobscreen
        <input
      type="file"
      onChange={(e) => {
        const file = e.target.files[0];
        setEditedProfilePic(file);
        setImagePreview(URL.createObjectURL(file));
      }}
    />
      {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            style={{ width: "100px", height: "50px", marginTop: "10px", marginLeft: "500px" }}
          />
        )}
      </label>
       <div className="button-row">
       <button className="update" onClick={handleSave}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default AdMobEditForm;

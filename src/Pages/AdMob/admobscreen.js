import React, { useState } from "react";
import { useAdmobContext } from "../../Admocontext";
import axios from "axios";

const AdMobscreen = () => {
  const { addAdmobData } = useAdmobContext();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today, 
    accountName: "",
    profilePic: null,
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("date", formData.date);
    data.append("accountName", formData.accountName);
    data.append("profilePic", formData.profilePic);

    try {
      const response = await axios.post("http://localhost:8080/admob", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     
      addAdmobData(response.data);

      setIsSubmitSuccess(true);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        accountName: "",
        profilePic: null,
      });

      setTimeout(() => {
        setIsSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <div className="header">
      <h1>AdMob Screen </h1>
      </div>
      <div className="admob-detail-form">
      {isSubmitSuccess && <p style={{ color: 'green' }}>Form submitted successfully on {formData.date}!</p>}
      <h2 style={{ color: "#141414" }}> </h2>
      <div className="button-row">
      <form onSubmit={handleSubmit}>
      <div className="form-row">
      <div className="input-group">
        <label>
          Date
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        </label>
        </div>
        </div>
        <div className="form-row">
        <div className="input-group">
       <label>
      Account Name
      <select
        name="accountName"
        value={formData.accountName}
        onChange={handleInputChange}
      >
        <option value="AppStark">AppStark</option>
        <option value="D.Apps">D.Apps</option>
        <option value="ActionShore">ActionShore</option>
      </select>
    </label>
   </div>
    </div>
       <div className="form-row">
        <div className="input-group">
        <label>AdMobscreen
        <input type="file" name="profilePic" onChange={handleFileChange} />
        </label>
        </div>
       </div>
       <br/>
        <div className="form-row">
        <button type="submit" className="button">
         Submit
        </button>
        </div>    
      </form>
      </div>
      </div>
      </div>

  );
};

export default AdMobscreen;

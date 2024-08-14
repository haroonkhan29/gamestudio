import React, { useState } from "react";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";
import Expensesheetform from "../Expensesheetform/Expensesheetform";
import "./expenseform.css";
   
const Expenseform = () => {
  const { addProgressDetail } = useProgressContext();
  const [progressFormData, setProgressFormData] = useState({
    // googlenewDate: "", 
    employeeCost: "",
    jan: "",
      feb: "",
      march: "",
      april: "",
      may: "",
      june: "",
      july: "",
      aug: "",
      sep: "",
      oct: "",
      nov: "",
      dec: "",
    officeCost: "",
    officejan: "",
    officefeb: "",
    officemarch: "",
    officeapril: "",
    officemay: "",
    officejune: "",
    officejuly: "",
    officeaug: "",
    officesep: "",
    officeoct: "",
    officenov: "",
    officedec: "",
    marketingCost: "",	
    marketingjan: "",
    marketingfeb: "",
    marketingmarch: "",
    marketingapril: "",
    marketingmay: "",
    marketingjune: "",
    marketingjuly: "",
    marketingaug: "",
    marketingsep: "",
    marketingoct: "",
    marketingnov: "",
    marketingdec: "",
    events: "",	
    eventsjan: "",
    eventsfeb: "",
    eventsmarch: "",
    eventsapril: "",
    eventsmay: "",
    eventsjune: "",
    eventsjuly: "",
    eventsaug: "",
    eventssep: "",
    eventsoct: "",
    eventsnov: "",
    eventsdec: "",
  });

  const appOptions = {
      "Appstark Tech": [
      "Number location",
      "Phone locator",
      "Smart switch- Data transfer",
      "Caller ID: Phone number lookup",
      "Data Recovery: Recover Files",
      "Cloud storage: Cloud backup",
      "FM Radio: radio tuner",
      "GPS Navigation- GPS Maps",
    ],
   
    
    "D-apps Studio": [
    "Mobile Number Locator",
    "PDF Scanner: PDF Creator",
    "Gallery App: Vault, album",
    "Cast to TV: Mirror Screen",
    "Wifi Scanner: wifi analyzer",
    "screen locker: time passcode",
    "Sticker Maker: Create Stickers",
    "Video to Mp3 converter",
    "Smart Switch Phone Transfer",
    "Speed camera: radar, alerts",
    "Video Recovery- Data recovery",
    "AI Photo Generator: AI Art",
    "Flight Radar- Airlines Tracker",
     ],
    
    "ActionShore": ["Ludo multiplayer Games- Dice",
  ],
    "Adnan Haider (ios Account)": ["Smart switch: clone phone",
    "AI Photo generator: AI Art",
    ],
    "Syed Kamran Haider (ios Account)": ["Cloud storage: Cloud backup",
    "Smart Switch- Mobile transfer",    
    ],
  };
  const handleProgressInputChange = (e) => {
    const { name, value } = e.target;
    setProgressFormData({
      ...progressFormData,
      [name]: value,
    });
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    console.log("Progress Form submitted:", progressFormData);
    try {
      const response = await axios.post(
        "http://3.140.190.237:3002/expenseform",
        progressFormData
      );
      console.log(response.data);
      addProgressDetail(response.data);
    } catch (error) {
      console.error("Error creating progress:", error);
    }
    setProgressFormData({
      employeeCost: "",
      jan: "",
      feb: "",
      march: "",
      april: "",
      may: "",
      june: "",
      july: "",
      aug: "",
      sep: "",
      oct: "",
      nov: "",
      dec: "",
      officeCost: "",
      officejan: "",
      officefeb: "",
      officemarch: "",
      officeapril: "",
      officemay: "",
      officejune: "",
      officejuly: "",
      officeaug: "",
      officesep: "",
      officeoct: "",
      officenov: "",
      officedec: "",
      marketingCost: "",	
      marketingjan: "",
      marketingfeb: "",
      marketingmarch: "",
      marketingapril: "",
      marketingmay: "",
      marketingjune: "",
      marketingjuly: "",
      marketingaug: "",
      marketingsep: "",
      marketingoct: "",
      marketingnov: "",
      marketingdec: "",
      events: "",	
      eventsjan: "",
      eventsfeb: "",
      eventsmarch: "",
      eventsapril: "",
      eventsmay: "",
      eventsjune: "",
      eventsjuly: "",
      eventsaug: "",
      eventssep: "",
      eventsoct: "",
      eventsnov: "",
      eventsdec: "",
    });
  };
  return (
    <div>
      <div className="header">
        <h1>Expense 2023</h1>
      </div>
      <div className="progress-detail">
        <h2 style={{ color: "#141414" }}> </h2>
        <div className="button-row">
          <form onSubmit={handleProgressSubmit} className="inline-form">
            <div className="input-group">
              <label>
                Employee/Cost
                <input type="text" name="employeeCost" value={progressFormData.employeeCost} onChange={handleProgressInputChange} />
              </label>
              -
            </div>
            <div className="input-group">
              <label>
                Office/Cost
                <input type="text" name="officeCost" value={progressFormData.officeCost} onChange={handleProgressInputChange} />
              </label>
              -
            </div>
            <div className="input-group">
              <label>
                Marketing/Cost
                <input type="text" name="marketingCost" value={progressFormData.marketingCost} onChange={handleProgressInputChange} />
              </label>
              -
            </div>
            <div className="input-group">
              <label>
                Events/Activities
                <input type="text" name="events" value={progressFormData.events} onChange={handleProgressInputChange} />
              </label>
              -
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Expensesheetform />
    </div>
  );
}
  
export default Expenseform;





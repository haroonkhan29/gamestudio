import React, { useState } from "react";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";
import "./Progress.css";
   
const Progress = () => {
  const { addProgressDetail } = useProgressContext();
  const [progressFormData, setProgressFormData] = useState({
    // googlenewDate: "", 
    googleAccount: "",
    googleTotalInstalls: "",
    googleTotalUninstalls: "",
    googletotalUserLoss: "", 
    googleConversionRate: "",
    googleApps: "",
    googleappPublishedDate: "", 
    gameAccount: "",
    gameTotalInstalls: "",
    gameTotalUninstalls: "",
    gametotalUserLoss: "", 
    gameConversionRate: "",
    gameApps: "",
    gameappPublishedDate: "", 
    iOSAccount: "",
    iOSTotalInstalls: "",
    iOSTotalUninstalls: "",
    iOStotalUserLoss: "", 
    iOSConversionRate: "",
    iOSApps: "",
    iOSappPublishedDate: "" ,
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
        "http://localhost:8080/progress",
        progressFormData
      );
      console.log(response.data);
      addProgressDetail(response.data);
    } catch (error) {
      console.error("Error creating progress:", error);
    }
    setProgressFormData({
      googleAccount: "",
      googleTotalInstalls: "",
      googleTotalUninstalls: "",
      googletotalUserLoss: "",
      googleConversionRate: "",
      googleApps: "",
      googleappPublishedDate: "",
      gameAccount: "",
      gameTotalInstalls: "",
      gameTotalUninstalls: "",
      gametotalUserLoss: "",
      gameConversionRate: "",
      gameApps: "",
      gameappPublishedDate: "",
      iOSAccount: "",
      iOSTotalInstalls: "",
      iOSTotalUninstalls: "",
      iOStotalUserLoss: "",
      iOSConversionRate: "",
      iOSApps: "",
      iOSappPublishedDate: "",
    });
  };
  return (
    <div>
      <div className="header">
        <h1>App Progress</h1>
      </div>
      <div className="progress-detail">
        <h2 style={{ color: "#141414" }}> </h2>
        <div className="button-row">
          <form onSubmit={handleProgressSubmit}>
          {/* <div className="form-row">
        <div className="input-group">
          <label>
            New Date (Month and Year):
            <input
              type="month"
              name="googlenewDate"
              value={progressFormData.googlenewDate}
              onChange={handleProgressInputChange}
            />
          </label>
        </div>
      </div> */}
            <div className="form-row">
              <div className="input-group">
                <label>
                  Google Console:
                  <input
                    name="googleAccount"
                    value={progressFormData.googleAccount}
                    onChange={(e) => handleProgressInputChange(e)}
                    list="googleAccountList"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="googleAccountList">
                    <option value="">Select a Google Account</option>
                    <option value="Appstark Tech">Appstark Tech</option>
                    <option value="D-apps Studio">D-apps Studio</option>
                  </datalist>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                  Apps:
                  <input
                    name="googleApps"
                    value={progressFormData.googleApps}
                    onChange={handleProgressInputChange}
                    list="appsDatalist"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="appsDatalist"></datalist>
                </label>
                </div>
                </div>
                <div className="form-row">
              <div className="input-group">
                <label>
                  App Published Date:
                  <input
                    type="date"
                    name="googleappPublishedDate"
                    value={progressFormData.googleappPublishedDate}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Daily install              
                <input
                    type="text"
                    name="googleTotalInstalls"
                    value={progressFormData.googleTotalInstalls}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Total install          
                <input
                    type="text"
                    name="googleTotalUninstalls"
                    value={progressFormData.googleTotalUninstalls}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
              <div className="input-group">
                <label>
                  Total User Loss:
                  <input
                    type="text"
                    name="googletotalUserLoss"
                    value={progressFormData.googletotalUserLoss}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                Conversion Rate:
                  <input
                    type="text"
                    name="googleConversionRate"
                    value={progressFormData.googleConversionRate}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
               <div className="form-row">
               <div className="input-group">
                <label>
                  Game Console:
                  <input
                    name="gameAccount"
                    value={progressFormData.gameAccount}
                    onChange={handleProgressInputChange}
                    list="GameAccountList"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="GameAccountList">
                    <option value="">Select a Game Account</option>
                    <option value="ActionShore">ActionShore</option>
                    
                  </datalist>
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                  Apps:
                  <input
                    name="gameApps"
                    value={progressFormData.gameApps}
                    onChange={handleProgressInputChange}
                    list="appsDatalist"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="appsDatalist"></datalist>
                </label>
                </div>
                </div>
                <div className="form-row">
              <div className="input-group">
                <label>
                  App Published Date:
                  <input
                    type="date"
                    name="gameappPublishedDate"
                    value={progressFormData.gameappPublishedDate}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Daily install              
                  <input
                    type="text"
                    name="gameTotalInstalls"
                    value={progressFormData.gameTotalInstalls}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Total install          
                  <input
                    type="text"
                    name="gameTotalUninstalls"
                    value={progressFormData.gameTotalUninstalls}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>           
                <div className="form-row">
              <div className="input-group">
                <label>
                  Total User Loss:
                  <input
                    type="text"
                    name="gametotalUserLoss"
                    value={progressFormData.gametotalUserLoss}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> 
            <div className="form-row">
              <div className="input-group">
                <label>
                Conversion Rate:
                  <input
                    type="text"
                    name="gameConversionRate"
                    value={progressFormData.gameConversionRate}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> 
               <div className="form-row">
                <div className="input-group">
                <label>
                  iOS Console:
                  <input
                    name="iOSAccount"
                    value={progressFormData.iOSAccount}
                    onChange={handleProgressInputChange}
                    list="iOSAccountList"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="iOSAccountList">
                    <option value="">Select an iOS Account</option>
                    <option value="Adnan Haider (ios Account)">Adnan Haider (ios Account)</option>
                    <option value="Syed Kamran Haider (ios Account)">
                      Syed Kamran Haider (ios Account)
                    </option>
                  </datalist>
                </label>
                </div>
                </div> 
                <div className="form-row">
                <div className="input-group">      
                <label>
                  Apps:
                  <input
                    name="iOSApps"
                    value={progressFormData.iOSApps}
                    onChange={handleProgressInputChange}
                    list="appsDatalist"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="appsDatalist"></datalist>
                </label>
                </div>
                </div> 
                <div className="form-row">
              <div className="input-group">
                <label>
                  App Published Date:
                  <input
                    type="date"
                    name="iOSappPublishedDate"
                    value={progressFormData.iOSappPublishedDate}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
                <div className="form-row">
                <div className="input-group">  
                <label>
                Daily install              
                  <input
                    type="text"
                    name="iOSTotalInstalls"
                    value={progressFormData.iOSTotalInstalls}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">  
                <label>
                  Total installs
                  <input
                    type="text"
                    name="iOSTotalUninstalls"
                    value={progressFormData.iOSTotalUninstalls}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                  Total User Loss:
                  <input
                    type="text"
                    name="iOStotalUserLoss"
                    value={progressFormData.iOStotalUserLoss}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                Conversion Rate:
                  <input
                    type="text"
                    name="iOSConversionRate"
                    value={progressFormData.iOSConversionRate}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> 
            <div className="form-row">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Progress;





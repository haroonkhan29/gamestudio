import React, { useState } from "react";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";
// import "./Progress.css";
   
const Expensesheetform = () => {
  const { addProgressDetail } = useProgressContext();
  const [progressFormData, setProgressFormData] = useState({
    // googlenewDate: "", 
    employeesCost: "",
    jans: "",
      febs: "",
      marchs: "",
      aprils: "",
      mays: "",
      junes: "",
      julys: "",
      augs: "",
      seps: "",
      octs: "",
      novs: "",
      decs: "",
    officesCost: "",
    officesjan: "",
    officesfeb: "",
    officesmarch: "",
    officesapril: "",
    officesmay: "",
    officesjune: "",
    officesjuly: "",
    officesaug: "",
    officessep: "",
    officesoct: "",
    officesnov: "",
    officesdec: "",
    marketingsCost: "",	
    marketingsjan: "",
    marketingsfeb: "",
    marketingsmarch: "",
    marketingsapril: "",
    marketingsmay: "",
    marketingsjune: "",
    marketingsjuly: "",
    marketingsaug: "",
    marketingssep: "",
    marketingsoct: "",
    marketingsnov: "",
    marketingsdec: "",
    eventss: "",	
    eventssjan: "",
    eventssfeb: "",
    eventssmarch: "",
    eventssapril: "",
    eventssmay: "",
    eventssjune: "",
    eventssjuly: "",
    eventssaug: "",
    eventsssep: "",
    eventssoct: "",
    eventssnov: "",
    eventssdec: "",
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
        "http://localhost:8080/expensesheet",
        progressFormData
      );
      console.log(response.data);
      addProgressDetail(response.data);
    } catch (error) {
      console.error("Error creating progress:", error);
    }
    setProgressFormData({
        employeesCost: "",
        jans: "",
          febs: "",
          marchs: "",
          aprils: "",
          mays: "",
          junes: "",
          julys: "",
          augs: "",
          seps: "",
          octs: "",
          novs: "",
          decs: "",
        officesCost: "",
        officesjan: "",
        officesfeb: "",
        officesmarch: "",
        officesapril: "",
        officesmay: "",
        officesjune: "",
        officesjuly: "",
        officesaug: "",
        officessep: "",
        officesoct: "",
        officesnov: "",
        officesdec: "",
        marketingsCost: "",	
        marketingsjan: "",
        marketingsfeb: "",
        marketingsmarch: "",
        marketingsapril: "",
        marketingsmay: "",
        marketingsjune: "",
        marketingsjuly: "",
        marketingsaug: "",
        marketingssep: "",
        marketingsoct: "",
        marketingsnov: "",
        marketingsdec: "",
        eventss: "",	
        eventssjan: "",
        eventssfeb: "",
        eventssmarch: "",
        eventssapril: "",
        eventssmay: "",
        eventssjune: "",
        eventssjuly: "",
        eventssaug: "",
        eventsssep: "",
        eventssoct: "",
        eventssnov: "",
        eventssdec: "",
    });
  };
  return (
    <div>
      <div className="header">
        <h1>Expense 2024</h1>
      </div>
      <div className="progress-detail">
        <h2 style={{ color: "#141414" }}> </h2>
        <div className="button-row">
        <form onSubmit={handleProgressSubmit} className="inline-form">
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
              <div className="input-group">
                <label>
                 Employee/Cost
                  <input
                    type="text"
                    name="employeesCost"
                    value={progressFormData.employeesCost}
                    onChange={handleProgressInputChange}
                  />
                </label>
                -
            </div>
            {/* <div className="form-row">
              <div className="input-group">
                <label>
                 Jan
                  <input
                    type="text"
                    name="jan"
                    value={progressFormData.jan}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Feb
                  <input
                    type="text"
                    name="feb"
                    value={progressFormData.feb}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Mar
                  <input
                    type="text"
                    name="march"
                    value={progressFormData.march}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 April
                  <input
                    type="text"
                    name="april"
                    value={progressFormData.april}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 May
                  <input
                    type="text"
                    name="may"
                    value={progressFormData.may}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 June
                  <input
                    type="text"
                    name="june"
                    value={progressFormData.june}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 July
                  <input
                    type="text"
                    name="july"
                    value={progressFormData.july}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Aug
                  <input
                    type="text"
                    name="aug"
                    value={progressFormData.aug}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Sept
                  <input
                    type="text"
                    name="sep"
                    value={progressFormData.sep}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Oct
                  <input
                    type="text"
                    name="oct"
                    value={progressFormData.oct}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Nov
                  <input
                    type="text"
                    name="nov"
                    value={progressFormData.nov}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Dec
                  <input
                    type="text"
                    name="dec"
                    value={progressFormData.dec}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> */}
              <div className="input-group">
                <label>
                 Office/Cost
                  <input
                    type="text"
                    name="officesCost"
                    value={progressFormData.officesCost}
                    onChange={handleProgressInputChange}
                  />
                </label>
                -
            </div>
            {/* <div className="form-row">
              <div className="input-group">
                <label>
                 Jan
                  <input
                    type="text"
                    name="officejan"
                    value={progressFormData.officejan}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Feb
                  <input
                    type="text"
                    name="officefeb"
                    value={progressFormData.officefeb}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Mar
                  <input
                    type="text"
                    name="officemarch"
                    value={progressFormData.officemarch}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 April
                  <input
                    type="text"
                    name="officeapril"
                    value={progressFormData.officeapril}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 May
                  <input
                    type="text"
                    name="officemay"
                    value={progressFormData.officemay}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 June
                  <input
                    type="text"
                    name="officejune"
                    value={progressFormData.officejune}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 July
                  <input
                    type="text"
                    name="officejuly"
                    value={progressFormData.officejuly}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Aug
                  <input
                    type="text"
                    name="officeaug"
                    value={progressFormData.officeaug}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Sept
                  <input
                    type="text"
                    name="officesep"
                    value={progressFormData.officesep}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Oct
                  <input
                    type="text"
                    name="officeoct"
                    value={progressFormData.officeoct}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Nov
                  <input
                    type="text"
                    name="officenov"
                    value={progressFormData.officenov}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Dec
                  <input
                    type="text"
                    name="officedec"
                    value={progressFormData.officedec}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> */}
             <div className="input-group">
                <label>
                 Marketing/Cost
                  <input
                    type="text"
                    name="marketingsCost"
                    value={progressFormData.marketingsCost}
                    onChange={handleProgressInputChange}
                  />
                </label>
                -
              </div>
            {/* <div className="form-row">
              <div className="input-group">
                <label>
                 Jan
                  <input
                    type="text"
                    name="marketingjan"
                    value={progressFormData.marketingjan}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> */}
            {/* <div className="form-row">
              <div className="input-group">
                <label>
                 Feb
                  <input
                    type="text"
                    name="marketingfeb"
                    value={progressFormData.marketingfeb}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Mar
                  <input
                    type="text"
                    name="marketingmarch"
                    value={progressFormData.marketingmarch}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 April
                  <input
                    type="text"
                    name="marketingapril"
                    value={progressFormData.marketingapril}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 May
                  <input
                    type="text"
                    name="marketingmay"
                    value={progressFormData.marketingmay}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 June
                  <input
                    type="text"
                    name="marketingjune"
                    value={progressFormData.marketingjune}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 July
                  <input
                    type="text"
                    name="marketingjuly"
                    value={progressFormData.marketingjuly}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Aug
                  <input
                    type="text"
                    name="marketingaug"
                    value={progressFormData.marketingaug}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Sept
                  <input
                    type="text"
                    name="marketingsep"
                    value={progressFormData.marketingsep}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Oct
                  <input
                    type="text"
                    name="marketingoct"
                    value={progressFormData.marketingoct}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Nov
                  <input
                    type="text"
                    name="marketingnov"
                    value={progressFormData.marketingnov}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Dec
                  <input
                    type="text"
                    name="marketingdec"
                    value={progressFormData.marketingdec}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> */}
              <div className="input-group">
                <label>
                Events/Activities
                  <input
                    type="text"
                    name="eventss"
                    value={progressFormData.eventss}
                    onChange={handleProgressInputChange}
                  />
                </label>
                -
            </div>
            {/* <div className="form-row">
              <div className="input-group">
                <label>
                 Jan
                  <input
                    type="text"
                    name="eventsjan"
                    value={progressFormData.eventsjan}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Feb
                  <input
                    type="text"
                    name="eventsfeb"
                    value={progressFormData.eventsfeb}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Mar
                  <input
                    type="text"
                    name="eventsmarch"
                    value={progressFormData.eventsmarch}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 April
                  <input
                    type="text"
                    name="eventsapril"
                    value={progressFormData.eventsapril}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 May
                  <input
                    type="text"
                    name="eventsmay"
                    value={progressFormData.eventsmay}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 June
                  <input
                    type="text"
                    name="eventsjune"
                    value={progressFormData.eventsjune}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 July
                  <input
                    type="text"
                    name="eventsjuly"
                    value={progressFormData.eventsjuly}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Aug
                  <input
                    type="text"
                    name="eventsaug"
                    value={progressFormData.eventsaug}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Sept
                  <input
                    type="text"
                    name="eventssep"
                    value={progressFormData.eventssep}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Oct
                  <input
                    type="text"
                    name="eventsoct"
                    value={progressFormData.eventsoct}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Nov
                  <input
                    type="text"
                    name="eventsnov"
                    value={progressFormData.eventsnov}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                 Dec
                  <input
                    type="text"
                    name="eventsdec"
                    value={progressFormData.eventsdec}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> */}
            <div className="form-row">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Expensesheetform;





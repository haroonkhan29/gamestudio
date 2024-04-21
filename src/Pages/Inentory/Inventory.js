import React, { useState } from "react";
import { useProgressContext } from "../../ProgressContext";
import axios from "axios";
   
const Inventory = () => {
  const { addProgressDetail } = useProgressContext();
  const [progressFormData, setProgressFormData] = useState({
    // googlenewDate: "", 
    sNo: "",
    item: "",
    brand: "",
    modelNo: "",
    deviceVersion: "", 
    iMEI: "",
    issuedTo: "",
    qty: "", 
    comments:"",
    // ledsNo: "",
    // ledItem: "",
    // ledBrand: "",
    // ledmodelNo: "",
    // ledVersion: "", 
    // ledAccessories: "",
    // ledLocation: "",
    // ledQty: "", 
    // ledComments: "",
  });

  const appOptions = {
      "Mobile": [
      "Tecno Spark Go 23",
    ],
   
    
    "PC": [
    "Dell",
     ],
      
     "AC": [
      "AC",
       ],
    "LED TV": ["Ludo multiplayer Games- Dice",
  ],
  "Camera": ["Ludo multiplayer Games- Dice",
],
"Chairs": ["Ludo multiplayer Games- Dice",
],
"Table": ["Ludo multiplayer Games- Dice",
],
"Books": ["Ludo multiplayer Games- Dice",
],
"Plants": ["Ludo multiplayer Games- Dice",
],
"Nayatel": ["Ludo multiplayer Games- Dice",
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
        "http://localhost:8080/inventory",
        progressFormData
      );
      console.log(response.data);
      addProgressDetail(response.data);
    } catch (error) {
      console.error("Error creating progress:", error);
    }
    setProgressFormData({
      sNo: "",
      item: "",
      brand: "",
      modelNo: "",
      deviceVersion: "", 
      iMEI: "",
      issuedTo: "",
      qty: "",
      comments:"",
      // ledsNo: "",
      // ledItem: "",
      // ledBrand: "",
      // ledmodelNo: "",
      // ledVersion: "", 
      // ledAccessories: "",
      // ledLocation: "",
      // ledQty: "", 
      // ledComments: "",
     
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
                   S.NO:
                  <input
                    type="text"
                    name="sNo"
                    value={progressFormData.sNo}
                    onChange={handleProgressInputChange}
                    style={{ fontSize: "16px" }}
                  />
                </label>
                </div>
                </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                Item
                  <input
                    name="item"
                    value={progressFormData.item}
                    onChange={(e) => handleProgressInputChange(e)}
                    list="googleAccountList"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="googleAccountList">
                    <option value="">Select a Google Account</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC">PC</option>
                    <option value="AC">AC</option>
                
                  </datalist>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                   Brand:
                  <input
                    name="brand"
                    value={progressFormData.brand}
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
                Model No:
                  <input
                    type="text"
                    name="modelNo"
                    value={progressFormData.modelNo}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Device Version          
                <input
                    type="text"
                    name="deviceVersion"
                    value={progressFormData.deviceVersion}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                IMEI         
                <input
                    type="text"
                    name="iMEI"
                    value={progressFormData.iMEI}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
              <div className="input-group">
                <label>
                Issued To
                  <input
                    type="text"
                    name="issuedTo"
                    value={progressFormData.issuedTo}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                Qty
                  <input
                    type="text"
                    name="qty"
                    value={progressFormData.qty}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>
                Comments
                  <input
                    type="text"
                    name="comments"
                    value={progressFormData.comments}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
            {/* <div className="form-row">
                <div className="input-group">
                <label>
                Led S.No
                  <input
                    type="text"
                    name="ledsNo"
                    value={progressFormData.ledsNo}
                    onChange={handleProgressInputChange}
                    style={{ fontSize: "16px" }}
                  />
                </label>
                </div>
                </div>
           
               <div className="form-row">
               <div className="input-group">
                <label>
                Led Item
                  <input
                    name="ledItem"
                    value={progressFormData.ledItem}
                    onChange={handleProgressInputChange}
                    list="GameAccountList"
                    style={{ fontSize: "16px" }}
                  />
                  <datalist id="GameAccountList">
                    <option value="">Select a Game Account</option>
                    <option value="LED TV">LED TV</option>
                    <option value="Camera">Camera</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Table">Table</option>
                    <option value="Books">Books</option>
                    <option value="Plants">Plants</option>
                    <option value="Nayatel">Nayatel</option>

                  </datalist>
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Led Brand
                  <input
                    name="ledBrand"
                    value={progressFormData.ledBrand}
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
                Led Model No
                  <input
                    type="text"
                    name="ledmodelNo"
                    value={progressFormData.ledmodelNo}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Led Version        
                  <input
                    type="text"
                    name="ledVersion"
                    value={progressFormData.ledVersion}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>
                <div className="form-row">
                <div className="input-group">
                <label>
                Led Accessories          
                  <input
                    type="text"
                    name=" ledAccessories"
                    value={progressFormData.ledAccessories}
                    onChange={handleProgressInputChange}
                  />
                </label>
                </div>
                </div>           
                <div className="form-row">
              <div className="input-group">
                <label>
                Led Location:
                  <input
                    type="text"
                    name="ledLocation:"
                    value={progressFormData.ledLocation}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> 
            <div className="form-row">
              <div className="input-group">
                <label>
                Led Qty

                  <input
                    type="text"
                    name="ledQty"
                    value={progressFormData.ledQty}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div> 
            <div className="form-row">
              <div className="input-group">
                <label>
                ledComments
                  <input
                    type="text"
                    name="ledComments:"
                    value={progressFormData.ledComments}
                    onChange={handleProgressInputChange}
                  />
                </label>
              </div>
            </div>  */}
            <br/>
            <div className="form-row">
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Inventory;





import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useBankContext } from "../../BankContext";
import "./bankDetail.css";

import unitedBankLogo from "./images/ubl.png";
import albLogo from "./images/alb.png";
import baLogo from "./images/alf.png";
import askLogo from "./images/ask.png";
import albbLogo from "./images/Albb.png";
import bobLogo from "./images/bob.png";
import balLogo from "./images/bal.jpg";
import HbLLogo from "./images/HbL.png";
import BkLogo from "./images/Bk.gif";
import DbLogo from "./images/Db.png";
import FbLogo from "./images/Fb.png";
import HbLogo from "./images/Hb.jpg";
import jsLogo from "./images/js.png";
import McbLogo from "./images/Mcb.jpg";
import MeezanLogo from "./images/Meezan.png";
import NbLogo from "./images/Nb.png";
import stdLogo from "./images/std.png";
import sobLogo from "./images/sob.jpg";

const BankDetail = () => {
  const { addBankDetail } = useBankContext();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    bank: "",
    google: "",
    accountNumber: "",
    accountTitle: "",
    bankAddress: "",
    card: "",
    expiryDate: "", 
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      console.log("Before fetch:", "http://localhost:8080/bank");
      const response = await fetch("http://localhost:8080/bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("After fetch");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }

    addBankDetail(formData);
    setFormData({
      bank: "",
      google: "",
      accountNumber: "",
      accountTitle: "",
      bankAddress: "",
      card: "",
      expiryDate: "", 
      cvv: "",
    });
  };
  const bankImages = {
    'United Bank Limited': unitedBankLogo,
    'Allied Bank Limited': albLogo,
    'Bank Alfalah': baLogo,
    'Askari Bank': askLogo,
    'Al Baraka Bank': albbLogo,
    'Bank of Punjab': bobLogo,
    'Bank Alfalah Limited': balLogo,
    'Bank AL Habib Limited': HbLLogo,
    'Bank of Khyber': BkLogo,
    'Dubai Islamic Bank': DbLogo,
    'Faysal Bank Limited': FbLogo,
    'Habib Bank Limited':HbLogo,
    'JS Bank Limited': jsLogo,
    'MCB Bank Limited': McbLogo,
    'Meezan Bank Limited': MeezanLogo,
    'National Bank of Pakistan': NbLogo,
    'Standard Chartered Bank': stdLogo,
    'Soneri Bank': sobLogo,
  };
  return (
    <div>
    <div className="header">
      <h1>Bank Account</h1>
    </div>
    <div className="bank-detail-form">
      <h2 style={{ color: "#141414" }}> </h2>
      <div className="button-row">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
          <div className="input-group">
            <label>
              Bank Name:
              <input
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                list="bankList"
                style={{ fontSize: '16px' }} 
                required
                />
                 <datalist id="bankList">
                <option value="Allied Bank Limited">Allied Bank Limited</option>
                <option value="Askari Bank">Askari Bank </option>
                <option  value="Al Baraka Bank">Al Baraka Bank</option>
                <option  value="Bank of Punjab">Bank of Punjab</option>
                <option  value="Bank Alfalah Limited">Bank Alfalah Limited</option>
                <option  value="Bank AL Habib Limited">Bank AL Habib Limited</option>
                <option  value="Bank of Khyber">Bank of Khyber</option>
                <option  value="Bank Alfalah">Bank Alfalah</option>
                <option  value="Dubai Islamic Bank">Dubai Islamic Bank</option>
                <option  value="Faysal Bank Limited">Faysal Bank Limited</option>
                <option  value="Habib Bank Limited">Habib Bank Limited</option>
                <option  value="JS Bank Limited">JS Bank Limited</option>
                <option  value="MCB Bank Limited">MCB Bank Limited</option>
                <option  value="Meezan Bank Limited">Meezan Bank Limited</option>
                <option  value="National Bank of Pakistan">National Bank of Pakistan</option>
                <option  value="Standard Chartered Bank">Standard Chartered Bank</option>
                <option  value="Soneri Bank">Soneri Bank</option>
                <option value="United Bank Limited">United Bank Limited</option>
                </datalist>
              {formData.bank && (
                <img
                  src={bankImages[formData.bank]}
                  alt={`${formData.bank} Logo`}
                  className="bank-logo"
                />
              )}
            </label>
            </div>
            </div>
            <div className="input-group">
            <div className="form-row">
            <label>
              Google Account
              <input
                name="google"
                value={formData.google}
                onChange={handleInputChange}
                list="googleList"
                style={{ fontSize: '16px' }} 
                required
                />
                <datalist id="googleList">
                <option value="Appstark Tech">Appstark Tech</option>
                <option value="D-apps Studio">D-apps Studio</option>
                <option  value="Adnan Haider (ios)">Adnan Haider (ios)</option>
                <option  value="Syed Kamran Haider (ios)">Syed Kamran Haider (ios)</option>
                <option  value="Nanfa Studio">Nanfa Studio</option>

                </datalist>
            </label>
            </div>
            </div>
          <div className="form-row">
          <div className="input-group">
            <label>
              Account Number
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </label>
            </div>
            </div>
            <div className="form-row">
            <div className="input-group">
            <label>
              Account Title
              <input
                type="text"
                name="accountTitle"
                value={formData.accountTitle}
                onChange={handleInputChange}
              />
            </label>
            </div>
            </div>
            <div className="form-row">
            <div className="input-group">
            <label>
              Bank Address
              <input
                type="text"
                name="bankAddress"
                value={formData.bankAddress}
                onChange={handleInputChange}
              />
            </label>
            </div>
            </div>
            <div className="input-group">
            <div className="form-row">
            <label>
              Card
              <input
                type="text"
                name="card"
                value={formData.card}
                onChange={handleInputChange}
              />
            </label>
            </div>
            </div>
            <div className="form-row">
            <div className="input-group">
            <label>
              Expiry Date:
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </label>
            </div>
            </div>
            <div className="form-row">
            <div className="input-group">
            <label>
              CVV
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </label>
            </div>    
            </div>    
            <div className="form-row">
            <button type="submit" className="button">
              Submit
            </button>
            </div>    
            </form>
          </div>
           <Outlet />
    </div>
    </div>

  );
};

export default BankDetail;
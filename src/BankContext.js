import React, { createContext, useContext, useState } from "react";

const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const [bankDetails, setBankDetails] = useState([]);

  const addBankDetail = (newBankDetail) => {
    setBankDetails([...bankDetails, newBankDetail]);
  };

  return (
    <BankContext.Provider value={{ bankDetails, setBankDetails, addBankDetail }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBankContext = () => useContext(BankContext);

import React, { createContext, useContext, useState } from "react";

const AdmoContext = createContext();

export const AdmoProvider = ({ children }) => {
  const [admobData, setAdmobData] = useState([]);

  const addAdmobData = (data) => {
    setAdmobData([...admobData, data]);
  };

  const deleteAdmobData = (index) => {
    const updatedData = [...admobData];
    updatedData.splice(index, 1);
    setAdmobData(updatedData);
  };

  return (
    <AdmoContext.Provider value={{ admobData, addAdmobData, deleteAdmobData, setAdmobData }}>
      {children}
    </AdmoContext.Provider>
  );
};

export const useAdmobContext = () => {
  return useContext(AdmoContext);
};

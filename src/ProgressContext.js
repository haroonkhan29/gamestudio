import React, { createContext, useContext, useState, useEffect } from "react";
const ProgressContext = createContext();
export const ProgressProvider = ({ children }) => {
  const [progressDetails, setProgressDetails] = useState([]);

  const addProgressDetail = (newProgressDetail) => {
    setProgressDetails((prevProgressDetails) => [...prevProgressDetails, newProgressDetail]);
  };

  return (
    <ProgressContext.Provider value={{ progressDetails,  setProgressDetails, addProgressDetail}}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => useContext(ProgressContext);

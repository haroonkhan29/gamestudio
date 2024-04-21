import React, { createContext, useContext, useState } from "react";

const DownloadContext = createContext();

export const DownloadProvider = ({ children }) => {
  const [downloadData, setDownloadData] = useState([]);

  const addDownload = (newDownload) => {
    setDownloadData([...downloadData, newDownload]);
  };

  const contextValue = { downloadData, setDownloadData, addDownload };

  return (
    <DownloadContext.Provider value={contextValue}>
      {children}
    </DownloadContext.Provider>
  );
};
export const useDownloadContext = () => useContext(DownloadContext);

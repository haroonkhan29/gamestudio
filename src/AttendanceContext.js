import { createContext, useContext, useState } from "react";

const AttendanceContext = createContext();

export const useAttendanceContext = () => {
  return useContext(AttendanceContext);
};

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  const addAttendance = (newAttendance) => {
    setAttendanceData((prevData) => [...prevData, newAttendance]);
  };

  const value = {
    attendanceData,
    addAttendance,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

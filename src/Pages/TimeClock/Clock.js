// import React, { useContext, useState } from "react";
// // import { useAttendance } from "../../AttendanceContext";
// import EmployeeContext from "../../EmployeeContext";
// import "./Clock.css";
// const TimeClock = () => {
//   const { employee } = useContext(EmployeeContext);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   // const { setAttendanceInfo } = useAttendance();
//   const [date, setDate] = useState("");
//   const [timeInMorning, setTimeInMorning] = useState("");
//   const [timeOutMorning, setTimeOutMorning] = useState("");
//   const [totalHours, setTotalHours] = useState(0);
//   const [formVisible, setFormVisible] = useState(false);

//   const getCurrentTime = () => {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, "0");
//     const minutes = now.getMinutes().toString().padStart(2, "0");
//     return `${hours}:${minutes}`;
//   };
//   const calculateTotalHours = () => {
//     if (timeInMorning && timeOutMorning) {
//       const timeIn = new Date(`2000-01-01T${timeInMorning}`);
//       const timeOut = new Date(`2000-01-01T${timeOutMorning}`);
//       const hours = (timeOut - timeIn) / (1000 * 60 * 60);
//       setTotalHours(hours);
//     }
//   };
//  const handleButtonClick = (buttonType) => {
//     setFormVisible(!formVisible);

//     if (selectedEmployee && date) {
//       const attendanceData = {
//         employee: selectedEmployee,
//         date: date,
//       };

//       const currentTime = getCurrentTime(); 

//       if (buttonType === "timeIn") {
//         attendanceData.timeInMorning = currentTime;
//         setTimeInMorning(currentTime);
//         setTimeOutMorning(""); 
//       } else if (buttonType === "timeOut") {
//         attendanceData.timeOutMorning = currentTime;
//         setTimeOutMorning(currentTime);
//       }

//       setAttendanceInfo(attendanceData);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSelectedEmployee(null);
//     setDate("");
//     setTimeInMorning("");
//     setTimeOutMorning("");
//     setFormVisible(false);
//   };

//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//   };

//   const handleTimeChange = (e, timeType) => {
//     const newTime = e.target.value;
//     if (timeType === "timeInMorning") {
//       setTimeInMorning(newTime);
//     } else if (timeType === "timeOutMorning") {
//       setTimeOutMorning(newTime);
//     }
//   };


//   return (
//     <div className="attendance-form-container">
//       <h2>Attendance</h2>

//       {!formVisible && (
//         <button className="show-form-button" onClick={() => handleButtonClick("timeIn")}>
//         Show Form
//         </button>
//       )}

//       {formVisible && (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="employeeSelect">Employee:</label>
//             <select
//               className="employee-select"
//               value={selectedEmployee ? selectedEmployee.fullName : ""}
//               onChange={(e) =>
//                 handleEmployeeSelect(employee.find((emp) => emp.fullName === e.target.value))
//               }
//             >
//               <option value="">Select an employee</option>
//               {employee &&
//                 employee.map((data, index) => (
//                   <option key={index} value={data.fullName}>
//                     {data.fullName}
//                   </option>
//                 ))}
//             </select>
//             <div className="input-divider"></div>

//             <label htmlFor="dateInput">Date:</label>
//             <input
//               type="date"
//               id="dateInput"
//               className="date-input"
//               value={date}
//               onChange={handleDateChange}
//             />
//             <div className="input-divider"></div>

//             <label htmlFor="timeInput">Time:</label>
//           <input
//             type="time"
//             id="timeInput"
//             className="time-input"
//             value={(timeInMorning && !timeOutMorning) ? timeInMorning : timeOutMorning || getCurrentTime()}
//             onChange={(e) => handleTimeChange(e, timeOutMorning ? "timeOutMorning" : "timeInMorning")}
//             />
//             <div className="input-divider"></div>

//             <button className="time-in-button" type="button" onClick={() => handleButtonClick("timeIn")}>
//             <i className="fas fa-clock"></i> Time In
//           </button>
//           <button className="time-out-button" type="button" onClick={() => handleButtonClick("timeOut")}>
//             <i className="fas fa-lock"></i> Time Out
//           </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default TimeClock;

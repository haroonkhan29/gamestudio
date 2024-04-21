import React, { useState } from "react";
import { BrowserRouter as BrowserRouterAlias, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Attendance from "./Pages/Attendance";
import TimeClock from "./Pages/TimeClock/Clock";
import Revenue from "./Pages/Revenue/Revenue";
import Progress from "./Pages/Progress/Progress";
import ProgressView from "./Pages/ProgressView/ProgressView";
import Inventory from "./Pages/Inentory/Inventory";
import InventoryView from "./Pages/Inventoryview/InventoryView";
import AdMobscreen from "./Pages/AdMob/admobscreen";
import Admobview from "./Pages/AdMob/Admobview";
import BankDetail from "./Pages/BankDetail/BankDetail";
import BankView from "./Pages/BankView/BankView";
import DailyAssignment from "./Pages/Downloads/Downloads";
import AssignmentView from "./Pages/DownloadView/DownloadView";
import CompainCost from "./Pages/CompainCost/CompainCost";
import EmployeeRecord from "./Pages/EmployeeRecord";
import PettyCashList from "./Pages/PettyCashList/PettyCashList";
import Login from "./Components/Login/Login";
import Logout from "./Components/Login/Logout";
import EditForm from "./Pages/EditForm/EditForm";
import CustomAlert from "./Components/Login/CustomAlert";
import MyComponent from "./MyComponent";
import { ToastContainer as ToastContainerAlias } from "react-toastify";
import { useAuth } from "./AuthContext";
import ExpenseSheet from "./Pages/ExpenseSheet/ExpenseSheet";
import NextPage from "./Pages/Nextpage/NextPage";
import PettyCashForm from "./Pages/PettyCashForm/PettyCashForm";
import EmployeeContext from "./EmployeeContext";
import admobscreen from "./Pages/AdMob/admobscreen";

const App = () => {
  const { authenticated } = useAuth();
  const [employee, setEmployee] = useState([]); 

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      <div>
        <ToastContainerAlias position="bottom-right" autoClose={3000} />
      </div>
      <div>
        {authenticated ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="timeclock" element={<TimeClock />} />
              <Route path="assignment" element={<DailyAssignment />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="bank-detail" element={<BankDetail />} />
              <Route path="view" element={<BankView />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="expense" element={<ExpenseSheet />} />
              <Route path="pettycash" element={<PettyCashForm />} />
              <Route path="pettylist" element={<PettyCashList />} />
              <Route path="/next-page" element={<NextPage />} />
              <Route path="progress" element={<Progress />} />
              <Route path="progressview" element={<ProgressView />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventoryview" element={<InventoryView />} />
              <Route path="admobscreen" element={<AdMobscreen />} />
              <Route path="admobview" element={<Admobview />} />
              <Route path="assignmentview" element={<AssignmentView />} />
              <Route path="compain-cost" element={<CompainCost />} />
              <Route path="record" element={<EmployeeRecord />} />
              <Route path="edit" element={<EditForm />} />
              <Route path="login" element={<Login />} />
              <Route path="custom" element={<CustomAlert />} />
              <Route path="logout" element={<Logout />} />
              <Route path="mycomponent" element={<MyComponent />} />
            </Route>
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </EmployeeContext.Provider>
  );
};

export default App;

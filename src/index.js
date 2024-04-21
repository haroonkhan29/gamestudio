import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { AttendanceProvider } from "./AttendanceContext";
import { BankProvider } from "./BankContext";
import { AuthProvider } from "./AuthContext";
import { DownloadProvider } from "./DownloadContext";
import { ProgressProvider } from "./ProgressContext";
import {AdmoProvider} from "./Admocontext"
import { EmployeeProvider } from './EmployeeContext';
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <BankProvider>
        <DownloadProvider>
          <ProgressProvider>
            <AdmoProvider>
            <AttendanceProvider>
            <EmployeeProvider>
              <Router>
                <App />
              </Router>
              </EmployeeProvider>

            </AttendanceProvider>
            </AdmoProvider>
          </ProgressProvider>
        </DownloadProvider>
      </BankProvider>
    </AuthProvider>
    <Toaster position="top-right" />
  </React.StrictMode>
);

import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardImage from '../Images/DashboardImage/dashboard.jpeg'; 
import AttendanceImage from '../Images/AttendanceImage/attendance.png'; 
import RevenueImage from '../Images/RevenueImage/revenue.png'; 
import ExpenseImage from '../Images/ExpenseImage/Expense.png'; 
import SheetImage from '../Images/SheetImage/sheetexpense.png'; 
import pettyImage from '../Images/pettyImage/cash.png'; 
import pettycashImage from '../Images/pettycashImage/pettyview.png'; 
import AdmobImage from '../Images/AdmobImage/admob.png'; 
import AdscreenImage from '../Images/AdscreenImage/screen.png'; 
import AppImage from '../Images/AppImage/app.png'; 
import ProgressImage from '../Images/ProgressImage/progress.png'; 
import InventoryImage from '../Images/InventoryImage/inventory.png'; 
import BankviewImage from '../Images/BankviewImage/Bankview.png'; 
import BankImage from '../Images/BankImage/bank.png'; 
import AssignmentviewImage from '../Images/AssignmentviewImage/assignmentview.png'; 
import AssignementImage from '../Images/AssignementImage/assignment.png'; 
import recordImage from '../Images/recordImage/employee.png'; 
import RegisterImage from '../Images/RegisterImage/Register.png'; 
import AmdminImage from '../Images/AdminImage/admin.png'; 
import LogoutImage from '../Images/LogoutImage/logout.png'; 
import { cyan, lightBlue , orange, pink , indigo ,blue, amber, yellow, green ,purple , red} from "@mui/material/colors";

export const ListItemsData = [
  {
    name: "Dashboard",
    link: "/",
    icon: <img src={DashboardImage} alt="Dashboard" style={{ width: 30, height: 30}} />,

  },
  {
    name: "Attendance",
    link: "attendance",
    icon: <img src={AttendanceImage} alt="Attendance" style={{ width: 30, height: 30}} />,
    color: yellow, 
  },
 
  {
    name: "App Revenue",
    link: "revenue",
    icon: <img src={ RevenueImage} alt="Revenue" style={{ width: 30, height: 30 }} />,
    color: green, 

  },
   {
    name: "Expense",
    link: "expenseform",
    icon: <img src={SheetImage} alt="Expense" style={{ width: 30, height: 30 }} />,
    color: yellow,

  },
  {
    name: "Expense View",
    link: "expenseformview",
    icon: <img src={ExpenseImage} alt="Expense" style={{ width: 30, height: 30 }} />,
    color: purple,

  },
  // {
  //   name: "Expense",
  //   link: "expense",
  //   icon: <img src={ExpenseImage} alt="Expense" style={{ width: 30, height: 30 }} />,
  //   color: purple,

  // },
  {
    name: "Petty Cash",
    link: "pettycash",
    icon: <img src={pettyImage} alt="Petty Cash" style={{ width: 30, height: 30}} />,
    // color: green,
  },
  {
    name: "Petty View",
    link: "pettylist",
    icon: <img src={pettycashImage} alt="Petty Cash" style={{ width: 30, height: 30}} />,
    color: lightBlue,
  },
  {
    name: "AdMob Screens",
    link: "admobscreen",
    icon: <img src={AdscreenImage} alt="AdMob Screens" style={{ width: 30, height: 30 }} />,
  },
  { 
    name: "AdMob View",
    link: "admobview",
    icon: <img src={AdmobImage} alt="AdMob View" style={{ width: 30, height: 30 }} />,
    color:  blue,
  },
  // {
  //   name: "Apps Progress",
  //   link: "progress",
  //   icon: <img src={ProgressImage} alt="Apps Progress" style={{ width: 30, height: 30 }} />,
  // },
  {
    name: "Apps Progress",
    link: "progressview",
    icon: <img src={AppImage} alt="Apps - View" style={{ width: 30, height: 30 }} />,
    color: orange,
  },
  // {
  //   name: "Inventory",
  //   link: "inventory",
  //   icon: <img src={AppImage} alt="Apps - View" style={{ width: 30, height: 30 }} />,
  //   color: orange,
  // },
  {
    name: "Inventory View",
    link: "inventoryview",
    icon: <img src={InventoryImage} alt="Apps - View" style={{ width: 30, height: 30 }} />,
    color: yellow,
  },
  
  {
    name: "Bank Account",
    link: "bank-detail",
    icon: <img src={BankImage} alt="Bank Account" style={{ width: 30, height: 30 }} />,
  },
  {
        name: "Bank",
        link: "view",
        icon: <img src={BankviewImage} alt="Bank - View" style={{ width: 30, height: 30 }} />,
        color: cyan, 
      },
  {
    name: "Daily Assignment ",
    link: "assignment",
    icon: <img src={AssignementImage} alt="Daily Assignment" style={{ width: 30, height: 30 }} />,
  },
  {
    name: "Assignment",
    link: "assignmentview",
    icon: <img src={AssignmentviewImage} alt="Assignment View" style={{ width: 30, height: 30 }} />,
    color: green,
  },
  {
    name: "Employee",
    link: "record",
    icon: <img src={recordImage} alt="Employee" style={{ width: 30, height: 30 }} />,
    color:  amber,
  },
 
  {
    name: "Admin",
    link: "registrationForm",
    icon: <img src={AmdminImage} alt="Logout" style={{ width: 30, height: 30 }} />,
    color:  blue,

  },
  {
    name: "Registration",
    link: "data",
    icon: <img src={RegisterImage} alt="Logout" style={{ width: 30, height: 30 }} />,
    color:  blue,

  },
  {
    name: "Logout",
    link: "logout",
    icon: <img src={LogoutImage} alt="Logout" style={{ width: 30, height: 30 }} />,
    color:  red,

  },
];
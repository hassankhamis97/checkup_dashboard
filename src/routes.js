/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Checkup (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Checkup

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import EmployeeProfile from "views/EmployeeProfile/EmployeeProfile.js";
import Typography from "views/TestsResult/TestsResult";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import CreateNewEmployee from "views/CreateNewEmployee/CreateNewEmployee"
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Chat from "views/Chat/Chat"   
import EmployeeProfileView from "views/EmployeeProfile/EmployeeProfileView.js"
const dashboardRoutes = [
  {
    path: "/upcomingrequest",
    name: "Upcoming Request",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  // {
  //   path: "/employeesprofile",
  //   name: "Employees Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  {
    path: "/getEmployeesInfo",
    name: "Get Employees Info",
    rtlName: "قائمة الموظفين",
    icon: "content_paste",
    component: EmployeeProfile,
    layout: "/admin"
  },
  {
    path: "/waitingresults",
    name: "Tests Results",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  {
    path: "/create-new-employee",
    name: "Create New Employee",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: CreateNewEmployee,
    layout: "/admin"
  },
  {
    path: "/chat",
    name: "Chat",
    rtlName: "الرسائل",
    icon: Unarchive,
    component: Chat,
    layout: "/admin"
  }
  // ,
  // {
  //   path: "/EmployeesInfo/employeeprofile",
  //   name: "EmployeeProfile",
  //   rtlName: "الرسائل",
  //   icon: Unarchive,
  //   component: EmployeeProfileView,
  //   layout: "/admin"
  // }
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
  
];

export default dashboardRoutes;

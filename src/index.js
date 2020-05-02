/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import Login from "views/Login/login";
import CheckLogin from "views/Login/CheckLogin";
import EntryPoint from "views/Login/EntryPoint";

// import 'bootstrap/dist/css/bootstrap.min.css';

const hist = createBrowserHistory();
debugger
// window.addEventListener("beforeunload", (ev) => {
//   debugger
//   localStorage.openpages = Date.now();
//   var onLocalStorageEvent = function(e){
//       if(e.key == "openpages"){
//           // Listen if anybody else opening the same page!
//           localStorage.page_available = Date.now();
//           alert("fdsf");
//           window.addEventListener('storage', onLocalStorageEvent, false);
//   return ev.returnValue = 'Are you sure you want to close?';
//       }
//       if(e.key == "page_available"){
//           alert("One more page already open");
//       }
//   };
//   ev.preventDefault();
  
// });
ReactDOM.render(
  // <Login></Login>,
  <EntryPoint></EntryPoint>,
  // <CheckLogin></CheckLogin>,
  // <Router history={hist}>
  //   <Switch>
  //     <Route path="/admin" component={Admin} />
  //     <Route path="/rtl" component={RTL} />
  //     <Redirect from="/" to="/admin/dashboard" />
  //   </Switch>
  // </Router>,
  document.getElementById("root")
);

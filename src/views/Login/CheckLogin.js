import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Authentication from '../../Authentication'
import database from '../../firebase';
import LoginClass from './LoginClass'
import Login from "./login";

import firebase from 'firebase';
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
// import authen from ''
export default class CheckLogin extends React.Component {
    constructor(){
        debugger
super()
        let authentication = new Authentication();
        authentication.getUser(() => {
            // alert('hello');
            this.forceUpdate()
        });
    }
    //    authentication.getUser(()=> {
    //        alert('hello');
    //        setTC(tc => ++tc)
    //     });
    // const classes = useStyles();
    render() {
        let hist = createBrowserHistory();

        return (
            // <span>dfs</span>
            <div>
                {
                    Authentication.loggedUser === "wait" ? '' : Authentication.loggedUser == null ?
                    <Login></Login> : 
                    <Router history={hist}>
                        <Switch>
                            <Route path="/admin" component={Admin} />
                            <Route path="/rtl" component={RTL} />
                            <Redirect from="/" to="/admin/dashboard" />
                        </Switch>
                    </Router>
                }
                {/* {Authentication.loggedUser != null ?
                    <Router history={hist}>
                        <Switch>
                            <Route path="/admin" component={Admin} />
                            <Route path="/rtl" component={RTL} />
                            <Redirect from="/" to="/admin/dashboard" />
                        </Switch>
                    </Router> : Authentication.loggedUser === "wait" ?
                     '': <Login></Login>
                } */}
            </div>
        );
    }
}
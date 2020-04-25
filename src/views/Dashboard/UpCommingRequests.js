import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components


import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import firebase from 'firebase';
import 'firebase/database';
import config from '../../config';
import avatar from "assets/img/faces/marc.jpg";
import PropTypes from "prop-types";
// react plugin for creating charts

import ChartistGraph from "react-chartist";
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";

import CardIcon from "components/Card/CardIcon.js";


import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);


const propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func
};



class UpCommingRequests extends React.Component{
  //  const classes = useStyles();
    constructor(props){
        debugger;
        super(props);
      
        // firebase.initializeApp(config);
       
        this.state = {
          Requests: [
            [ "Mohamed", "22/4/2020" , "10:30","Yes", <Button onClick={this.handleSubmit} color="primary">Update Profile</Button>
          ] ,
            [ "Ahmed", "22/4/2020" , "9:30","No", <Button onClick={this.handleSubmit} color="primary">Update Profile</Button> ] ,
          ]
        }
        //this.arr = this.state.Employee
        //  this.database = firebase.database().ref('/').child('');
   

    }
    
    
    componentDidMount() {
        debugger
      //  this.getUserData();
    }

    componentDidUpdate(prevProps, prevState) {
    
        if (prevState != this.state) {
            // this.writeUserData();
        }
    }
    
    writeUserData = () => {
        // firebase.database().ref('/').set(this.state);
        console.log('DATA SAVED');
    }

    getUserData = () => {
        debugger;
        let ref = firebase.database().ref('/');
        let child = 
        ref.on('value', snapshot => {
            debugger
            var state  = snapshot.val();
            console.log(state )
            this.setState(state );
        });
        console.log('DATA RETRIEVED');
    }


    handleSubmit = (event) => {
        debugger
        // var employeeObj = {
        //     name: 'a',
        //     address: 's'
        // }
        const { Requests } = this.state;
        // Requests.push(employeeObj);
        this.setState({Requests});
       
      }
     
    
      render(){
          debugger;
     
                // const classes = useStyles();
        return (
            
            <GridContainer>

 <GridItem xs={12} sm={12} md={6}>
   <Card>
     <CardHeader color="warning">
       <h4>Employees Stats</h4>
       <p>
         Up Comminng Patiant requests 
       </p>
     </CardHeader>
     <CardBody>
       <Table
         tableHeaderColor="warning"
         tableHead={["Patient Name", "Date", "Time","FromHome","Action"]}
         tableData={this.state.Requests}
       
       />
     </CardBody>
   </Card>
 </GridItem>
</GridContainer>

        );
      }
}


export default UpCommingRequests;
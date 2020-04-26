import React from "react";


import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";


// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";

import firebase from 'firebase';
// import 'firebase/database';
import database from '../../firebase';
// import storage from '../../firebase';


// @material-ui/core components


import InputLabel from "@material-ui/core/InputLabel";
// core components


import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import firebase from 'firebase';
// import 'firebase/database';
// import config from '../../config';
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

import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";

import CardIcon from "components/Card/CardIcon.js";


import { bugs, website, server } from "variables/general.js";
import { idText } from "typescript";


// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.js";


// const useStyles = makeStyles(styles);


// const propTypes = {
//   state: PropTypes.string,
//   onChange: PropTypes.func
// };

import ConfirmationDialoge from './ConfirmationDialoge' ;

class UpCommingRequests extends React.Component {

  //  const classes = useStyles();
  constructor(props) {
    debugger;
    super(props);


    this.state = {
      dataShowList: [],
      requests: [],
      tableBodyData: '',
      sampleStatus: 'Pending'
    }




  }


  componentDidMount() {
    debugger
    this.getResquests();
  }

  componentDidUpdate(prevProps, prevState) {
    this.writeUserData();
    if (prevState != this.state) {
      // this.writeUserData();
    }
  }

  writeUserData = () => {

    console.log('DATA SAVED');
  }


  ///****************   Changing Sample status ********************/
  debugger;

  handleStatus(itemId) {
    debugger;
   

 //  change status of SampleObject to Done leave it in the same table
 // in the result pages get all  tests which have status == Done only
    console.log(itemId)
    var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
    ref.child(itemId).update({'status': 'Done'}) 


    this.setState({ sampleStatus: 'DONE' })
   

    this.forceUpdate()
  }



  getResquests = () => {
    debugger;
    let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');

 


    ref.orderByChild("status").equalTo("Pending").on('value', snapshot => {
      debugger

      /*var data  = snapshot.val();
      console.log(data )
      this.state.requests = data*/
      //this.setState({requests: data });

      snapshot.forEach(function (item) {
        debugger
        var obj = item.val();
        console.log(obj)
        //keys.push(itemVal);
        this.setState({ sampleStatus: obj.status });
        var reqObj = [obj.testName, obj.date, obj.time, obj.isFromHome, <Button key={obj.id} onClick={() => this.handleStatus(obj.id)} color="primary" >{this.state.sampleStatus}</Button>
        ]
        console.log(reqObj)

        this.state.dataShowList.push(reqObj)
        //this.state.tableBodyData = 

      }.bind(this));
      this.forceUpdate()
      // data.map((obj,index)=>{
      //    var reqObj = [obj[index].testName,obj[index].date,obj[index].time,obj[index].isFromHome]
      //    this.state.dataShowList.push(reqObj)
      //    //this.state.tableBodyData = 
      //    this.forceUpdate()
      // })
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
    this.setState({ Requests });

  }


  render() {
    debugger;

    return (

      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4>Employees Stats</h4>
              <p>
                Up Comminng Patient requests
       </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Patient Name", "Date", "Time", "FromHome", "Sample Staus"]}
                tableData={this.state.dataShowList.length == 0 ? [["Patient Name", "Date", "Time", "FromHome", "Sample Staus"]] : this.state.dataShowList}
              //tableData={ [["Patient Name", "Date", "Time","FromHome","Action"]]}
              />
            </CardBody>
          </Card>
        </GridItem>

  

      </GridContainer>

    );
  }
}


export default UpCommingRequests;
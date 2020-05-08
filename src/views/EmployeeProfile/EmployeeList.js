import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import { database } from '../../firebase';
import firebase from 'firebase';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { useHistory } from "react-router-dom";
// import database from '../../firebase';

import EmployeeProfileView from './EmployeeProfileView'

import AlertDialogSlide from "../AlertDialoge/AlertDialogSlide";
import TestReview from '../Modals/TestReview'
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
// const history = useHistory();
// const useStyles = makeStyles(styles);
// const classes = useStyles();

export default class EmployeeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataShowList: [],
      employeeList: [],
      showEmployeeList: [],
      senderEmpObj: null,
      alertConfig: {
        open: false,
        message: '',
        status: ''
      }
    }
    // this.getEmployeeList = this.getEmployeeList.bind(this)


  }



  componentDidMount() {
    // 
    this.getEmployeeList(this);

  }
  // handleViewProfile = (element) =>{
  //   
  //   //  var obj = this.state.employeeList[index]
  //    this.setState({senderEmpObj: element});     
  //   this.props.handleViewProfile(element)

  //   //  this.context.router.push('/my-route')
  // }

  getEmployeeList = (self) => {

    
    database.ref('/').child('Employees').child("0G9djW7SzMXGTiXKdGkiYuiTY3g1").on('value', function (employeesArr) {

      // }
      // ref.on('value', snapshot => {
      // this.state.dataShowList = []
      // employeesArr.forEach(function (item) {
      // self.state.employeeList = employeesArr.val()
      var count = 0
      self.state.employeeList = []
      self.state.showEmployeeList = []
      employeesArr.forEach((element) => {
        count++
        var phoneStr = ''
        self.state.employeeList.push(element)
        element.val().phones.forEach((phone, i) => {
          phoneStr += i == 0 ? phone : "-" + phone
        })
        
      
        var showEmployeeObj = [
          count,
          element.val().userName,
          element.val().email,
          phoneStr,
          // <Button key={element.val().email} onClick={() => self.setState({senderEmpObj: element})} color="primary" >View Profile</Button>
          <Button key={element.val().email} onClick={() => self.props.handleViewProfile(element,phoneStr)} color="primary" >View Profile</Button>
          // element.value.
        ]
        self.state.showEmployeeList.push(showEmployeeObj)
      });

      self.forceUpdate()
      // });

    });
  }
  render() {
    let hist = createBrowserHistory();
    return (

      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 > Our Employee </h4>
            <p >
              All Employee In  This Branch
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHeaderColor="primary"
              tableHead={["#", "Name","Email", "Phone Numbers"]}
              tableData={this.state.showEmployeeList}
            />
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

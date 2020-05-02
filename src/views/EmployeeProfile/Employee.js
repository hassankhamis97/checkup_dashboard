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

import firebase from 'firebase';

import database from '../../firebase';



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

// const useStyles = makeStyles(styles);
// const classes = useStyles();

export default class Employee  extends React.Component{

    constructor(props) {

        // debugger;
        super(props);
       
        this.state = {
          dataShowList: []
    
        }
    
    
      }



      componentDidMount() {
        // debugger
        this.getEmployeeList();
      }


    
  debugger;

  getEmployeeList = () => {

    debugger;
    let ref = firebase.database().ref('/').child('Employees').child("0G9djW7SzMXGTiXKdGkiYuiTY3g1");

    ref.on('value', snapshot => {
      this.state.dataShowList = []

      snapshot.forEach(function (item) {
        debugger;
        var obj = item.val();
        console.log(obj)
        let user;
      

            this.state.sampleStatus = obj.status === "PendingForLabConfirmation" ? "View Request" : "";

            debugger
            var reqObj = [obj.id, user.name, obj.date, obj.time, obj.isFromHome, obj.testName,

            obj.status, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
            ]


            var fullObj = [user.name, obj.date, obj.time, obj.isFromHome, obj.testName,

            obj.status, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
              , obj.id, user.dateOfBirth, user.gender, user.phone
            ]
            // this.state.transferedObj.testName = 

            var unique =   window.$name.state.dataShowList.filter((v, i, a) => a[i][0]  === reqObj[0])
            if ( unique.length==0) {     
                   window.$name.state.dataShowList.push(reqObj)
          }  
              

            this.state.fullDataList.push(fullObj);
            console.log(reqObj)

            this.forceUpdate()
          });
 
    });
  }
    render() {
        debugger;
    
        return (
          <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
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
              tableHead={["ID", "Patient Name", "Date"]}
                tableData={[
                  ["1", "Mohamed", "22/4/2020"],
                  ["1", "Mohamed", "22/4/2020"],
                  ["1", "Mohamed", "22/4/2020"],
                  ["1", "Mohamed", "22/4/2020"],
                  ["1", "Mohamed", "22/4/2020"],
                ]}
            />
          </CardBody>
        </Card>
      </GridItem>
   
    </GridContainer>
    </div>
  );}
}

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import firebase from 'firebase';

// import 'firebase/database';
import { database, firestore } from '../../firebase';
// import storage from '../../firebase';
import avatar from "assets/img/noProfilePhoto.png";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from "prop-types";
import Authentication from "Authentication";
import { AppString } from '../Chat/Const'
import classes from '../../assets/jss/material-dashboard-react/dropdownStyle'
import { render } from "react-dom";
import ConfirmMessage from "views/Modals/ConfirmMessage";
// const styles = {
//     cardCategoryWhite: {
//       "&,& a,& a:hover,& a:focus": {
//         color: "rgba(255,255,255,.62)",
//         margin: "0",
//         fontSize: "14px",
//         marginTop: "0",
//         marginBottom: "0"
//       },
//       "& a,& a:hover,& a:focus": {
//         color: "#FFFFFF"
//       }
//     },
//     cardTitleWhite: {
//       color: "#FFFFFF",
//       marginTop: "0px",
//       minHeight: "auto",
//       fontWeight: "300",
//       fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//       marginBottom: "3px",
//       textDecoration: "none",
//       "& small": {
//         color: "#777",
//         fontSize: "65%",
//         fontWeight: "400",
//         lineHeight: "1"
//       }
//     }
//   };
export default class EmployeeProfileView extends React.Component {
  constructor() {
    super()
    this.state = {
      alertConfig: {
        open: false,
        message: '',
        status: ''
      }
    }
    
  }
  componentDidMount() {

    
    this.props.handleSetEmployeeProfileViewReference(this)
    //this.getUserData();

}
  updateEmployee = () => {
    this.props.updateEmployee(true);
  }
  deleteEmployee = () => {
    
    
    this.state.alertConfig.open = true
      this.state.alertConfig.message = 'Are You sure delete this employee ?'
      this.state.alertConfig.status = 'deleteEmployee'
      this.props.updateAlertConfig(this.state.alertConfig)

    }
  resetPassword = () => {
    this.state.alertConfig.open = true

    this.state.alertConfig.message = 'Are You sure reset password for this employee ?'

    this.state.alertConfig.status = 'resetPassword'
    this.props.updateAlertConfig(this.state.alertConfig)
  }
  handleConfirm = (status) => {
    let self = this
    if (status === 'deleteEmployee'){
    function getFirebaseApp(name, config) {

      let foundApp = firebase.apps.find(app => app.name === name);
      return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
    }

    let authWorkerApp = getFirebaseApp('auth-worker');

    // let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
    let authWorkerAuth = firebase.auth(authWorkerApp);
    authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    authWorkerAuth.signInWithEmailAndPassword(this.props.senderEmpObj.val().email, this.props.senderEmpObj.val().password)
      .then(function (user) {
        
        var currentUser = authWorkerAuth.currentUser;
        database.ref('/').child("Employees").child("0G9djW7SzMXGTiXKdGkiYuiTY3g1").child(currentUser.uid).remove()
        firestore.collection(AppString.NODE_USERS).doc(currentUser.uid).delete()
        currentUser.delete().then(function () {
          console.log("deleted Success");

        }).catch(function (error) {
          console.log("deleted failed");
        });
        console.log(user)
      })
      .catch(function (error) {

      });
    }
    else{
      function getFirebaseApp(name, config) {

        let foundApp = firebase.apps.find(app => app.name === name);
        return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
      }
  
      let authWorkerApp = getFirebaseApp('auth-worker');
  
      // let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
      let authWorkerAuth = firebase.auth(authWorkerApp);
      authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      authWorkerAuth.sendPasswordResetEmail(this.props.senderEmpObj.val().email)
        .then(function () {
          alert('checkmail')
        })
        .catch(function (error) {
          alert(error)
          // Error occurred. Inspect error.code.
        });
    }
    this.state.alertConfig.open = false
      this.state.alertConfig.message = ''
      this.state.alertConfig.status = ''
      this.props.updateAlertConfig(this.state.alertConfig)

  }
  render() {
    
    return (
      // <div>dfksdfol</div>
      <GridItem xs={12} sm={12} md={4}>
        <Card profile>
          <CardAvatar profile>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              <img src={this.props.senderEmpObj.val().imagePath} alt="..." />
            </a>
          </CardAvatar>
          <CardBody profile>
            <h6 className={classes.cardCategory}>{this.props.senderEmpObj.val().userName}</h6>
            <h4 className={classes.cardTitle}>{this.props.senderEmpObj.val().email}</h4>
            <p className={classes.description}>
              {this.props.phoneStr}
            </p>
            <Button color="primary" round onClick={this.deleteEmployee.bind(this)}>
              Delete Employee
            </Button>
            <Button color="primary" round onClick={this.resetPassword.bind(this)}>
              Reset Password
            </Button>
            <Button color="primary" round onClick={this.updateEmployee.bind(this)}>
              Update Employee
            </Button>
          </CardBody>
        </Card>
      </GridItem>

    );
  }
}

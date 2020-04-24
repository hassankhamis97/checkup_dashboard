import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
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

const defaultProps = {
  state: "",
  onChange: () => {} // no need
};

const propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func
};

// const styles = {
//     cardCategoryWhite: {
//         color: "rgba(255,255,255,.62)",
//         margin: "0",
//         fontSize: "14px",
//         marginTop: "0",
//         marginBottom: "0"
//     },
//     cardTitleWhite: {
//         color: "#FFFFFF",
//         marginTop: "0px",
//         minHeight: "auto",
//         fontWeight: "300",
//         fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//         marginBottom: "3px",
//         textDecoration: "none"
//     }
// };

// const useStyles = makeStyles(styles);

class CreateEmployeeDesign extends React.Component{
    
    constructor(props){
        debugger;
        super(props);
        // var firebaseConfig = {
        //     apiKey: "AIzaSyDRGCeI7Um-ZgtDBwx8J9Z5Lf_v-4-nCY0",
        //     authDomain: "checkup-23ffe.firebaseapp.com",
        //     databaseURL: "https://checkup-23ffe.firebaseio.com",
        //     projectId: "checkup-23ffe",
        //     storageBucket: "checkup-23ffe.appspot.com",
        //     messagingSenderId: "734287541282",
        //     appId: "1:734287541282:web:921014a84dca664176867b",
        //     measurementId: "G-XZF8FBBK4Y"
        // }
        // super();
        // firebase.initializeApp(config);
        // // firebase.initializeApp(firebaseConfig);
        // // firebase.initializeApp(DB_CONFIG);
        // this.database = firebase.database().ref().child('tickets');
        firebase.initializeApp(config);
        // firebase.initializeApp(firebaseConfig);
        // firebase.initializeApp(DB_CONFIG);
        this.state = {
            // Employee: {
            //     name: '',
            //     address: ''
    
            // }
            value:'fsdgds',
            Employee: []
        }
        // this.database = firebase.database().ref().child(this.state);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    
    
    componentDidMount() {
        debugger

        this.getUserData();
    }
    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state

        if (prevState !== this.state) {
            this.writeUserData();
        }

    }
    
    writeUserData = () => {
        firebase.database().ref('/').set(this.state);
        console.log('DATA SAVED');
    }

    getUserData = () => {
        debugger;
        let ref = firebase.database().ref('/');
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
        var employeeObj = {
            name: 'a',
            address: 's'
        }
        const { Employee } = this.state;
        Employee.push(employeeObj);
        this.setState({Employee});
        // let name = this.refs.name.value;
        // let role = this.refs.role.value;
        // let uid = this.refs.uid.value;
      
        // if (uid && name && role){
        //   const { developers } = this.state;
        //   const devIndex = developers.findIndex(data => {
        //     return data.uid === uid 
        //   });
        //   developers[devIndex].name = name;
        //   developers[devIndex].role = role;
        //   this.setState({ developers });
        // }
        // else if (name && role ) {
        //   const uid = new Date().getTime().toString();
        //   const { developers } = this.state;
        //   developers.push({ uid, name, role })
        //   this.setState({ developers });
        // }
      
        // this.refs.name.value = '';
        // this.refs.role.value = '';
        // this.refs.uid.value = '';
      }
      handleUpdate = (event) =>{
          debugger
        //   this.state.Employee[0].name = 'fsdjfkjk';
          const { Employee } = this.state;
            // for (let i = 0; i < Employee.length; i++) {
                
                
            // }
            Employee[3].address = 'azab'
          this.setState({Employee});
      }
      handleSubmit(event) {
        event.preventDefault();
        prompt('sas')
        console.log("state: " + this.state.value); //shows onChanged value in console
      }
      handleDelete = (event) =>{
        debugger
        const { Employee } = this.state;
        Employee.pop();
        this.setState({Employee});
        // this.state.Employee[0].name = 'fsdjfkjk';
    }
    handleChangeEmail = (event) =>{
        debugger
        prompt('dsaf');
    }
      render(){
          debugger;
        
        // const classes = useStyles();
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4>Edit Profile</h4>
                                <p>Complete your profile</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
    
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                        onChange={this.handleChangeEmail}
                                            labelText="Username"
                                            id="username"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            value={this.state.value}
                                            onChange={e=> {
                                                debugger;
                                                prompt('dsd')
                                                this.setState({value:e.target.value})
                                            }}
                                            labelText="Email address"
                                            id="state"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                        onChange={this.handleChangeEmail}
                                            labelText="Email address"
                                            id="email-address"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={this.handleSubmit} color="primary">Update Profile</Button>
                                <Button onClick={this.handleUpdate} color="primary">Update Profile</Button>
                                <Button onClick={this.handleDelete} color="primary">Update Profile</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
    
                </GridContainer>
                </form>
            </div>
        );
      }
}
CreateEmployeeDesign.propTypes = propTypes;
CreateEmployeeDesign.defaultProps = defaultProps;

export default CreateEmployeeDesign;
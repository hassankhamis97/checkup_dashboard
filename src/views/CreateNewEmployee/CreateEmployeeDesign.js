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
// import 'firebase/database';
import database from '../../firebase';
// import storage from '../../firebase';
import avatar from "assets/img/noProfilePhoto.png";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhoneNumber from './PhoneNumber'
import PropTypes from "prop-types";
// import firebase from 'firebase';
// const defaultProps = {
//   state: "",
//   onChange: () => {} // no need
// };

// const propTypes = {
//   state: PropTypes.string,
//   onChange: PropTypes.func
// };
// import createEmpoStyle from './CreateNewEmployeeStyle.css'

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

class CreateEmployeeDesign extends React.Component {

    constructor(props) {
        debugger;
        super(props);
        
        // firebase.initializeApp(config);
        var uploadedFile = null;
        this.state = {
            // Employee: {
            //     name: '',
            //     address: ''

            // }
            phonesDiv: [
                            ],
            image: avatar,
            // Employee: []
            Employee: {
                userName: '',
                email: '',
                password: '',
                imagePath: '',
                phones: ['']
            }

        }
        // this.database = firebase.database().ref().child(this.state);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // console.log(createEmpoStyle);
    }


    componentDidMount() {
        debugger

        //this.getUserData();

    }
    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state

        // if (prevState.Employee !== this.state.Employee) {
        //     this.writeUserData();
        // }

    }
    showNotification = () => {
        this.setTL(true);
              setTimeout(function() {
                this.setTL(false);
              }, 6000);
      };
    writeUserData = (userId) => {
        // firebase.database().ref('/').set(this.state);
        // var newPostKey = database.ref().push().key;
        database.ref('/').child('Employees').child(userId).set(this.state.Employee);
        console.log('DATA SAVED');
    }

    getUserData = () => {
        debugger;
        let ref = database.ref('/');
        // let ref = firebase.database().ref('/');
        ref.on('value', snapshot => {
            debugger
            var state = snapshot.val();
            console.log(state)
            this.setState(state);
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
        this.setState({ Employee });

    }
    handleUpdate = (event) => {
        debugger
        //   this.state.Employee[0].name = 'fsdjfkjk';
        const { Employee } = this.state;
        // for (let i = 0; i < Employee.length; i++) {


        // }
        Employee[3].address = 'azab'
        this.setState({ Employee });
    }
    handleSubmit(event) {
        event.preventDefault();
        prompt('sas')
        console.log("state: " + this.state.value); //shows onChanged value in console
    }
    handleDelete = (event) => {
        debugger
        const { Employee } = this.state;
        Employee.pop();
        this.setState({ Employee });
        // this.state.Employee[0].name = 'fsdjfkjk';
    }
    handleChangeEmail = (event) => {
        debugger
        prompt('dsaf');
    }
    changeText = (index,newValue) =>{
        debugger
        this.state.Employee.phones[index] = newValue;
        this.forceUpdate();
    }
    onImageChange = (event) => {
        debugger
        if (event.target.files && event.target.files[0]) {
            this.uploadedFile = event.target.files[0]
            // this.setState({
            //     Employee: {
            //         ...this.state.Employee,
            //         imagePath: '/images/' + event.target.files[0].name
            //     }
            // })
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });

            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    handleAddNewPhone = () => {
        // this.showNotification()
        this.state.Employee.phones.push('');
        this.forceUpdate()
    }
    deletePhone = (index) =>{
        this.state.Employee.phones.splice(index,1);
        this.forceUpdate()
    }
    handleCreateNewEmployee = () => {
        // for (let i = 0; i < 10; i++) {
        //     var newPostKey = database.ref().push().key;

        //     var testObj = {
        //         id: newPostKey,
        //         testName: "Test" + i,
        //         pdfpath: '',
        //         roushettaPath: '',
        //         description: 'description' + i,
        //         isFromHome: i % 2 == 0 ? true : false,
        //         status: 'PendingLabForConfiramtion'

        //     }
        //     database.ref('/').child('Tests').child("0G9djW7SzMXGTiXKdGkiYuiTY3g1").child(newPostKey).set(testObj);

        // }
        
          debugger
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(this.state.Employee.email, this.state.Employee.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
          auth.onAuthStateChanged(firebaseUser => {
              if(firebaseUser)
              {
                let userId= firebaseUser.uid;
                this.setState({
                    Employee: {
                        ...this.state.Employee,
                        imagePath: '/images/' + userId + this.uploadedFile.name
                    }
                })
                for (let i = 0; i < this.state.Employee.phones.length; i++) {
                    // const element = this.state.Employee.phones[i];
                    if(this.state.Employee.phones[i].trim() == ''){
                        this.state.Employee.phones.splice(i,1)
                    }
                    
                }
                this.writeUserData(userId);

                var storageRef = firebase.storage().ref('/images/' + userId + '/');
                
                // var metadata = {
                //     contentType: 'image/jpeg',
                //   };

                    // Upload the file and metadata
                var uploadTask = storageRef.child(this.uploadedFile.name).put(this.uploadedFile);
                console.log(firebaseUser)
                this.props.showNotification("Employee saved successfully")
                // this.state.image = avatar,
                // this.setState({
                //     Employee: {
                //         ...this.state.Employee,
                //         userName: '',
                // email: '',
                // password: '',
                // imagePath: '',
                // phones: ['']
                //     }
                // })
                
              }
          })
    }
    render() {
        debugger;
        const createEmpoStyle = {
            inputImage: {
                display: 'none'
            },
            imgIcon: {
                marginTop: "-38px",

                position: "absolute",
                marginLeft: "78px"
            },


        };

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
                                <CardAvatar profile>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={this.state.image} alt="..." />
                                    </a>
                                    <div style={createEmpoStyle.imgIcon} >
                                        <input onChange={this.onImageChange} style={createEmpoStyle.inputImage} accept="image/*" id="icon-button-file" type="file" />
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>
                                </CardAvatar>

                                <CardBody>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                type="text"
                                                value={this.state.Employee.userName}
                                                onChange={e => {
                                                    this.setState({
                                                        Employee: {
                                                            ...this.state.Employee,
                                                            userName: e.target.value
                                                        }
                                                    })
                                                }}
                                                labelText="Username"
                                                id="username"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                type="email"
                                                value={this.state.Employee.email}
                                                onChange={e => {
                                                    this.setState({
                                                        Employee: {
                                                            ...this.state.Employee,
                                                            email: e.target.value
                                                        }
                                                    })
                                                }}
                                                labelText="Email address"
                                                id="email-address"

                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                type="password"
                                                value={this.state.Employee.password}
                                                onChange={e => {
                                                    this.setState({
                                                        Employee: {
                                                            ...this.state.Employee,
                                                            password: e.target.value
                                                        }
                                                    })
                                                }}
                                                labelText="Password"
                                                id="email-address"
                                                 formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        
                                        {this.state.Employee.phones.map((textValue,index)=> (
                                            
                                            <PhoneNumber key={index} index={index} count={this.state.Employee.phones.length} textValue={textValue} deletePhone={this.deletePhone} changeText={this.changeText}></PhoneNumber>
                                        ))}
                                        
                                        <GridItem xs={12} sm={12} md={12}>
                                        <Button onClick={this.handleAddNewPhone.bind(this)} color="primary">Add Phone</Button> 
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={this.handleCreateNewEmployee.bind(this)} color="primary">Update Profile</Button>
                                    {/* <Button onClick={this.handleUpdate} color="primary">Update Profile</Button>
                                    <Button onClick={this.handleDelete} color="primary">Update Profile</Button> */}
                                </CardFooter>
                            </Card>
                        </GridItem>

                    </GridContainer>
                </form>
            </div>
        );
    }
}
// CreateEmployeeDesign.propTypes = propTypes;
// CreateEmployeeDesign.defaultProps = defaultProps;

export default CreateEmployeeDesign;
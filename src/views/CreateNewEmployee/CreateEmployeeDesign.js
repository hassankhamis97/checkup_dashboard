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
import { database, firestore } from '../../firebase';
// import storage from '../../firebase';
import avatar from "assets/img/noProfilePhoto.png";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhoneNumber from './PhoneNumber'
import PropTypes from "prop-types";
import Authentication from "Authentication";
import { AppString } from '../Chat/Const'
// import * as admin from 'firebase-admin';
// var serviceAccount = require("../../../checkup-23ffe-firebase-adminsdk-7pwms-f7d9cf5cfa.json");

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
        super(props);
        this.saveOrUpdateData = this.saveOrUpdateData.bind(this)
        var uploadedFile = null;
        this.state = {
            phonesDiv: [],
            image: "https://firebasestorage.googleapis.com/v0/b/checkup-23ffe.appspot.com/o/images%2Fdefault%2FnoProfilePhoto.png?alt=media&token=f9e5091b-8364-4953-98cf-b3f2d9829616",
            Employee: {
                userName: '',
                email: '',
                password: '',
                imagePath: 'https://firebasestorage.googleapis.com/v0/b/checkup-23ffe.appspot.com/o/images%2Fdefault%2FnoProfilePhoto.png?alt=media&token=f9e5091b-8364-4953-98cf-b3f2d9829616',
                phones: ['']
            }

        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.saveAfterUploadImage = this.saveAfterUploadImage.bind(this)
        if (this.props.senderEmpObj) {
            this.state.Employee = this.props.senderEmpObj.val()
            this.state.image = this.props.senderEmpObj.val().imagePath
        }



        // var test = {
        //     date: '2/5/2020',
        //     id: '-X5j2KVIhI0dhLchYrTe',
        //     isFromHome: false,
        //     resultFilespaths: [],
        //     roushettaPath: [],
        //     status: 'PendingForLabConfirmation',
        //     testName: 'test13',
        //     time: '1:58PM',
        //     userId: '-M5t-vpf8Hlb4O4hHbXe',
        //     description: '',
        //     hba1c: ''
        // }
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child('-X5j2KVIhI0dhLchYrTe').set(test)
    }


    componentDidMount() {


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
        setTimeout(function () {
            this.setTL(false);
        }, 6000);
    };
    writeUserData = (userId) => {
        // firebase.database().ref('/').set(this.state);
        // var newPostKey = database.ref().push().key;
        
        database.ref('/').child('Employees').child(Authentication.loggedUser.uid).child(userId).set(this.state.Employee);
        console.log('DATA SAVED');
    }

    getUserData = () => {
        ;
        let ref = database.ref('/');
        // let ref = firebase.database().ref('/');
        ref.on('value', snapshot => {

            var state = snapshot.val();
            console.log(state)
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    }
    handleSubmit = (event) => {

        var employeeObj = {
            name: 'a',
            address: 's'
        }
        const { Employee } = this.state;
        Employee.push(employeeObj);
        this.setState({ Employee });

    }
    handleUpdate = (event) => {

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

        const { Employee } = this.state;
        Employee.pop();
        this.setState({ Employee });
        // this.state.Employee[0].name = 'fsdjfkjk';
    }
    handleChangeEmail = (event) => {

        prompt('dsaf');
    }
    changeText = (index, newValue) => {

        this.state.Employee.phones[index] = newValue;
        this.forceUpdate();
    }
    onImageChange = (event) => {

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
    deletePhone = (index) => {
        this.state.Employee.phones.splice(index, 1);
        this.forceUpdate()
    }
    handleSendNewRequest = async (self) => {

        var chatStatus = {
            lastMsgTimeStamp: 0,
            noOfUnReadMessage: 0
        }

        // firestore
        //     .collection(AppString.NODE_USERCHAT)
        //     .doc(Authentication.loggedUser.uid)
        //     .collection(Authentication.loggedUser.uid)
        //     .doc("IaTcOwrdXhVBa7qx40FOkW5b94J3")
        //     .set(chatStatus)
        //     .then(() => {
        //         //this.setState({ inputValue: '' })
        //     })
        //     .catch(err => {
        //         self.props.showToast(0, err.toString())
        //     })
        // firestore
        //     .collection(AppString.NODE_USERCHAT)
        //     .doc("IaTcOwrdXhVBa7qx40FOkW5b94J3")
        //     .collection("IaTcOwrdXhVBa7qx40FOkW5b94J3")
        //     .doc(Authentication.loggedUser.uid)
        //     .set(chatStatus)
        //     .then(() => {
        //         //this.setState({ inputValue: '' })
        //     })
        //     .catch(err => {
        //         self.props.showToast(0, err.toString())
        //     })
    }
    // handleSendNewRequest = () => {
    //     const result = await firestore.collection(AppString.NODE_USERCHAT).orderBy('nickname').startAfter(self.listUser.length > 0 ? self.listUser[self.listUser.length-1] : 0).limit(2).get()
    //     if (result.docs.length > 0) {
    //         self.skip += result.docs.length
    //         // self.listUser = [...result.docs]
    //         self.listUser.push(...result.docs)
    //         self.setState({isLoading: false})
    //     }
    // }
    handleCreateNewEmployee = () => {
        
        let self = this
        function getFirebaseApp(name, config) {
            const auth = firebase.auth();

            let foundApp = firebase.apps.find(app => app.name === name);
            return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
        }

        let authWorkerApp = getFirebaseApp('auth-worker');

        // let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
        let authWorkerAuth = firebase.auth(authWorkerApp);
        authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials
        if (this.props.senderEmpObj) {
            authWorkerAuth.signInWithEmailAndPassword(this.props.senderEmpObj.val().email, this.props.senderEmpObj.val().password)
                .then(function (user) {
                    
                    self.saveOrUpdateData(user)

                })
                .catch(function (error) {

                });
        }
        else {
            authWorkerAuth.createUserWithEmailAndPassword(this.state.Employee.email, this.state.Employee.password)
                .then(function (userCreds) {

                    self.saveOrUpdateData(userCreds)

                }.bind(this))
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
        }
    }
    saveOrUpdateData = (userCreds) => {
        
        var userId = userCreds.user.uid;
        if (this.uploadedFile) {
            this.state.Employee.imagePath = '/images/' + userId + '/' + this.uploadedFile.name
        }
        for (let i = 0; i < this.state.Employee.phones.length; i++) {
            if (this.state.Employee.phones[i].trim() == '') {
                this.state.Employee.phones.splice(i, 1)
            }
        }
        if (this.uploadedFile) {
            var storageRef = firebase.storage().ref('/images/' + userId + '/');
            var uploadTask = storageRef.child(this.uploadedFile.name).put(this.uploadedFile).then(() => {
                let authentication = new Authentication()
                authentication.getImage(this, this.state.Employee.imagePath, (url, self) => {
                    self.saveAfterUploadImage(userCreds,userId,url)
                }).bind(this)
            }).catch((error) => {
            });
        }
        else {
            // userCreds.user.updateProfile({
            //     displayName: this.state.Employee.userName,
            // });
            // firestore
            //     .collection('users')
            //     .doc(userId)
            //     .set({
            //         id: userId,
            //         nickname: this.state.Employee.userName,
            //     })
            // this.saveAfterUploadImage(userCreds,userId,this.state.Employee.imagePath)
            this.saveAfterUploadImage(userCreds,userId,this.state.image)
        }
    }
    saveAfterUploadImage = (userCreds,userId,url) => {
        var self = this
        userCreds.user.updateProfile({
            displayName: self.state.Employee.userName,
            photoURL: url
        });
        debugger
        firestore
            .collection('users')
            .doc(userId)
            .set({
                id: userId,
                nickname: self.state.Employee.userName,
                photoUrl: url,
                type: 2
            }).then(() => {
                console.log("success")
            })
            .catch(err => {
                console.log(err)
                // self.props.showToast(0, err.toString())
            })
        console.log(userCreds)
        self.uploadedFile = null;
        self.state.image = "https://firebasestorage.googleapis.com/v0/b/checkup-23ffe.appspot.com/o/images%2Fdefault%2FnoProfilePhoto.png?alt=media&token=f9e5091b-8364-4953-98cf-b3f2d9829616";
        var empObj = {
            userName: '',
            email: '',
            password: '',
            imagePath: '',
            phones: ['']
        }
        self.state.Employee.imagePath = url
        self.writeUserData(userId);
        self.state.Employee = empObj;
        if (this.props.senderEmpObj) {
            self.props.showNotification("Employee updated successfully");
            self.props.updateEmployee(false)
        }else{
        self.props.showNotification("Employee saved successfully");
        }
    }
    render() {
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
            // <div>
            <GridItem xs={12} sm={12} md={8}>
                <form onSubmit={this.handleSubmit.bind(this)}>

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
                                    <CustomInput disabled
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
                                        inputProps={{
                                            disabled: this.props.senderEmpObj?  true : false
                                          }}
                                    />
                                </GridItem>
                                {this.props.senderEmpObj ? ''
                                :
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
                                    }
                                {this.state.Employee.phones.map((textValue, index) => (

                                    <PhoneNumber key={index} index={index} count={this.state.Employee.phones.length} textValue={textValue} deletePhone={this.deletePhone} changeText={this.changeText}></PhoneNumber>
                                ))}

                                <GridItem xs={12} sm={12} md={12}>
                                    <Button onClick={this.handleAddNewPhone.bind(this)} color="primary">Add Phone</Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
        
                            {/* <Button onClick={this.handleSendNewRequest.bind(this)} color="primary">send New Request</Button> */}
                            {this.props.senderEmpObj?<Button onClick={()=> this.props.updateEmployee(false)} color="primary">cancel</Button> : ''}
                            <Button onClick={this.handleCreateNewEmployee.bind(this)} color="primary">{this.props.senderEmpObj ? 'Update' : 'Add Employee'}</Button>

                            {/* <Button onClick={this.handleUpdate} color="primary">Update Profile</Button>
                                    <Button onClick={this.handleDelete} color="primary">Update Profile</Button> */}
                        </CardFooter>
                    </Card>
                </form>

            </GridItem>
            // </div>
        );
    }
}
// CreateEmployeeDesign.propTypes = propTypes;
// CreateEmployeeDesign.defaultProps = defaultProps;

export default CreateEmployeeDesign;
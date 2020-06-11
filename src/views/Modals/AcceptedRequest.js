import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import 'react-awesome-slider/dist/styles.css';
import CustomInput from "components/CustomInput/CustomInput.js";

// text Area
import GridItem from "components/Grid/GridItem.js";
import InputLabel from "@material-ui/core/InputLabel";

import AlertDialogSlide from "../AlertDialoge/AlertDialogSlide";
//dropdown
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { database } from '../../firebase';
import Authentication from 'Authentication';
// import database from '../../firebase';
import firebase from 'firebase';
import TestReview from './TestReview';
import UpCommingRequests from '../UpCommingRequests/UpCommingRequests';
export default class AcceptedRequest extends React.Component {
   
    constructor(props) {
        
        super(props);
        window.$self = this //global variable
        this.getEmployeeData()
        debugger


        this.handleAlertOpen = this.handleAlertOpen.bind(this)
            this.state = {
           
                employeeList : [],
                test: {
                    testCost: '',
                    precastions: '',
                    employee: '',
                    status: '',
                    generatedCode: '',
                },
                isVisable : (props.fromHome === false ?'hidden':'visable') ,
                openAlert : false ,
                open : true,
                upcomming : false ,
              
            }
            
    }
    getEmployeeData = () => {
        
        let self = this
        database.ref('/').child('Employees').child(Authentication.loggedUser.uid).on('value', function (employeesArr) {
            employeesArr.forEach((element) => {
                self.state.employeeList.push(element)
            })
            self.forceUpdate()
        })
    }
    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    styleTestReview = {
        TestReviewModal: {
            // backgroundColor: "#111946",
            width: '100%',
            height: '100%',
        },
        textStyle: {
            fontSize: '17px',
            color: 'black',
            margin: '10px',
        },
        btnAction: {
            margin: '0 auto',
            width: '150px',
            marginLeft: '80px'
        },
        appBar: {
            position: 'relative',
            backgroundColor: '#ab47bc'
        },
    }

    updateData = () => {
        let self = this
        
        this.state.test.status = 'PendingForTakingTheSample'
        var testObj = {
            id : this.props.testId,
            status : this.state.test.status,
            precautions : this.state.test.precastions,
            employeeId : this.state.test.employee,
            totalCost: this.state.test.testCost,
            generatedCode: this.state.test.generatedCode

        }
        var data = testObj
   
   fetch(Authentication.API_URL+'/api/AnalysisService/ConfirmAnalysis', {
       method: 'POST', // or 'PUT'
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
   })
       .then(response => response.json())
       .then(data => {
           
           console.log('Success:', data);
           // var responseArray = JSON.parse(data)
           database.ref('/').child('Notification').child(self.props.userId).set({getNotified: database.ref().push().key})

           this.props.handleClose();
           

       })
       .catch((error) => {
           console.error('Error:', error);
       });
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId).set(this.state.test);
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId)
        //     .update({
        //         'status': this.state.test.status,
        //         'precastions': this.state.test.precastions,
        //         'employee': this.state.test.employee,
        //         'testCost': this.state.test.testCost,
        //         'generatedCode': this.state.test.generatedCode
        //     })
    }

    validate = () => {
        debugger
        this.setState({ openAlert: true })
       // this.setState({ open: true })
        // if ( this.state.test.precastions.length > 0 && this.state.test.testCost.length > 0 && this.state.test.generatedCode.length > 0) {
        //     this.updateData()

        // } else {
        //     alert('Complete Data')
        // }
    }







    handleAlertClose = () => {
        debugger
      
    //    window.$self.state.open = false;
   //     window.$self.state.upcomming = true
       window.$self.setState({ openAlert: false })
                       
      //  window.$self.setState({ open: false })
    //  window.$self.props.handleConfirm()
     
   
      };
    
      handleAlertOpen = () => {
        debugger
        if ( this.state.test.precastions.length > 0 && this.state.test.testCost.length > 0 && this.state.test.generatedCode.length > 0) {
            this.updateData()
     
            this.setState({ openAlert: false })
            this.setState({ open: false })
            window.location.reload();
          //  TestReview.fromAcceptRequestPage = true            
          //  this.handleConfirm()
        } else {
            alert('Complete Data')
           
        }
    
      
        //  this.forceUpdate()
    
      };
    


    //    handleConfirm = () => {
    //     this.props.handleConfirm()
    //     //return back 

    // };
















    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
      //  const {goBack} = this.props.navigation;
        debugger
        return (
          
            <div>
                  
                <Dialog fullScreen open={ window.$self.state.open} onClose={this.props.handleClose} TransitionComponent={this.Transition}>
                    <AppBar style={this.styleTestReview.appBar} >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" >
                                Accept Request
                        </Typography>

                            <Button autoFocus color="inherit" style={this.styleTestReview.btnAction} onClick={this.validate.bind(this)}>
                                Send
                            </Button>
                        </Toolbar>
                    </AppBar>
                 
                    <div style={this.styleTestReview.TestReviewModal} >
                        <span style={this.styleTestReview.textStyle}>Enter Total Price : </span>
                        <CustomInput
                            labelText="Test Cost"
                            id="username"
                            formControlProps={{
                                fullWidth: false
                            }}

                            value={this.state.test.testCost}
                            onChange={e => this.setState({
                                test: {
                                    ...this.state.test,
                                    testCost: e.target.value
                                }
                            })}
                        />

                        <br></br>
                        <span style={this.styleTestReview.textStyle}>Generated Code : </span>
                        <CustomInput
                            labelText="Generated Code"
                            id="username"
                            formControlProps={{
                                fullWidth: false
                            }}

                            value={this.state.test.generatedCode}
                            onChange={e => this.setState({
                                test: {
                                    ...this.state.test,
                                    generatedCode: e.target.value
                                }
                            })}
                        />

                        <GridItem xs={12} sm={12} md={4} style={{
                            color: 'black',
                        }}>
                            <CustomInput
                                labelText="precastions "
                                id="about-me"

                                value={this.state.test.precastions}
                                onChange={e => {
                                    
                                    this.setState({

                                        test: {
                                            ...this.state.test,
                                            precastions: e.target.value
                                        }
                                    })
                                }}

                                formControlProps={{
                                    fullWidth: true,
                                    color: 'black',
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,
                                    color: 'black',
                                }}
                                style={{
                                    color: 'black',
                                }}
                            />
                        </GridItem>

                        <div>
                     
                            <FormControl  style={{ visibility : window.$self.state.isVisable, color: "purple"}}>
                                <InputLabel htmlFor="grouped-native-select"
                                    style={{
                                        color: 'black',
                                        width: '150px',
                                        margin: "10px"
                                    }}
                                >Choose Employee</InputLabel>
                                <Select native defaultValue="" id="grouped-native-select" style={{
                                    color: 'black',
                                    width: '150px',
                                    margin: "10px",
                                    padding: '10px',
                                    borderColor: '#ab47bc'
                                }}

                                    value={this.state.test.employee}
                                    onChange={e => {
                                        
                                        this.setState({

                                            test: {
                                                ...this.state.test,
                                                employee: e.target.value
                                            }
                                        })
                                    }}

                                >
                                    <option aria-label="None" value="" />
                                 
                                    <optgroup label="Employees">
                                        {window.$self.state.employeeList.map((item,index) => (
                                            <option value={item.key}> {item.val().userName} </option>
                                        ))}
                                        {/* <option value={1}> Ali </option>
                                        <option value={2}> Muhamed </option>
                                        <option value={3}> Mazen </option>
                                        <option value={4}> yasien </option> */}
                                    </optgroup>
                                </Select>
                            </FormControl>

                        </div>
                    </div>
                </Dialog>
                <AlertDialogSlide text="  Did You  To Accept This Request ?" open={this.state.openAlert} handleAlertOpen={this.handleAlertOpen} handleAlertClose={this.handleAlertClose} />
                {/*window.$self.state.upcomming?<UpCommingRequests></UpCommingRequests>:''*/}
          

            </div>
        );
    }

}
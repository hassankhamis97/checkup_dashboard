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
// check box
import Checkbox from '@material-ui/core/Checkbox';
// text Area
import GridItem from "components/Grid/GridItem.js";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import { database } from '../../firebase';

import AlertDialogSlide from "../AlertDialoge/AlertDialogSlide";
import Authentication from 'Authentication';

export default class RefuseRequest extends React.Component {

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    state = {
        refuse: {
            refuseReason: '',
            radioRefusion: '',
            state: '',
            notAvailableTxt: '',
            anotherTimeTxt: '',
            youNeedToApplyInstructionTxt: '',

            checked: false,

        }
    }

    myRefusion = ''//this.state.notAvailableTxt + '\n' + this.state.anotherTimeTxt + '\n' + this.youNeedToApplyInstructionTxt
    refusesElement = ''
    handleChange = (event) => {
        
        this.setState({ checked: event.target.checked });
        if (event.target.checked === true) {

            this.state.refuse.radioRefusion += event.target.value + "\n"
        }

        // var ar = this.myRefusion.split('\n')
        
        // const namesArr = ar.filter(function(elem, pos) {
        //     return ar.indexOf(elem) == pos;
        // }); 
        // this.refusesElement = namesArr.toString()
    };

    updateData = () => {
        let self = this
        // 
        this.state.refuse.status = 'Refused'

                var testObj = {
                    id : this.props.testId,
                    status : this.state.refuse.status,
                    refuseReason :  this.state.refuse.refuseReason+ "\n" + this.refusesElement,
                    radioReason : this.state.refuse.radioRefusion,
                }
                var data = testObj;

        fetch(Authentication.API_URL+'/api/AnalysisService/RefuseAnalysis', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                
                console.log('Success:', data);
                database.ref('/').child('Notification').child(self.props.userId).set({getNotified: database.ref().push().key})
                window.location.reload();
                // var responseArray = JSON.parse(data)
                // this.props.handleClose();

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // this.state.refuse.status = 'Refused'
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId)
        //     .update({
        //         'status': this.state.refuse.status,
        //         'refuseReason': this.state.refuse.refuseReason+ "\n" + this.refusesElement,
        //         'radioReason': this.state.refuse.radioRefusion,
        //     })
    }

    validate = () => {
        this.setState({ openAlert: true })
     

    }

   
    handleAlertClose = () => {
        
        this.setState({ openAlert: false })

      //  window.$self.setState({ open: false })
     
    
      };
    
      handleAlertOpen = () => {
        
      // if (this.state.refuse.youNeedToApplyInstructionTxt !== '' && this.state.refuse.notAvailableTxt !== '' && this.state.refuse.anotherTimeTxt !== '' && this.state.refuse.refuseReason !== '') {
        if (this.state.refuse.refuseReason.length > 0 || this.state.refuse.radioRefusion.length > 0) {
            this.updateData()
            window.$self.setState({ openAlert: false })

            this.setState({ open: false })
            // window.location.reload();
            //goBack()
        } else {
            alert('No Valid')
        }
      
        //  this.forceUpdate()
    
      };
    






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
        checkboxStyle: {
            borderColor: 'black',
        },
        appBar: {
            position: 'relative',
            backgroundColor: '#ab47bc'
        },
    }
    render() {
      //  const {goBack} = this.props.navigation;
        return (

            <div>
                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={this.Transition}>
                    <AppBar style={this.styleTestReview.appBar} >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Refused Request
                        </Typography>

                            <Button autoFocus color="inherit" style={this.styleTestReview.btnAction} onClick={this.props.handleClose, this.validate.bind(this)}>
                                Done
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <div style={this.styleTestReview.TestReviewModal} >
                        <Checkbox
                            id="refuse"
                            checked={
                                this.state.checked
                            }
                            onChange={this.handleChange}
                            value="Tests are not available 
                            "
                            style={{
                                color: "#ab47bc",
                            }}
                        />
                        <span style={this.styleTestReview.textStyle}> Tests are not available 
</span>
                        <br></br>
                        <Checkbox
                            id="refuse"
                            checked={
                                this.state.checked
                            }
                            onChange={this.handleChange}

                            value=" Time is not suitable
                            "
                            style={{
                                color: "#ab47bc",
                            }}
                        />
                        <span style={this.styleTestReview.textStyle}> Time is not suitable
</span>
                        {/* <br></br>
                        <Checkbox
                            id="refuse"
                            checked={
                                this.state.checked
                            }
                            onChange={this.handleChange}

                            value="you need to apply instruction"
                            style={{
                                color: "#ab47bc",
                            }}
                        />
                        <span style={this.styleTestReview.textStyle}> you need to apply instruction </span> */}
                        <br></br>
                        <br></br>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Refuse Reason"
                                id="about-me"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5
                                }}

                                value={this.state.refuse.refuseReason}
                                onChange={e => {
                                    
                                    this.setState({

                                        refuse: {
                                            ...this.state.refuse,
                                            refuseReason: e.target.value //+ refuseValue
                                        }
                                    })
                                }}
                            />
                        </GridItem>
                    </div>
                </Dialog>
                <AlertDialogSlide text="Are You sure you want to refuse this request ?" open={this.state.openAlert} handleAlertOpen={this.handleAlertOpen} handleAlertClose={this.handleAlertClose} />

            </div>
        );
    }
}
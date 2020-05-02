import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import RefuseRequest from './RefusedRequest'
import AcceptedRequest from './AcceptedRequest'

import firebase from 'firebase';

export default class TestReview extends React.Component {

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    state = {
        refuseDialog: false,
        acceptDialog: false,
        recievedObj: {},
        data: {}
    }


    componentDidMount() {
        // debugger;
        this.state.recievedObj = this.props.recievedObj;
        console.log('*********************************************************************************')
        console.log(this.props.recievedObj)
        console.log('*********************************************************************************')
        this.getData(this);
    }

    getData = (self) => {
        debugger
        let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
        ref.child(self.state.recievedObj.id).on('value', snapshot => {
            debugger
            var obj = snapshot.val();
            console.log(obj)
            self.setState({ data: obj });
        });
    }


    handleRefuse = () => {
        //passing empty object will re-render the component
        this.setState({ refuseDialog: true })
    }

    handleRAccept = () => {
        //passing empty object will re-render the component
        this.setState({ acceptDialog: true })
    }


    handleRefuseClose = () => {
        //passing empty object will re-render the component
        this.setState({ refuseDialog: false })
    }

    handleRAcceptClose = () => {
        //passing empty object will re-render the component
        this.setState({ acceptDialog: false })
    }

    styleTestReview = {

        TestDataObject: {

            display: 'inline-block',
            alignItems: 'flex-end',
            fontSize: '20px',
            color: 'black',
        },
        TestData: {
            display: 'inline-block',
            width: '50%'
        },
        ImgTestPic: {
            width: '100%'
        },

        TestPic: {
            display: 'inline-block',
            verticalAlign: 'top',
            alignSelf: 'flex-end',
            width: '50%'
        },

        refuseBtn: {
            width: '150px',
            color: '#ff0000'
        },
        TestReviewModal: {
            // backgroundColor: "#111946",
            width: '100%',
            height: '100%',
        },
        textStyle: {
            fontSize: '25px',
            color: 'black',
            marginRight: '10px',
            marginLeft: '10px',
            marginTop: '10px',
        },
        appBar: {
            position: 'relative',
            backgroundColor: '#ab47bc'
        },
        btn: {
            margin: '0 auto',
            width: '150px',
            marginLeft: '80px'
        }
    }

    render() {
        return (
            <div style={this.styleTestReview.TestReviewModal}>
                 {this.state.refuseDialog ?
                <RefuseRequest testId={this.props.recievedObj.id} open={this.state.refuseDialog} handleClose={this.handleRefuseClose}></RefuseRequest> : ''}
                {this.state.acceptDialog ?
                    <AcceptedRequest open={this.state.acceptDialog} testId={this.props.recievedObj.id} handleClose={this.handleRAcceptClose}></AcceptedRequest> : ''}

                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={this.Transition}>
                    <AppBar style={this.styleTestReview.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" >
                                Test Review
                            </Typography>
                            <Button autoFocus color="inherit" style={this.styleTestReview.btn} onClick={this.handleRefuse}>
                                Refuse
                            </Button>

                            <Button autoFocus color="inherit" style={this.styleTestReview.btn}  /*onClick={props.handleClose}*/>
                                Chat
                            </Button>
                            <Button autoFocus color="inherit" style={this.styleTestReview.btn} onClick={this.handleRAccept}>
                                Accept
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div style={this.styleTestReview.TestReviewModal}>
                        <div style={this.styleTestReview.TestData}>
                            <span style={this.styleTestReview.textStyle}>Test Name : </span><p style={this.styleTestReview.TestDataObject}>{this.state.data.testName}</p><br></br>
                            <span style={this.styleTestReview.textStyle}>Date : </span><p style={this.styleTestReview.TestDataObject}>{this.state.data.date}</p><br></br>
                            <span style={this.styleTestReview.textStyle}>Time : </span><p style={this.styleTestReview.TestDataObject}>{this.state.data.time}</p><br></br>
                            <span style={this.styleTestReview.textStyle}>Is From Home : </span><p style={this.styleTestReview.TestDataObject}>{this.state.data.isFromHome}</p><br></br>
                            <span style={this.styleTestReview.textStyle}>Address : </span><p style={this.styleTestReview.TestDataObject}>Cairo</p><br></br>
                            {/* <span style={this.styleTestReview.textStyle}>Phone : </span><p style={this.styleTestReview.TestDataObject}>+201023548432</p><br></br> */}
                            {/* <span style={this.styleTestReview.textStyle}>Age : </span><p style={this.styleTestReview.TestDataObject}>50</p><br></br> */}
                        </div>
                        <div style={this.styleTestReview.TestPic}>
                            <AwesomeSlider>
                                <div>
                                    <img style={this.styleTestReview.ImgTestPic}
                                        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                        alt="new"
                                    />
                                </div>
                                <div>
                                    <img style={this.styleTestReview.ImgTestPic}
                                        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                        alt="new"
                                    />
                                </div>
                                <div>
                                    <img style={this.styleTestReview.ImgTestPic}
                                        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                        alt="new"
                                    />
                                </div>
                            </AwesomeSlider>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

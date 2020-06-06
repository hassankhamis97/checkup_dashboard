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
import HealthProfilePreview from './HealthProfilePreview'

import firebase from 'firebase';

export default class TestReview extends React.Component {
    static fromAcceptRequestPage = false;
    debugger
    constructor(props) { 
        super(props);
        window.$self = this 
     
        console.log(TestReview.fromAcceptRequestPage )
        console.log( props.open )
        this.state = {
            refuseDialog: false,
            acceptDialog: false,
            recievedObj: {},
            data: {},
            arr : [] ,
            open : (TestReview.fromAcceptRequestPage == true ? false : true) ,
           isFullScreen : false ,
           maximizLable : ""
        }
        debugger
      // props.open = (AcceptedRequest.fromAcceptRequestPage == true ? 'hidden' : 'visable')
    
        console.log( this.state.isFullScreen )
         console.log( this.state.isFullScreen )

     }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
  
   
  
    arr = this.props.recievedObj.roushettaPaths
    
    componentDidMount() {
        // ;
        this.state.recievedObj = this.props.recievedObj;
        console.log('*********************************************************************************')
        console.log(this.props.recievedObj)
        console.log('*********************************************************************************')
        // this.getData(this);
    }




    handleRefuse = () => {

        //passing empty object will re-render the component
        this.setState({ refuseDialog: true })
    }

    handleHealthDialog = () => {
        this.setState({ healthDialog: true })
    }

    handleHealthDialogClose = () => {
        //passing empty object will re-render the component
        this.setState({ healthDialog: false })
    }

    handleRAccept = () => {
        //passing empty object will re-render the component
        this.setState({ acceptDialog: true })
    }

    // handel back 
    debugger
    handleConfirm = () => {
        this.setState({ open: false })
        window.location.reload();
       // window.$self.props.reloadPage()
     //   this.forceUpdate()
    }

    handleRefuseClose = () => {
        //passing empty object will re-render the component
        this.setState({ refuseDialog: false })
    }

    handleRAcceptClose = () => {
        //passing empty object will re-render the component
       // this.setState({ acceptDialog: false })
       window.location.reload();
    }

    handleMaximize = ()=>{
        if ( window.$self.state.maximizLable == "Maiximize Images"){
          window.$self.state.maximizLable = "Minimize Image"
        this.setState({
            isFullScreen : true
        })
         } else{
            window.$self.state.maximizLable = "Maiximize Images"
            this.setState({
                isFullScreen : false
            })
         }


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
            height : "-webkit-fill-available"
            
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
        },
        titleStyle: {
            fontSize: '17px',
            fontWeight: "bold",
            color: 'black',
            margin: '10px',
        },
        subview: {
            alignItems: 'flex-end',
            fontSize: '15px',
            color: 'black',
            marginLeft: '20px'
        },
    }


  
    reloadPage = ()=>{
        window.$name.forceUpdate()
      }
    


    render() {
        debugger
        return (
            <div style={this.styleTestReview.TestReviewModal}> 
                 {this.state.refuseDialog ?
                <RefuseRequest testId={this.props.recievedObj.testId} userId={this.props.recievedObj.userId}  open={this.state.refuseDialog} handleClose={this.handleRefuseClose}></RefuseRequest> : ''} 
                {this.state.acceptDialog ?
    <AcceptedRequest open={this.state.acceptDialog} reloadPage = {this.reloadPage}  userId={this.props.recievedObj.userId} handleConfirm ={this.handleConfirm}  fromHome={this.props.recievedObj.isFromHome} testId={this.props.recievedObj.testId} handleClose={this.handleRAcceptClose}    ></AcceptedRequest> : ''}

                {this.state.healthDialog ?
                    <HealthProfilePreview open={this.state.healthDialog} userId={this.props.recievedObj.userId} handleClose={this.handleHealthDialogClose}></HealthProfilePreview> : ''}


                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={this.Transition}>
                    <AppBar style={this.styleTestReview.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" >
                                Test Review
                            </Typography>
                            <Button autoFocus color="inherit" style={this.styleTestReview.btn} onClick={this.handleRefuse /*this.props.handleClose*/}>
                                Refuse
                            </Button>

                            {/* <Button autoFocus color="inherit" style={this.styleTestReview.btn} >
                                Chat
                            </Button> */}
                            <Button autoFocus color="inherit" style={this.styleTestReview.btn} onClick={this.handleRAccept /*this.props.handleClose*/} >
                                Accept
                            </Button>


                            <Button autoFocus color="inherit" style={this.styleTestReview.btn} onClick={this.handleMaximize /*this.props.handleClose*/} >
                                Maximize Images
                                </Button>
                            <Button autoFocus color="inherit" style={this.styleTestReview.btn} onClick={this.handleHealthDialog /*this.props.handleClose*/} >
                                Patient Health
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div style={this.styleTestReview.TestReviewModal}>
                        <div style={this.styleTestReview.TestData}>
                            <span style={this.styleTestReview.titleStyle}>User Name : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.name}</p><br></br>
                            {/* <span style={this.styleTestReview.textStyle}>Test Name : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.name}</p><br></br> */}
                            <span style={this.styleTestReview.titleStyle}>Age : </span><p style={this.styleTestReview.TestDataObject}>{Math.floor((new Date() - new Date(this.props.recievedObj.birthdate)) / 31557600000)
                            }</p><br></br>
                            <span style={this.styleTestReview.titleStyle}>Request Date : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.dateRequest}</p><br></br>
                            <span style={this.styleTestReview.titleStyle}>Request Time : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.timeRequest}</p><br></br>
                            <span style={this.styleTestReview.titleStyle}>Take sample Date : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.timeForTakingSample}</p><br></br>
                            <span style={this.styleTestReview.titleStyle}>Take sample Time : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.dateForTakingSample}</p><br></br>
                            <span style={this.styleTestReview.titleStyle}>Is From Home : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.isFromHome == true ? 'YES' : 'No'}</p><br></br>
                            <span style={this.styleTestReview.titleStyle}>Address : </span><p style={this.styleTestReview.TestDataObject}>{this.props.recievedObj.Address}</p><br></br><br></br>
                            <span style={this.styleTestReview.titleStyle}>Phone : </span><br></br>
                            {this.props.recievedObj.phone.map(element => {
                                return <div>
                                    <span style={this.styleTestReview.subview} >{element.number}</span>
                                </div>
                            })}
                        </div>
                        <div style={this.styleTestReview.TestPic}>
                            {this.props.recievedObj.roushettaPaths.length > 0 ?
                           <AwesomeSlider  fillParent = {window.$self.state.isFullScreen} >
                            { this.props.recievedObj.roushettaPaths.map(element => {
                                // <AcceptedRequest></AcceptedRequest>
                                
                               return <div>
                                <img style={this.styleTestReview.ImgTestPic  }
                                    src = {element}
                                    alt="new"
                                />
                            </div>
                            })}
                              
                            </AwesomeSlider>
                            : ''}
                            <br></br>
                            <br></br>
                            {this.props.recievedObj.testName.length > 0 ?
                                <span style={this.styleTestReview.titleStyle}>Test Names : </span> : ''}
                            <br></br>
                            {this.props.recievedObj.testName.map(element => {
                                return <div>
                                    <span style={this.styleTestReview.subview} >{element}</span>
                                </div>
                            })}
                        </div>
                    </div>
                </Dialog>

                
            </div>
        );
    }
}

import React ,{useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TestReview(props) {
    const classes = useStyles();

    let  [refuseDialog,setRefuse]=useState();
    let  [acceptDialog,setAccept]=useState();

    function handleRefuse() {
        //passing empty object will re-render the component
        setRefuse({refuseDialog : true}) 
    }

    function handleRAccept() {
        //passing empty object will re-render the component
        setAccept({acceptDialog : true}) 
    }

    const styleTestReview = {

        TestDataObject: {

            display: 'inline-block',
            alignItems: 'flex-end',
            fontSize: '20px',
            color: 'white',
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
            color : '#ff0000'
        },
        TestReviewModal:{
            backgroundColor: "#111946",
            width: '100%',
            height: '100%',
        },
        textStyle: {
            fontSize: '25px',
            color: 'white',
            marginRight: '10px',
            marginLeft: '10px',
            marginTop: '10px',
        }
    }

    return (
        <div style={styleTestReview.TestReviewModal}>
         <RefuseRequest open={refuseDialog} ></RefuseRequest>
         <AcceptedRequest open={acceptDialog} ></AcceptedRequest>

            <Dialog fullScreen open={props.open} /*onClose={props.handleClose}*/ TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Test Review

                            
            </Typography>
            <Button autoFocus color="inherit" style={styleTestReview.btnAction,styleTestReview.refuseBtn} onClick={handleRefuse}>
                            Refuse
            </Button>
              
            <Button autoFocus color="inherit" style={styleTestReview.btnAction} /*onClick={props.handleClose}*/>
                            Chat
            </Button>
            <Button autoFocus style={styleTestReview.btnAction} color="inherit" onClick={handleRAccept}>
                        Accept
            </Button>
                    </Toolbar>
                </AppBar>
                <div style={styleTestReview.TestReviewModal}>
                    <div style={styleTestReview.TestData}>
                        <span style={styleTestReview.textStyle}>Name : </span><p style={styleTestReview.TestDataObject}>Ali</p><br></br>
                        <span style={styleTestReview.textStyle}>Date : </span><p style={styleTestReview.TestDataObject}>20-20-2020</p><br></br>
                        <span style={styleTestReview.textStyle}>Time : </span><p style={styleTestReview.TestDataObject}>5:30</p><br></br>
                        <span style={styleTestReview.textStyle}>From Home : </span><p style={styleTestReview.TestDataObject}>yes</p><br></br>
                        <span style={styleTestReview.textStyle}>Address : </span><p style={styleTestReview.TestDataObject}>Cairo</p><br></br>
                        <span style={styleTestReview.textStyle}>Phone : </span><p style={styleTestReview.TestDataObject}>+201023548432</p><br></br>
                        <span style={styleTestReview.textStyle}>Age : </span><p style={styleTestReview.TestDataObject}>50</p><br></br>
                    </div>
                    <div style={styleTestReview.TestPic}>
                        <AwesomeSlider>
                            <div>
                                <img style={styleTestReview.ImgTestPic}
                                    src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                    alt="new"
                                />
                            </div>
                            <div>
                                <img style={styleTestReview.ImgTestPic}
                                    src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                    alt="new"
                                />
                            </div>
                            <div>
                                <img style={styleTestReview.ImgTestPic}
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

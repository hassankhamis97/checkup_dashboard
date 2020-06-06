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

//dropdown
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { database } from '../../firebase';
import Authentication from 'Authentication';
// import database from '../../firebase';
import firebase from 'firebase';

export default class HealthProfilePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            healthStatus: {},
            healthData: {},
        }

    }

    getData = (self) => {
        fetch('http://checkup.somee.com/api/AnalysisService/HEALTH?userId=' + this.props.userId, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {

                var obj = data;
                console.log(obj)
                self.setState({ healthData: obj });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    styleTestReview = {
        TestReviewModal: {
            width: '100%',
            height: '100%',
        },
        titleStyle: {
            fontSize: '17px',
            fontWeight: "bold",
            color: 'black',
            margin: '10px',
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

    render() {
        return (
            <div>
                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={this.Transition}>
                    <AppBar style={this.styleTestReview.appBar} >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <div style={this.styleTestReview.TestReviewModal} >

                        <div style= {this.styleTestReview.titleStyle} >Does patient Sufer From Diabetes ? </div>
                        <div style= {this.styleTestReview.textStyle}>{this.state.healthData.isSufferFromDiabetes}</div>
                        <div style= {this.styleTestReview.titleStyle}>Does patient Sufer From Pressure ? </div>
                        <div style= {this.styleTestReview.textStyle}>{this.state.healthData.isSufferFromPressure}</div>
                        <div style= {this.styleTestReview.titleStyle}>Do patient take antibiotic ? </div>
                        <div style= {this.styleTestReview.textStyle}>{this.state.healthData.isTakeAntibiotic}</div>
                        <div style= {this.styleTestReview.titleStyle}>Do patient take haemophilia ? </div>
                        <div style= {this.styleTestReview.textStyle}>{this.state.healthData.isSufferFromDiabetes}</div>
                        <div style= {this.styleTestReview.titleStyle}>Diseases Names : </div>
                        {/* {this.state.healthData.diseasesNames.map(element => {
                            return <div>
                                <span style={this.styleTestReview.subview} >{element}</span>
                            </div>
                        })} */}

                    </div>
                </Dialog>
            </div>
        );
    }
}
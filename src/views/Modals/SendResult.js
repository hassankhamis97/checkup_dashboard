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
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

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

export default class SendResult {
    // const classes = useStyles();
render(){
    const styleTestReview = {

        TestDataObject: {
            display: 'inline-block',
            alignItems: 'flex-end'
        },
        TestData: {
            display: 'inline-block',
            width: '50%'
        },
        ImgTestPic: {
            width: '100%'
        },
        TestDataObject: {
            display: 'inline-block',
            alignItems: 'flex-end'
        },
        TestPic: {
            display: 'inline-block',
            verticalAlign: 'top',
            alignSelf: 'flex-end',
            width: '50%'
        },
        btnAction:{
            margin: '0 auto',
            width: '150px',
            marginLeft: '80px'
        },
        refuseBtn: {
            width: '150px',
            color : '#ff0000'
        }
        // TestReviewModal:{
        //     height: "100%",
        //     // backgroundColor: "blueviolet",
        //     width: "100%",
        // }
    }

    return (
        <div>

            <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Test Review

                            
            </Typography>
            <Button autoFocus color="inherit" style={styleTestReview.btnAction,styleTestReview.refuseBtn} onClick={this.props.handleClose}>
                            Refuse
            </Button>
              
            <Button autoFocus color="inherit" style={styleTestReview.btnAction} onClick={this.props.handleClose}>
                            Chat
            </Button>
            <Button autoFocus style={styleTestReview.btnAction} color="inherit" onClick={this.props.handleClose}>
                        Accept
            </Button>
                    </Toolbar>
                </AppBar>
                <div style={styleTestReview.TestReviewModal}>
                    <div style={styleTestReview.TestData}>
                    <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
              
                    </div>
                    <div style={styleTestReview.TestPic}>
                        
                    </div>
                </div>
            </Dialog>
        </div>
    );
                }
}

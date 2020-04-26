// import React from 'react';
// import { Button, Modal } from 'react-bootstrap';
// import '../../assets/css/modal-style.css'
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

// export default class ConfirmTestRequest extends React.Component {
//     constructor(){

//     }
//     state = {
//         show: true,
//         testId: '',
//         testObj: {
//             userName: 'Ali',
//             date: '20-20-2020',
//             time: '5:30PM',
//             isFromHome: true,
//             longitude: 13,
//             latitude: 31,
//         }
//     }

//     zoomImage = () => {

//     }
//     render() {
//         return (
//             <div>
//                 <Modal
//                     scrollable={true}
//                     dialogClassName="TestReviewModal MyBody AllBtns AcceptBtn"
//                     show={this.state.show}
//                     size="xl"
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                 >
//                     <Modal.Header closeButton={false}>
//                         <Modal.Title id="contained-modal-title-vcenter">
//                             Test Review
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <div>
//                             <div className="TestData">
//                                 <span>Name : </span><p className="TestDataObject">Ali</p><br></br>
//                                 <span>Date : </span><p className="TestDataObject">20-20-2020</p><br></br>
//                                 <span>Time : </span><p className="TestDataObject">5:30</p><br></br>
//                                 <span>From Home : </span><p className="TestDataObject">yes</p><br></br>
//                                 <span>Address : </span><p className="TestDataObject">Cairo</p><br></br>
//                                 <span>Phone : </span><p className="TestDataObject">+201023548432</p><br></br>
//                                 <span>Age : </span><p className="TestDataObject">50</p><br></br>
//                             </div>
//                             <div className="TestPic">
//                                 <AwesomeSlider>
//                                     <div>
//                                         <img className="ImgTestPic"
//                                             src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
//                                             alt="new"
//                                         />
//                                     </div>
//                                     <div>
//                                         <img className="ImgTestPic"
//                                             src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
//                                             alt="new"
//                                         />
//                                     </div>
//                                     <div>
//                                         <img className="ImgTestPic"
//                                             src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
//                                             alt="new"
//                                         />
//                                     </div>
//                                 </AwesomeSlider>
//                             </div>
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button dialogClassName="AcceptBtn">Accept</Button>
//                         <Button>Chat</Button>
//                         <Button>Refuse</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
// }
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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

export default function TestReview(props) {
    const classes = useStyles();

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

            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Test Review

                            
            </Typography>
            <Button autoFocus color="inherit" style={styleTestReview.btnAction,styleTestReview.refuseBtn} onClick={props.handleClose}>
                            Refuse
            </Button>
              
            <Button autoFocus color="inherit" style={styleTestReview.btnAction} onClick={props.handleClose}>
                            Chat
            </Button>
            <Button autoFocus style={styleTestReview.btnAction} color="inherit" onClick={props.handleClose}>
                        Accept
            </Button>
                    </Toolbar>
                </AppBar>
                <div style={styleTestReview.TestReviewModal}>
                    <div style={styleTestReview.TestData}>
                        <span>Name : </span><p style={styleTestReview.TestDataObject}>Ali</p><br></br>
                        <span>Date : </span><p style={styleTestReview.TestDataObject}>20-20-2020</p><br></br>
                        <span>Time : </span><p style={styleTestReview.TestDataObject}>5:30</p><br></br>
                        <span>From Home : </span><p style={styleTestReview.TestDataObject}>yes</p><br></br>
                        <span>Address : </span><p style={styleTestReview.TestDataObject}>Cairo</p><br></br>
                        <span>Phone : </span><p style={styleTestReview.TestDataObject}>+201023548432</p><br></br>
                        <span>Age : </span><p style={styleTestReview.TestDataObject}>50</p><br></br>
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

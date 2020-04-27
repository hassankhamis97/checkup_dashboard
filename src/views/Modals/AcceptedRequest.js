// import React from 'react';
// import { Button, Modal } from 'react-bootstrap';
// import CustomInput from "components/CustomInput/CustomInput.js";

// export default class AcceptedRequest extends React.Component {
//     state = {
//         show: true
//     }

//     mystyle = {

//     };

//     render() {
//         return (
//             <div>
//                 <Modal
//                     dialogClassName="TestReviewModal MyBody AllBtns AcceptBtn"
//                     show={this.state.show}
//                     size="xl"
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                 >
//                     <Modal.Header closeButton={false}>
//                         <Modal.Title id="contained-modal-title-vcenter">
//                             Accepted Request
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <span>Enter Total Price : </span> <CustomInput
//                             labelText="Test Cost"
//                             id="username"
//                             formControlProps={{
//                                 fullWidth: false
//                             }}
//                         />

//                         <p>Precautions : </p>
//                         <textarea id="w3mission" rows="4" cols="50"></textarea>
//                         <div>
//                             <label for="cars">Choose Employee</label>

//                             <select id="cars">
//                                 <option value="Ali">Ali</option>
//                                 <option value="Muhamed">Muhamed</option>
//                                 <option value="sara">sara</option>
//                                 <option value="alia">alia</option>
//                             </select>
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button>Send</Button>
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import 'react-awesome-slider/dist/styles.css';
import CustomInput from "components/CustomInput/CustomInput.js";


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

export default function AcceptedRequest(props) {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const styleTestReview = {
        TestReviewModal: {
            backgroundColor: "#111946",
            width: '100%',
            height: '100%',
        },
        textStyle: {
            fontSize: '17px',
            color: 'white',
            margin: '10px',
        },
        btnAction: {
            margin: '0 auto',
            width: '150px',
            marginLeft: '80px'
        },
    }

    return (
        <div>
            <Dialog fullScreen open={props.open} /*onClose={props.handleClose}*/ TransitionComponent={Transition}>
                <AppBar className={classes.appBar} >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Accept Request
                    </Typography>

                        <Button autoFocus color="inherit" style={styleTestReview.btnAction} /*onClick={props.handleClose}*/>
                            Send
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={styleTestReview.TestReviewModal} >
                    <span style={styleTestReview.textStyle}>Enter Total Price : </span> <CustomInput
                        labelText="Test Cost"
                        id="username"
                        formControlProps={{
                            fullWidth: false
                        }}
                    />
                    <h2 style={styleTestReview.textStyle}>Precautions : </h2>
                    <textarea id="w3mission" rows="4" cols="50"></textarea>
                    <div>
                        <label for="refuse" style={styleTestReview.textStyle}> Choose Employee</label>
                        <select id="refuse">
                            <option value="Ali">Ali</option>
                            <option value="Muhamed">Muhamed</option>
                            <option value="sara">sara</option>
                            <option value="alia">alia</option>
                        </select>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

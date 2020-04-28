// import React from 'react';
// import { Button, Modal } from 'react-bootstrap';

// export default class ConfirmTestRequest extends React.Component {

//     state = {
//         show: true
//     }
//     close = () => {
//         this.setState({ show: false });
//     }
//     open() {
//         this.setState({ show: true });
//     }

//     render() {
//         return (
//             <div>

//                 <Modal show={this.state.show}
//                     dialogClassName="Confirmation AllBtns AcceptBtn"
//                     onHide={this.close}
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered
//                 >
//                     <Modal.Header closeButton={false}>Request Test Review</Modal.Header>
//                     <Modal.Body>
//                         Are you sure you took sample from patient ?
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button>Yes</Button>
//                         <Button onClick={this.close}>No</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
// }

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';


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

export default function ConfirmTestRequest(props) {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const styleTestReview = {
        TestReviewModal: {
            backgroundColor: "#ab47bc",
            color: 'white',
        },
        textStyle: {
            fontSize: '17px',
            color: 'black',
            margin: '10px',
        },
        btnAction: {
            margin: '0 auto',
            width: '150px',
            marginLeft: '80px',
            color: 'black',
        },
    }

    return (
        <div >
            <Dialog
                open={props.open}
                /*onClose={props.handleClose}*/
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={styleTestReview.TestReviewModal} >{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={styleTestReview.textStyle}>
                        Are you sure to take a sample from patient ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button color="primary" style={styleTestReview.btnAction} /*onClick={props.handleClose}*/>
                        Disagree
                    </Button>
                    <Button color="primary" style={styleTestReview.btnAction}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

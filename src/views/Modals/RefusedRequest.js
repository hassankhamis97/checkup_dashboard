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



/*const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        backgroundColor:'#ab47bc'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RefuseRequest(props) {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const styleTestReview = {
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
// debugger;
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar style={styleTestReview.appBar} >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Refused Request
                    </Typography>

                        <Button autoFocus color="inherit" style={styleTestReview.btnAction} onClick={props.handleClose}>
                            Done
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={styleTestReview.TestReviewModal} >
                    <Checkbox
                        // checked={cryon}
                        // onChange={this.handleChange('cryon')}
                        // value="cryon"
                        style={{
                            color: "#ab47bc",
                        }}
                    />
                    <span style={styleTestReview.textStyle}> Not Available</span>
                    <br></br>
                    <Checkbox
                        // checked={cryon}
                        // onChange={this.handleChange('cryon')}
                        // value="cryon"
                        style={{
                            color: "#ab47bc",
                        }}
                    />
                    <span style={styleTestReview.textStyle}> Another Time</span>
                    <br></br>
                    <Checkbox
                        // checked={cryon}
                        // onChange={this.handleChange('cryon')}
                        // value="cryon"
                        style={{
                            color: "#ab47bc",
                        }}
                    />
                    <span style={styleTestReview.textStyle}> you need to apply precaustion </span>
                    <br></br>
                    <br></br>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Refuse Reson"
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
                </div>
            </Dialog>
        </div>
    );
}
*/

export default class RefuseRequest extends React.Component {

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    state = {
        test: {
            // setChecked: true,
            refuseReason: '',
            refuseCheckedObj:{
                notAvailable: false,
                anotherTime: false,
                youNeedToApplyRefuseReason: false
            }
        }
    }

    handleChange = (event) => {
        debugger
        // setChecked(event.checked);
        // this.setState({ setChecked: event })
    };

    /*updateData = () => {
        debugger

        this.state.test.status = 'Done'
        database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId).set(this.state.test);
        database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId)
            .update({
                'status': this.state.test.status,
                'refuseReason': this.state.test.refuseReason,
                'employee': this.state.test.employee,
            })
    }*/

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
        return (
            <div>
                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={this.Transition}>
                    <AppBar style={this.styleTestReview.appBar} >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6"/* className={classes.title}*/>
                                Refused Request
                        </Typography>

                            <Button autoFocus color="inherit" style={this.styleTestReview.btnAction} onClick={this.props.handleClose}>
                                Done
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <div style={this.styleTestReview.TestReviewModal} >
                        <Checkbox
                            checked={this.state.test.refuseCheckedObj.notAvailable}
                            onChange={this.handleChange('Not Available')}
                            value="cryon"
                            // id="notAvailable"
                            style={{
                                color: "#ab47bc",
                            }}
                        />
                        <span style={this.styleTestReview.textStyle}> Not Available</span>
                        <br></br>
                        <Checkbox
                            checked={this.state.test.refuseCheckedObj.anotherTime}
                            // checked={ 'Another Time'}
                            // onChange={this.handleChange(' Another Time')}
                            // value=" Another Time"
                            style={{
                                color: "#ab47bc",
                            }}
                        />
                        <span style={this.styleTestReview.textStyle}> Another Time</span>
                        <br></br>
                        <Checkbox
                            checked={this.state.test.refuseCheckedObj.youNeedToApplyRefuseReason}

                            // checked={'you need to apply precaustion'}
                            // onChange={this.handleChange('you need to apply precaustion')}
                            // value="you need to apply precaustion"
                            style={{
                                color: "#ab47bc",
                            }}
                        />
                        <span style={this.styleTestReview.textStyle}> you need to apply Refuse Reason </span>
                        <br></br>
                        <br></br>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Refuse Reson"
                                id="about-me"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5
                                }}

                                value={this.state.test.refuseReason}
                                onChange={e => {
                                    debugger
                                    this.setState({

                                        test: {
                                            ...this.state.test,
                                            refuseReason: e.target.value
                                        }
                                    })
                                }}
                            />
                        </GridItem>
                    </div>
                </Dialog>
            </div>
        );
    }
}
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


/*const useStyles = makeStyles((theme) => ({
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
        appBar: {
            position: 'relative',
            backgroundColor: '#ab47bc'
        },
    }

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar style={styleTestReview.appBar} >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Accept Request
                    </Typography>

                        <Button autoFocus color="inherit" style={styleTestReview.btnAction} onClick={props.handleClose}>
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

                    <GridItem xs={12} sm={12} md={4} style={{
                                color: 'black',
                            }}>
                        <CustomInput
                            labelText="precastions "
                            id="about-me"
                            formControlProps={{
                                fullWidth: true,
                                color: 'black',
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                color: 'black',
                            }}
                            style={{
                                color: 'black',
                            }}
                        />
                    </GridItem>

                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="grouped-native-select" 
                                style={{
                                    color: 'black',
                                    width: '150px',
                                    margin: "10px"
                                }} 
                            >Choose Employee</InputLabel>
                            <Select native defaultValue="" id="grouped-native-select"  style={{
                                    color: '#ab47bc',
                                    width: '150px',
                                    margin: "10px",
                                    padding: '10px',
                                    borderColor: 'black'
                                }} >
                                <option aria-label="None" value="" />
                                <optgroup label="Category 1">
                                    <option value={1}>Option 1</option>
                                    <option value={2}>Option 2</option>
                                </optgroup>
                            </Select>
                        </FormControl>

                    </div>
                </div>
            </Dialog>
        </div>
    );
}
*/

export default class AcceptedRequest extends React.Component {

    state = {
        setChecked: true,
        inputValue: '',
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    handleChange = (event) => {
        // setChecked(event.checked);
        this.setState({ setChecked: event })
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
        appBar: {
            position: 'relative',
            backgroundColor: '#ab47bc'
        },
    }
    /*
        updateData = () =>{
            debugger
            var storageRef = firebase.storage().ref('/TestResults/' + this.props.testId + '/');
                    
            // var metadata = {
            //     contentType: 'image/jpeg',
            //   };
    
                // Upload the file and metadata
            for (let i = 0; i < this.state.uploadedFiles.length; i++) {
                var uploadTask = storageRef.child(this.state.uploadedFiles[i].name).put(this.state.uploadedFiles[i]);
            }
            this.state.test.status = 'Done'
            database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId).set(this.state.test);
            // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId)
            // .update({ 'status': this.state.test.status,
            //             'description': this.state.test.description,
            //             'hba1c': this.state.test.hba1c,
            //             'resultFilespaths': this.state.test.resultFilespaths,
            //              })
            this.props.handleClose();
        }*/

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
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
                            <Typography variant="h6" >
                                Accept Request
                        </Typography>

                            <Button autoFocus color="inherit" style={this.styleTestReview.btnAction} onClick={this.props.handleClose}>
                                Send
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <div style={this.styleTestReview.TestReviewModal} >
                        <span style={this.styleTestReview.textStyle}>Enter Total Price : </span> <CustomInput
                            labelText="Test Cost"
                            id="username"
                            formControlProps={{
                                fullWidth: false
                            }}
                        />

                        <GridItem xs={12} sm={12} md={4} style={{
                            color: 'black',
                        }}>
                            <CustomInput
                                labelText="precastions "
                                id="about-me"
                                value={this.state.inputValue}
                                onChange={evt => this.updateInputValue(evt)}
                                formControlProps={{
                                    fullWidth: true,
                                    color: 'black',
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,
                                    color: 'black',
                                }}
                                style={{
                                    color: 'black',
                                }}
                            />
                        </GridItem>

                        <div>
                            <FormControl>
                                <InputLabel htmlFor="grouped-native-select"
                                    style={{
                                        color: 'black',
                                        width: '150px',
                                        margin: "10px"
                                    }}
                                >Choose Employee</InputLabel>
                                <Select native defaultValue="" id="grouped-native-select" style={{
                                    color: '#ab47bc',
                                    width: '150px',
                                    margin: "10px",
                                    padding: '10px',
                                    borderColor: 'black'
                                }} >
                                    <option aria-label="None" value="" />
                                    <optgroup label="Category 1">
                                        <option value={1}>Option 1</option>
                                        <option value={2}>Option 2</option>
                                        <option value={3}>Option 3</option>
                                        <option value={4}>Option 4</option>
                                    </optgroup>
                                </Select>
                            </FormControl>

                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

}
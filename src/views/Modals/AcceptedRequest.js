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

import {database} from '../../firebase';

// import database from '../../firebase';
import firebase from 'firebase';

export default class AcceptedRequest extends React.Component {

    state = {
        setChecked: true,
        test: {
            testCost: '',
            precastions: '',
            employee: '',
            status: '',
        },
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

    updateData = () => {
        debugger

        this.state.test.status = 'Done'
        database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId)
            .update({
                'status': this.state.test.status,
                'precastions': this.state.test.precastions,
                'employee': this.state.test.employee,
            })
    }

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

                            <Button autoFocus color="inherit" style={this.styleTestReview.btnAction} onClick={this.updateData()}  >
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

                            value={this.state.test.testCost}
                            onChange={e => this.setState({
                                test: {
                                    ...this.state.test,
                                    testCost: e.target.value
                                }
                            })}
                        />

                        <GridItem xs={12} sm={12} md={4} style={{
                            color: 'black',
                        }}>
                            <CustomInput
                                labelText="precastions "
                                id="about-me"

                                value={this.state.test.precastions}
                                onChange={e => {
                                    debugger
                                    this.setState({

                                        test: {
                                            ...this.state.test,
                                            precastions: e.target.value
                                        }
                                    })
                                }}

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
                                    color: 'black',
                                    width: '150px',
                                    margin: "10px",
                                    padding: '10px',
                                    borderColor: '#ab47bc'
                                }}

                                    value={this.state.test.employee}
                                    onChange={e => {
                                        debugger
                                        this.setState({

                                            test: {
                                                ...this.state.test,
                                                employee: e.target.value
                                            }
                                        })
                                    }}

                                >
                                    <option aria-label="None" value="" />
                                    <optgroup label="Employees">
                                        <option value={1}> Ali </option>
                                        <option value={2}> Muhamed </option>
                                        <option value={3}> Mazen </option>
                                        <option value={4}> yasien </option>
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
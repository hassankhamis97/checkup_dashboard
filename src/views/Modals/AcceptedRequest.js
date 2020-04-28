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
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
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

                    <GridItem xs={12} sm={12} md={12} style={{
                                color: 'white',
                            }}>
                        {/* <InputLabel style={{ color: "White" }}></InputLabel> */}
                        <CustomInput
                            labelText="precastions "
                            id="about-me"
                            formControlProps={{
                                fullWidth: true,
                                color: 'white',
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                color: 'white',
                            }}
                            style={{
                                color: 'white',
                            }}
                        />
                    </GridItem>

                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="grouped-native-select" 
                                style={{
                                    color: 'white',
                                    width: '150px',
                                    margin: "10px"
                                }} 
                            >Choose Employee</InputLabel>
                            <Select native defaultValue="" id="grouped-native-select"  style={{
                                    color: '#00e676',
                                    width: '150px',
                                    margin: "10px",
                                    padding: '10px',
                                    borderColor: 'white'
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

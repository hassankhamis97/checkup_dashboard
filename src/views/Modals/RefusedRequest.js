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

export default function RefuseRequest(props) {
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
        checkboxStyle: {
            borderColor: 'white',
        }
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
                            Refused Request
                    </Typography>

                        <Button autoFocus color="inherit" style={styleTestReview.btnAction} /*onClick={props.handleClose}*/>
                            Done
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={styleTestReview.TestReviewModal} >
                    {/* <input type="checkbox" name="" value="" /> */}
                    <Checkbox
                        // checked={cryon}
                        // onChange={this.handleChange('cryon')}
                        // value="cryon"
                        style={{
                            color: "#00e676",
                        }}
                    />
                    <span style={styleTestReview.textStyle}> Not Available</span>
                    <br></br>
                    <Checkbox
                        // checked={cryon}
                        // onChange={this.handleChange('cryon')}
                        // value="cryon"
                        style={{
                            color: "#00e676",
                        }}
                    />
                    <span style={styleTestReview.textStyle}> Another Time</span>
                    <br></br>
                    <Checkbox
                        // checked={cryon}
                        // onChange={this.handleChange('cryon')}
                        // value="cryon"
                        style={{
                            color: "#00e676",
                        }}
                    />
                    <span style={styleTestReview.textStyle}> you need to apply precaustion </span>
                    <br></br>
                    <br></br>

                    <GridItem xs={12} sm={12} md={12}>
                        {/* <InputLabel style={{ color: "#AAAAAA" }}></InputLabel> */}
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


                    {/* <h2 style={styleTestReview.textStyle}>Refuse Reson : </h2>
                    <textarea id="w3mission" rows="4" cols="50"></textarea> */}
                </div>
            </Dialog>
        </div>
    );
}

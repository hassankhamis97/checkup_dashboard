import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Authentication from '../../Authentication'
import database from '../../firebase';
import GridItem from "components/Grid/GridItem.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import firebase from 'firebase';
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                AHMY
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const authentication = new Authentication();

// function login() {
//     debugger

//     authentication.checkUser(email, password,(msg)=>{alert(msg)})
//     // auth.signInWithEmailAndPassword("pp@pp.com", "123456789Iti")
//     // auth.onAuthStateChanged(firebaseUser => {
//     //     console.log(firebaseUser)
//     //     console.log(firebase.auth().currentUser)

//     // })
// }
// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => ++value); // update the state to force render
// }
export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
    const [value, setValue] = React.useState(0); 
    const [isLogin, setIsLogin] = React.useState(true);
    // debugger

    // function useForceUpdate(){
    //     const [value, setValue] = React.useState(0); // integer state
    //     return () => setValue(value => ++value); // update the state to force render
    // }
    // const forceUpdate = useForceUpdate();
    authentication.getUser(() => {
        return () => setValue(value => ++value); // update the state to force render
    })
    const classes = useStyles();
    const hist = createBrowserHistory();
    const loginStyle = {
        disN: {
            display: 'none'
        },
        disB: {
            display: 'block',
            width: '100%'
        },

    }
    function login() {
        debugger
        if (email.trim() != '' && password.trim() != '') {
            authentication.checkUser(email, password, (msg) => { setErrMsg(msg) })
        }
        else {
            setErrMsg('email and password are required')
        }
    }
    function forgetPassword() {
        debugger
        firebase.auth().sendPasswordResetEmail(email)
            .then(function() {
              alert('checkmail')
            })
            .catch(function(error) {
                alert(error)
              // Error occurred. Inspect error.code.
            });
    }
    return (
        <div>
            {/* {Authentication.loggedUser != null ? 
            <Router history={hist}>
                <Switch>
                    <Route path="/admin" component={Admin} />
                    <Route path="/rtl" component={RTL} />
                    <Redirect from="/" to="/admin/dashboard" />
                </Switch>
            </Router> : */}
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <br></br>
                        <GridItem style={loginStyle.w100, errMsg !== '' ? loginStyle.disB : loginStyle.disN}>
                            <SnackbarContent
                                message={
                                    errMsg
                                }

                                color="danger"
                            />
                        </GridItem>
                        {isLogin ? <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}

                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button

                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={login}
                            >
                                Sign In
            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={()=>{setIsLogin(false)}} variant="body2">
                                        Forgot password?
                </Link>
                                </Grid>
                                {/* <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid> */}
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                            :
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                
                                {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                                <Button

                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={forgetPassword}
                                >
                                    Confirm
            </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link  onClick={()=>{setIsLogin(true)}} variant="body2">
                                            Back
                </Link>
                                    </Grid>
                                    {/* <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid> */}
                                </Grid>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        }
                    </div>
                </Grid>
            </Grid>
            {/* } */}
        </div>
    );
}
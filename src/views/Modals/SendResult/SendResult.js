import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import 'react-awesome-slider/dist/styles.css';
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {database} from '../../../firebase';
import ResultFiles from './ResultFiles'
// import database from '../../../firebase';
import firebase from 'firebase';
import Authentication from "Authentication";
import SendResultConfirmationAlert from './SendResultConfirmationAlert';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class SendResult extends React.Component {
    constructor(){
        super()
        // var uploadedFiles = [];
    }
        state = {
            open: false,
            resultFilespaths : [],
            uploadedFiles: [],
            // Employee: {
            //     name: '',
            //     address: ''

            // }
            // Employee: []
            // Employee: {
            //     userName: '',
            //     email: '',
            //     password: '',
            //     imagePath: '',
            //     phones: ['']
            // },
            errMsg: '',
            test:{
                date: '',
                description: '',
                id: '',
                isFromHome: false,
                resultFilespaths: [],
                roushettaPath: [],
                status: '',
                testName: '',
                time: '',
                userId: '',
                description: '',
                hba1c: ''
            }

        }
    
    componentDidMount() {
        

        this.getUserData();

    }
    getUserData = () => {
        ;
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId).set(this.state.test);
        // var data = {labBranchFireBaseId :'IaTcOwrdXhVBa7qx40FOkW5b94J3',Status : ['PendingForResult']};
// 
        fetch(Authentication.API_URL+'/api/AnalysisService/GetSpecificTest?testId='+this.props.testId, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                
                var testObj = data;
            console.log(testObj)
            this.setState({test: testObj});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // let ref = database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId);
        // ref.on('value', snapshot => {
            
        //     var testObj = snapshot.val();
        //     console.log(testObj)
        //     this.setState({test: testObj});
        // });
        console.log('DATA RETRIEVED');
    }
    deleteFile = (index) =>{
        this.state.test.resultFilespaths.splice(index,1);
        this.state.uploadedFiles.splice(index,1);
        this.forceUpdate()
    }
    onImageChange = (event) => {
        
        if (event.target.files) {
            // this.state.uploadedFiles = event.target.files;
            this.state.test.resultFilespaths = []
            this.state.uploadedFiles = []
            for (let i = 0; i < event.target.files.length; i++) {
                this.state.uploadedFiles.push(event.target.files[i])
                this.state.test.resultFilespaths.push('/TestResults/'+ this.props.testId + '/'+ event.target.files[i].name) ;
            }
            // this.state.test.resultFilespaths = this.state.resultFilespaths;
            this.forceUpdate();
            // this.setState({
            //     Employee: {
            //         ...this.state.Employee,
            //         imagePath: '/images/' + event.target.files[0].name
            //     }
            // })
            // let reader = new FileReader();
            // reader.onload = (e) => {
            //     this.setState({ image: e.target.result });

            // };
            // reader.readAsDataURL(event.target.files[0]);
        }
    }
    
    handleClose = () => {
        this.setState({ open: false })
    }
    handleConfirm = () => {
        this.updateData();
        this.setState({ open: false })
    }
    handleOpenAlert = ()=> {
        
        if(this.state.uploadedFiles.length > 0)
            this.setState({open: true})
        else
            this.setState({errMsg: "Please inseart at least 1 file"})
        
    }
    updateData = () =>{
        let me = this
        var storageRef = firebase.storage().ref('/TestResults/' + this.props.testId + '/');
                
        // var metadata = {
        //     contentType: 'image/jpeg',
        //   }; 

            // Upload the file and metadata
        for (let i = 0; i < me.state.uploadedFiles.length; i++) {
            var count = 0
            var urlCounter = 0
            // var uploadTask = storageRef.child(this.state.uploadedFiles[i].name).put(this.state.uploadedFiles[i]);
            
            var uploadTask = storageRef.child(me.state.uploadedFiles[i].name).put(me.state.uploadedFiles[i]).then(() => {
                let authentication = new Authentication()
                urlCounter++;
                if (urlCounter == me.state.uploadedFiles.length){
                    for (let j = 0; j < urlCounter; j++) {
                        authentication.getImage(me, me.state.test.resultFilespaths[j], (url, self) => {
                            me.state.test.resultFilespaths[count] = url
                            count++;
                            
                            if (count == me.state.uploadedFiles.length){
                                me.saveDataInDB()
                            }
                        })
                    }
                
            }
            }).catch((error) => {
            });
        }
        
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId).set(this.state.test);
        // database.ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1').child(this.props.testId)
        // .update({ 'status': this.state.test.status,
        //             'description': this.state.test.description,
        //             'hba1c': this.state.test.hba1c,
        //             'resultFilespaths': this.state.test.resultFilespaths,
        //              })
    }
    saveDataInDB = () => {
        let self = this
        this.state.test.id = this.props.testId
        this.state.test.status = 'Done'
        var data = this.state.test;
        // 
        fetch(Authentication.API_URL+'/api/AnalysisService/UpdateAnalysis', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                database.ref('/').child('Notification').child(self.state.test.userId).set({getNotified: database.ref().push().key})
                // var responseArray = JSON.parse(data)
                this.props.handleClose();
                

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // const classes = useStyles();
render(){
    
    const styleSendResult = {
        appBar: {
            position: 'relative',
        },
        title: {
            // marginLeft: theme.spacing(2),
            flex: 1,
        },
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
            width: '45%',
            border: '1px solid rgb(178, 201, 233)',
            float: 'right',
            padding: '20px'
        },
        btnAction:{
            margin: '0 auto',
            width: '150px',
            marginLeft: '80px'
        },
        refuseBtn: {
            width: '150px',
            color : '#ff0000'
        },
        TestReviewModal:{
            // height: "100%",
            // // backgroundColor: "blueviolet",
            // width: "100%",
            padding: '20px'
        },
        chooser:{
            border: '2px dashed #0087F7',
            width: '82%',
            borderRadius: '5px',
            cursor: 'pointer',
            padding: '54px',
            textAlign: 'center'
        },
        inputImage: {
            display: 'none'
        },
    }
    
    return (
        <div>
            {this.state.open?<SendResultConfirmationAlert open={this.state.open} handleConfirm={this.handleConfirm.bind(this)}  handleClose={this.handleClose.bind(this)}></SendResultConfirmationAlert>:''}
            <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={Transition}>
                <AppBar style={styleSendResult.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" style={styleSendResult.title}>
                            Send Result

                            
            </Typography>
            
            <Button autoFocus style={styleSendResult.btnAction} color="inherit" 
                onClick={this.handleOpenAlert.bind(this)}>
                        Accept
            </Button>
                    </Toolbar>
                </AppBar>
                <div style={styleSendResult.TestReviewModal}>
                    <div style={styleSendResult.TestData}>
                        <br></br>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <InputLabel style={{ color: "#AAAAAA" }}>Some Info About Result</InputLabel>
                        {this.state.errMsg !== '' ? <GridItem>
                            <SnackbarContent
                                message={
                                    this.state.errMsg
                                }

                                color="danger"
                            />
                        </GridItem> : '' }
                        <CustomInput
                            labelText="Enter Description About Test Result For User"
                            id="about-me"
                            formControlProps={{
                            fullWidth: true
                            }}
                            value={this.state.test.description}
                            onChange={ e => {
                                
                                this.setState({
                                    
                                    test: {
                                        ...this.state.test,
                                        description: e.target.value
                                    }
                                })
                            }}
                            inputProps={{
                            multiline: true,
                            rows: 5
                            }}
                        />
                        </GridItem>
                    </GridContainer>
                    <div>
                        <input style={styleSendResult.inputImage} onChange={this.onImageChange.bind(this)} accept="application/pdf,application/vnd.ms-excel,image/*" id="icon-button-file" type="file" multiple/>
                        <label htmlFor="icon-button-file">
                                            <div style={styleSendResult.chooser}>
                                                Choose results files
                                            </div>
                                        </label>
                                    </div>
                    {(this.state.test.resultFilespaths && this.state.uploadedFiles.length) ? this.state.test.resultFilespaths.map((textValue,index)=> (
                                            
                        <ResultFiles key={index} index={index} count={this.state.test.resultFilespaths.length} textValue={textValue} deleteFile={this.deleteFile} changeText={this.changeText}></ResultFiles>
                    )): ''}
                    </div>
            <div style={styleSendResult.TestPic}>
            <InputLabel style={{ color: "#AAAAAA" }}>Some Info About Result</InputLabel>

                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                type="text"
                                                value={this.state.test.hba1c}
                                                onChange={e => {
                                                    this.setState({
                                                        test: {
                                                            ...this.state.test,
                                                            hba1c: e.target.value
                                                        }
                                                    })
                                                }}
                                            labelText="HBA1C Test Result"
                                                id="username"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                    </div>
                </div>
            </Dialog>
        </div>
    );
                
}
}
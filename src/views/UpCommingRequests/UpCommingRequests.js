import React from "react";

import GridItem from "components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";

import firebase from 'firebase';

import database from '../../firebase';


import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";


import Table from "components/Table/Table.js";

import AlertDialogSlide from "../AlertDialoge/AlertDialogSlide";
import TestReview from '../Modals/TestReview'
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
class UpCommingRequests extends React.Component {

  //  const classes = useStyles();
  constructor(props) {




    // debugger;
    super(props);
    window.$name = this //global variable
    // let userRef =  firebase.database().ref('Users');
    // userRef.push({'name':"mohamed", 'gender': "male",
    //        'dateOfBirth': "2/8/2002"  
    //       , 'phone': '01066558895' ,
    //        'imgUrl': 'https://www.bipmedia.com/uploads/media/2015/05/Samantha-Ruthford_avatar.jpg' ,
    //        'address' : 'Alex/smoha'
    //       })
    this.getResquests = this.getResquests.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleAlertOpen = this.handleAlertOpen.bind(this)
    this.state = {
      isNew: true,
      resID: '',
      OBJ: '',
      open: false,
      openAlert: false,
      dataShowList: [],
      fullDataList: [],
      requests: [],
      tableBodyData: '',
      sampleStatus: '',

      sendObj: [],
      transferedObj: {
        userName: '',
        id: '',
        dateOfBirth: '',
        gender: '',
        phone: ''
      },

    }


  }


  componentDidMount() {
    // debugger
    this.getResquests();
  }

  componentDidUpdate(prevProps, prevState) {
    this.writeUserData();
    if (prevState !== this.state) {
      // this.writeUserData();
    }
  }

  writeUserData = () => {

    console.log('DATA SAVED');
  }


  ///****************   Changing Sample status ********************/
  debugger;

  handleStatus(obj) {
    debugger;
    // prompt(obj)
    this.state.OBJ = obj;
    // let temp = this.state.fullDataList.filter(item => item.id != obj.id);


    //  var yyy = this.state.transferedObj.userName
    //  debugger;

    // var id = obj.id;
    this.setState({ resID: obj.id })
    //  this.setState({transferedObj : obj})
    // debugger; 
    if (obj.status === "PendingForLabConfirmation") {
      let temp = this.state.fullDataList.filter(item => item[7] === obj.id)

      // setviewObj({ id: temp.id, userName: temp.name, dateOfBirth:temp.dateOfBirth ,
      //    gender:temp.gender,phone :temp.phone})

      //    var tttt =viewObj ;
      debugger;

      this.state.transferedObj.userName = temp[0][0]
      this.state.transferedObj.id = temp[0][7]
      this.state.transferedObj.dateOfBirth = temp[0][8]
      this.state.transferedObj.gender = temp[0][9]
      this.state.transferedObj.phone = temp[0][10]

      this.setState({ open: true })

    } else {
      debugger;
      this.setState({ openAlert: true })

    }

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }




  debugger;

  getResquests = () => {

    debugger;
    let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');

    ref.orderByChild("status").equalTo("PendingForLabConfirmation").on('value', snapshot => {
      this.state.dataShowList = []

      snapshot.forEach(function (item) {
        debugger;
        var obj = item.val();
        console.log(obj)
        let user;
        // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
        firebase.database().ref('/').child('Users').child(obj.userId)
          .on("value", snap => {
            debugger;
            user = snap.val();
            console.log(user)
            // this.setState({ sampleStatus: obj.status });

            this.state.sampleStatus = obj.status === "PendingForLabConfirmation" ? "View Request" : "";

            debugger
            var reqObj = [obj.id, user.name, obj.date, obj.time, obj.isFromHome, obj.testName,

            obj.status, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
            ]


            var fullObj = [user.name, obj.date, obj.time, obj.isFromHome, obj.testName,

            obj.status, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
              , obj.id, user.dateOfBirth, user.gender, user.phone
            ]
            // this.state.transferedObj.testName = 

            var unique = window.$name.state.dataShowList.filter((v, i, a) => a[i][0] === reqObj[0])
            if (unique.length == 0) {
              window.$name.state.dataShowList.push(reqObj)
            }


            this.state.fullDataList.push(fullObj);
            console.log(reqObj)

            this.forceUpdate()
          });
        // keys.push(itemVal);

        //this.state.tableBodyData = 

      }.bind(this));


      //  this.state.dataShowList = []
      debugger

      ref.orderByChild("status").equalTo("PendingForTakingTheSample").on('value', snapshot => {
        debugger;
        // this.forceUpdate();


        debugger;
        if (window.$name.state.isNew) {
          snapshot.forEach(function (item) {

            var obj = item.val();
            console.log(obj)
            let user;
            // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
            firebase.database().ref('/').child('Users').child(obj.userId)
              .on("value", snap => {
                debugger;
                user = snap.val();
                console.log(user)
                this.state.sampleStatus = obj.status === "PendingForTakingTheSample" ? "Done" : "";

                // this.setState({ sampleStatus: obj.status });

                var reqObj = [obj.id, user.name, obj.date, obj.time, obj.isFromHome, obj.testName, obj.status,
                <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
                ]



                console.log(reqObj)



                var unique = window.$name.state.dataShowList.filter((v, i, a) => a[i][0] === reqObj[0])
                if (unique.length == 0) {
                  window.$name.state.dataShowList.push(reqObj)
                }


                window.$name.forceUpdate()
              });
            // keys.push(itemVal);

            //this.state.tableBodyData = 

          }.bind(this));
        }
        // data.map((obj,index)=>{
        //    var reqObj = [obj[index].testName,obj[index].date,obj[index].time,obj[index].isFromHome]
        //    this.state.dataShowList.push(reqObj)
        //    //this.state.tableBodyData = 
        //    this.forceUpdate()

        this.state.isNew = true;

        // var unique =   window.$name.state.dataShowList.filter((v, i, a) => a.indexOf(v) === i); 
        console.log("dddddddd")
      });




    });



    this.state.isNew = true;
    console.log('DATA RETRIEVED');
  }




  handleClose = () => {

    this.setState({ open: false })

  };


  handleAlertClose = () => {

    this.setState({ openAlert: false })

  };

  handleAlertOpen = () => {

    debugger

    //  this is the branch ID  --->>>  0G9djW7SzMXGTiXKdGkiYuiTY3g1
    this.state.isNew = false
    var id = this.state.resID

    this.state.dataShowList = this.state.dataShowList.filter(item => !item.includes(id))


    var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
    ref.child(id).update({ 'status': 'PendingForResult' })

    //  this.state.sampleStatus = "PendingForResult"


    this.setState({ openAlert: false })

    // this.forceUpdate()

  };




  render() {
    debugger;

    return (
      <div>
        <AlertDialogSlide text="  Did You Take Sample From The User ?" open={this.state.openAlert} handleAlertOpen={this.handleAlertOpen} handleAlertClose={this.handleAlertClose} />

        {this.state.open ?
          <TestReview recievedObj={this.state.transferedObj} open={this.state.open} handleClose={this.handleClose}></TestReview>
          : ''}
        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Employees Stats</h4>
                <p>
                  Up Comminng Patient requests
                 </p>
              </CardHeader>
              <div  xs={12} sm={12} md={6}>>
                <CustomInput 
                  type="text"
                  // value={this.state.Employee.userName}
                  onChange={e => {
                    // this.setState({
                    //   Employee: {
                    //     ...this.state.Employee,
                    //     userName: e.target.value
                    //   }
                    // })
                  }}
                  labelText="Search"
                  id="wearch"
                  formControlProps={{
                    fullWidth: false
                  }}
                />
                {/* <CustomInput

                  style={{ color: 'white' }}
                  
                /> */}
                <Button color="white" aria-label="edit" justIcon round>
                  <Search />
                </Button>
              </div>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Test Code", "Patient Name", "  Date", " Time", "  From Home", "  Test Name", "   Sample Staus"]}
                  tableData={this.state.dataShowList.length === 0 ? [] : this.state.dataShowList}


                //["Patient Name", "Date", "Time", "FromHome", " tast mame " , "Sample Staus"]
                //tableData={ [["Patient Name", "Date", "Time","FromHome","Action"]]}
                />
              </CardBody>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    );



  }
}


export default UpCommingRequests;


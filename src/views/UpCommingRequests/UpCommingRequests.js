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

class UpCommingRequests extends React.Component {

  //  const classes = useStyles();
  constructor(props) {
    // debugger;
    super(props);
    // let userRef =  firebase.database().ref('Users');
    // userRef.push({'name':"mohamed", 'gender': "male",
    //        'dateOfBirth': "2/8/2002"  
    //       , 'phone': '01066558895' ,
    //        'imgUrl': 'https://www.bipmedia.com/uploads/media/2015/05/Samantha-Ruthford_avatar.jpg' ,
    //        'address' : 'Alex/smoha'
    //       })
    this.handleStatus = this.handleStatus.bind(this)
    this.state = {
      resID: '',
      open: false,
      openAlert: false,
      dataShowList: [],
      fullDataList: [],
      requests: [],
      tableBodyData: '',
      sampleStatus: '',

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
  // debugger;

  handleStatus(obj) {
    //debugger;
    // prompt(obj)



    this.state.transferedObj = this.state.fullDataList.filter(item => item.id != obj.id);



    var id = obj.id;
    this.setState({ resID: obj.id })
    //  this.setState({transferedObj : obj})
    // debugger; 
    if (obj.status === "PendingForLabConfirmation") {

  debugger
      this.setState({ open: true })

    } else {
      //debugger;
      this.setState({ openAlert: true })

    }

    //  change status of SampleObject to Done leave it in the same table
    // in the result pages get all  tests which have status == Done only
    // console.log(itemId)
    // var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
    // ref.child(itemId).update({'status': 'Done'}) 


    // this.setState({ sampleStatus: 'DONE' })


    // this.forceUpdate()
  }




  getResquests = () => {

    // debugger;
    let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');

    ref.orderByChild("status").equalTo("PendingForLabConfirmation").on('value', snapshot => {
      this.state.dataShowList = []

      snapshot.forEach(function (item) {
        // debugger;
        var obj = item.val();
        console.log(obj)
        let user;
        // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
        firebase.database().ref('/').child('Users').child(obj.userId)
          .on("value", snap => {
            // debugger;
            user = snap.val();
            console.log(user)
            // this.setState({ sampleStatus: obj.status });
            this.state.sampleStatus = obj.status;

            // debugger
            var reqObj = [obj.testName, obj.date, obj.time, obj.isFromHome,
            user.name, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
            ]


            var fullObj = [obj.testName, obj.date, obj.time, obj.isFromHome,
            user.name, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
              , obj.id, user.dateOfBirth, user.gender, user.phone
            ]
            // this.state.transferedObj.testName = 



            this.state.fullDataList.push(fullObj);
            console.log(reqObj)

            this.state.dataShowList.push(reqObj)
            this.forceUpdate()
          });
        // keys.push(itemVal);

        //this.state.tableBodyData = 

      }.bind(this));
      ref.orderByChild("status").equalTo("PendingForTakingTheSample").on('value', snapshot => {
        //  this.state.dataShowList = []

        snapshot.forEach(function (item) {
          // debugger;
          var obj = item.val();
          console.log(obj)
          let user;
          // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
          firebase.database().ref('/').child('Users').child(obj.userId)
            .on("value", snap => {
              // debugger;
              user = snap.val();
              console.log(user)
              this.state.sampleStatus = obj.status;
              this.setState({ sampleStatus: obj.status });
              var reqObj = [obj.testName, obj.date, obj.time, obj.isFromHome,
              user.name
                , <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
              ]



              console.log(reqObj)

              this.state.dataShowList.push(reqObj)
              this.forceUpdate()
            });
          // keys.push(itemVal);

          //this.state.tableBodyData = 

        }.bind(this));

        // data.map((obj,index)=>{
        //    var reqObj = [obj[index].testName,obj[index].date,obj[index].time,obj[index].isFromHome]
        //    this.state.dataShowList.push(reqObj)
        //    //this.state.tableBodyData = 
        //    this.forceUpdate()
        // })
      });
      // data.map((obj,index)=>{
      //    var reqObj = [obj[index].testName,obj[index].date,obj[index].time,obj[index].isFromHome]
      //    this.state.dataShowList.push(reqObj)
      //    //this.state.tableBodyData = 
      //    this.forceUpdate()
      // })
    });








    console.log('DATA RETRIEVED');
  }


  handleSubmit = (event) => {
    // debugger
    // var employeeObj = {
    //     name: 'a',
    //     address: 's'
    // }
    const { Requests } = this.state;
    // Requests.push(employeeObj);
    this.setState({ Requests });

  }

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  handleClose = () => {
    // setOpen(false);
    // this.state.open = false
    this.setState({ open: false })
  };


  handleAlertClose = () => {
    // setOpen(false);
    // this.state.open = false
    this.setState({ openAlert: false })

  };

  handleAlertOpen = () => {
    // setOpen(false);
    // this.state.open = false
    // this.setState({ openAlert: true })
    // debugger
    //  prompt(this.state.transferedObj.name)


    //  this is the branch ID  --->>>  0G9djW7SzMXGTiXKdGkiYuiTY3g1

    var id = this.state.resID
    var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
    ref.child(id).update({ 'status': 'PendingForResult' })


    this.setState({ sampleStatus: "PendingForResult" })
    this.setState({ openAlert: false })

    this.forceUpdate()

    //  change status of SampleObject to Done leave it in the same table
    // in the result pages get all  tests which have status == Done only
    // console.log(itemId)
    // var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
    // ref.child(itemId).update({'status': 'Done'}) 


    // this.setState({ sampleStatus: 'Pending For Result' })


    // this.forceUpdate()



  };




  render() {
    // debugger;

    return (
      <div>
        <AlertDialogSlide text="  Did You Take Sample From The User ?" open={this.state.openAlert} handleAlertOpen={this.handleAlertOpen} handleAlertClose={this.handleAlertClose} />

        <TestReview recievedObj={this.state.transferedObj} open={this.state.open} handleClose={this.handleClose}></TestReview>

        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Employees Stats</h4>
                <p>
                  Up Comminng Patient requests
                 </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Patient Name", "Date", "Time", "FromHome", "Sample Staus"]}
                  tableData={this.state.dataShowList.length === 0 ? [["Patient Name", "Date", "Time", "FromHome", "Sample Staus"]] : this.state.dataShowList}
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

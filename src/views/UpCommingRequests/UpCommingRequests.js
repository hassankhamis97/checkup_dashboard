import React from "react";

import GridItem from "components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";

// import firebase from 'firebase';
import firebase, { auth } from 'firebase';

// import database from '../../firebase';
import { database } from '../../firebase';


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
    super(props);
    window.$name = this //global variable
    // let userRef =  firebase.database().ref('Users');
    // userRef.push({'name':"mohamed", 'gender': "male",
    //        'dateOfBirth': "2/8/2002"  
    //       , 'phone': '01066558895' ,
    //        'imgUrl': 'https://www.bipmedia.com/uploads/media/2015/05/Samantha-Ruthford_avatar.jpg' ,
    //        'address' : 'Alex/smoha'
    //       })
    this.handleSearch = this.handleSearch.bind(this);
    this.getResquests = this.getResquests.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleAlertOpen = this.handleAlertOpen.bind(this)
    this.state = {
      isNew: true,
      isVisable: 'hidden',
      resID: '',
      OBJ: '',
      open: false,
      openAlert: false,
      dataShowList: [],
      fullDataList: [],
      temp: [],
      requests: [],
      tableBodyData: '',
      sampleStatus: '',
      searchResult: [],
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
    // 
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
    ;

  handleStatus(obj) {
    ;
    // prompt(obj)
    this.state.OBJ = obj;
    // let temp = this.state.fullDataList.filter(item => item.id != obj.id);


    //  var yyy = this.state.transferedObj.userName
    //  ;

    // var id = obj.id;
    this.setState({ resID:obj }) 
    //  this.setState({transferedObj : obj})
    //debu ; 
    if (obj.status === "PendingForLabConfirmation") {
      debugger
      let temp = this.state.fullDataList.filter(item => item[0] === obj.id)
      
        // setviewObj({ id: temp.id, userName: temp.name, dateOfBirth:temp.dateOfBirth ,
        //    gender:temp.gender,phone :temp.phone})

        //    var tttt =viewObj ;
        ;


       /////////////////////////////////////////////////////// // need to un comment code

       this.state.transferedObj = {
        testId : temp[0][0],
        name :  temp[0][1],
        dateRequest :  temp[0][2],
        timeRequest :  temp[0][3],
        dateForTakingSample :  temp[0][4],
        timeForTakingSample :  temp[0][5],
        isFromHome :  temp[0][6],
        testName :  temp[0][7],
        status :  temp[0][8],
        birthdate :  temp[0][10],
        gender :  temp[0][11],
        phone :  temp[0][12],
        roushettaPaths :  temp[0][13],
        generatedCode :  temp[0][14],
        Address :  temp[0][15],
        userId : temp[0][16], 
       }
      // this.state.transferedObj.userName = temp[0][0]
      // this.state.transferedObj.id = temp[0][7]
      // this.state.transferedObj.dateOfBirth = temp[0][8]
      // this.state.transferedObj.gender = temp[0][9]
      // this.state.transferedObj.phone = temp[0][10]

      this.setState({ open: true })

    } else {
      ;
      this.setState({ openAlert: true })

    }

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  getResquests = () => {

    let self = this
    var fromHome = ""
    var btnStatus = ""
    debugger
    var data = { labBranchFireBaseId: auth().currentUser.uid, Status: ['PendingForLabConfirmation','PendingForTakingTheSample'] };
        // 
        fetch('http://checkup.somee.com/api/AnalysisService/GetTestsBySpecificLabBranches', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                debugger
                console.log('Success:', data);
                // var responseArray = JSON.parse(data)
                data.forEach(function (item) {

                    var obj = item
                    let user;
                    firebase.database().ref('/').child('Users').child(obj.userId)
                        .on("value", snap => {
                            
                            user = snap.val();
                            console.log(user)
                            
                            // self.state.sampleStatus  = obj.status;
                            if ((obj.isFromHome)) {
                                fromHome = "Yes"
                            } else if ((!obj.isFromHome)) {


                                fromHome = "No"
                            }
                            if (obj.status == "PendingForLabConfirmation") {
                              self.state.sampleStatus = "Confirm"
                          } else {
                            self.state.sampleStatus = "Take Sample"
                          }
                          
                          obj.userId = user.id
                            var reqObj = [obj.generatedCode, user.name, obj.dateRequest, obj.timeRequest, fromHome, obj.testName,
                            <Button key={obj.id} onClick={() => self.handleStatus(obj)} color="primary" >{self.state.sampleStatus}</Button>
                            ]

                            console.log(reqObj)
                            
                            self.state.dataShowList.push(reqObj)
                            var fullObj = [obj.id,user.name, obj.dateRequest, obj.timeRequest,obj.dateForTakingSample, obj.timeForTakingSample, obj.isFromHome, obj.testName,obj.status,
                                , user.birthdate, user.gender, user.phone,obj.roushettaPaths,obj.generatedCode,obj.Address, obj.userId
                              ]
                              // this.state.transferedObj.testName = 
                  
                      //         var unique = window.$name.state.dataShowList.filter((v, i, a) => a[i][0] === reqObj[0])
                      //         if (unique.length == 0) {
                      //           window.$name.state.dataShowList.push(reqObj)
                      //         }
                  
                  
                      self.state.fullDataList.push(fullObj);
                            self.forceUpdate()
                        });


                        
                  //         console.log(reqO
              

                })    // un mute me ya 7aba

                this.state.searchResult = window.$name.state.dataShowList;

            })
            .catch((error) => {
              debugger
                console.error('Error:', error);
            });
    // let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');

    // ref.orderByChild("status").equalTo("PendingForLabConfirmation").on('value', snapshot => {
    //   this.state.dataShowList = []

    //   snapshot.forEach(function (item) {
    //     ;
    //     var obj = item.val();
    //     console.log(obj)
    //     let user;
    //     // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
    //     firebase.database().ref('/').child('Users').child(obj.userId)
    //       .on("value", snap => {
    //         ;
    //         user = snap.val();
    //         console.log(user)
    //         // this.setState({ sampleStatus: obj.status });

    //         this.state.sampleStatus = obj.status === "PendingForLabConfirmation" ? " Confirm " : "";

    //         if (obj.isFromHome === "true") {
    //           fromHome = "Yes"
    //         } else if (obj.isFromHome === "false") {
    //           fromHome = "No"
    //         }


    //         var reqObj = ["-  -  -  -  -  -  -", user.name, obj.date, obj.time, fromHome, obj.testName,

    //         <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
    //         ]


    //         var fullObj = [user.name, obj.date, obj.time, obj.isFromHome, obj.testName,

    //         obj.status, <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
    //           , obj.id, user.dateOfBirth, user.gender, user.phone
    //         ]
    //         // this.state.transferedObj.testName = 

    // //         var unique = window.$name.state.dataShowList.filter((v, i, a) => a[i][0] === reqObj[0])
    // //         if (unique.length == 0) {
    // //           window.$name.state.dataShowList.push(reqObj)
    // //         }


    //         this.state.fullDataList.push(fullObj);
    // //         console.log(reqObj)

    //         this.forceUpdate()
    //       });
    //     // keys.push(itemVal);

    //     //this.state.tableBodyData = 

    //   }.bind(this));


    //   //  this.state.dataShowList = []


    //   ref.orderByChild("status").equalTo("PendingForTakingTheSample").on('value', snapshot => {
    //     ;
    //     // this.forceUpdate();


    //     ;
    //     if (window.$name.state.isNew) {
    //       snapshot.forEach(function (item) {

    //         var obj = item.val();
    //         console.log(obj)
    //         let user;
    //         // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
    //         firebase.database().ref('/').child('Users').child(obj.userId)
    //           .on("value", snap => {
    //              ;
    //             user = snap.val();
    //             console.log(user)
    //             this.state.sampleStatus = obj.status === "PendingForTakingTheSample" ? "Take Sample" : "";
    //             // this.state.sampleStatus  = obj.status;
    //             if (obj.status === "PendingForResult") {
    //               this.state.sampleStatus = "Upload  Result"
    //             }
    //             if (obj.isFromHome === "true") {
    //               fromHome = "Yes"
    //             } else if (obj.isFromHome === "false") {
    //               fromHome = "No"
    //             }

    //             // this.setState({ sampleStatus: obj.status });
           
    //             var reqObj = [obj.generatedCode, user.name, obj.date, obj.time, fromHome, obj.testName, 
    //             <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
    //             ]



    //             console.log(reqObj)



    //             var unique = window.$name.state.dataShowList.filter((v, i, a) => a[i][0] === reqObj[0])


    //              if(unique.length > 0){

    //               window.$name.state.dataShowList.forEach(function( item , i ) {
    //                 if(item[0]===reqObj[0]){
                   
              
    //                    window.$name.state.dataShowList[i][1] = reqObj[1]
                     
    //                    console.log( window.$name.state.dataShowList[i][1])
                     
    //                 }
    //               });

    //              }

                 
    //              window.$name.forceUpdate()
    //             if (unique.length == 0) {
    //               window.$name.state.dataShowList.push(reqObj)
    //             }


    //             window.$name.forceUpdate()
    //           });
    //         // keys.push(itemVal);

    //         //this.state.tableBodyData = 

    //       }.bind(this));
    //     }
    //     // data.map((obj,index)=>{
    //     //    var reqObj = [obj[index].testName,obj[index].date,obj[index].time,obj[index].isFromHome]
    //     //    this.state.dataShowList.push(reqObj)
    //     //    //this.state.tableBodyData = 
    //     //    this.forceUpdate()

    //     this.state.isNew = true;
    //     this.state.searchResult = window.$name.state.dataShowList;
    //     // var unique =   window.$name.state.dataShowList.filter((v, i, a) => a.indexOf(v) === i); 
    //     console.log("dddddddd")
    //   });




    // });



    this.state.isNew = true;
    console.log('DATA RETRIEVED');
  }




  handleClose = () => {
    debugger
    this.setState({ open: false })

  };


  handleAlertClose = () => {
    debugger
    this.setState({ openAlert: false })

  };

  handleAlertOpen = () => {
    debugger 
    //  this is the branch ID  --->>>  0G9djW7SzMXGTiXKdGkiYuiTY3g1
    this.state.isNew = false
    
    var obj = this.state.resID

   var item = this.state.dataShowList.filter(item => !item.includes(obj.generatedCode))
   this.state.dataShowList =[]
   this.state.dataShowList = item
   
  var testObj = {
     id: obj.id, //to be dynamic
     status: "PendingForResult"
   }
   var data = testObj
   // 
   fetch('http://checkup.somee.com/api/AnalysisService/UpdateTakeSampleStatus', {
       method: 'POST', // or 'PUT'
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
   })
       .then(response => response.json())
       .then(data => {
           console.log('Success:', data);
           database.ref('/').child('Notification').child(obj.userId).set({getNotified: database.ref().push().key})

           // var responseArray = JSON.parse(data)
           this.props.handleClose();
           

       })
       .catch((error) => {
           console.error('Error:', error);
       });
    // var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
    // ref.child(obj.id).update({ 'status': 'PendingForResult' })

    //  this.state.sampleStatus = "PendingForResult"


    this.setState({ openAlert: false })

    //  this.forceUpdate()

  };


  ////************************   Search    ***************************** */

  handleSearch(te) {
    let mySet = new Set()
    window.$name.state.isVisable = 'hidden'
    console.log(te.target.value)
    //  var searchText = te.target.value
    var searchText = (te.target.value).toLowerCase();

    var search = window.$name.state.searchResult


    // let filteredcontacts = this.props.contacts.filter(contact => {
    //   return contact.name.toLocaleLowerCase().indexOf(this.state.search) !== -1;
    // });


    window.$name.state.temp = []
    window.$name.state.dataShowList = []
    ////************ Search with  Name    */
    if (search.length > 0 && searchText.length > 0) {
      
      window.$name.state.temp = this.state.searchResult.filter(item => {
        return (item[1]).toLocaleLowerCase().startsWith(searchText)
      });

      if (window.$name.state.temp.length > 0)
        window.$name.state.temp.forEach(item => mySet.add(item))
    }


    ////************ Search with  Code    */
    window.$name.state.temp = []

    if (search.length > 0 & searchText.length > 0) {

      window.$name.state.temp = this.state.searchResult.filter(item => {
        return (item[0]).toLocaleLowerCase().startsWith(searchText)
      });
      if (window.$name.state.temp.length > 0)
        window.$name.state.temp.forEach(item => mySet.add(item))
    }



    //    return (item[1]).toLocaleLowerCase().includes(searchText)
    //  for (const iterator of search) {
    //   
    //     console.log(iterator[1])
    //     if(iterator[1].toUpperCase()===searchText.toUpperCase() || iterator[0].toUpperCase()===searchText.toUpperCase() )
    //     window.$name.state.dataShowList.push(iterator)
    //   }
      
    
           
      for (let item of mySet) {
        window.$name.state.dataShowList.push(item);
    }
  



    if (window.$name.state.dataShowList.length <= 0 && searchText.length <= 0) {

      window.$name.state.dataShowList = window.$name.state.searchResult
      window.$name.state.isVisable = 'hidden'
    } else if (window.$name.state.dataShowList.length <= 0 && searchText.length > 0) {
      console.log("dsffdddddddddddddddddddd")
      window.$name.state.isVisable = 'visible'
    }
    this.forceUpdate()


  }
  debugger
  reloadPage = ()=>{
  //  window.$name.setState({open : false})
  window.$name.location.reload();
  }



  render() {
    ;

    return (
      <div>
        <AlertDialogSlide text="  Did You Take Sample From The User ?" open={this.state.openAlert} handleAlertOpen={this.handleAlertOpen} handleAlertClose={this.handleAlertClose} />

        {this.state.open ?
          <TestReview recievedObj={this.state.transferedObj} open={this.state.open} reloadPage = {this.reloadPage} handleClose={this.handleClose}></TestReview>
          : ''}
        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 style={{ textAlign: "center",fontSize: 25  ,fontFamily: 'Josefin Sans'  }}> Requests Status</h4>
                <p style={{ textAlign: "center" ,fontSize: 20  ,fontFamily: 'Josefin Sans' }}>
                  UpComming Patient Requests
                 </p>
              </CardHeader>
              <div style={{ textAlign: "center" }}>
                <CustomInput
                  type="text"
                  // value={this.state.Employee.userName}
                  onChange={
                    this.handleSearch
                    // this.setState({
                    //   Employee: {
                    //     ...this.state.Employee,
                    //     userName: e.target.value
                    //   }
                    // })
                  }
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
          <GridItem >  <h4 style={{ textAlign: "center", visibility: window.$name.state.isVisable, color: "purple" }}> There  Is  No  Data  Found   Tri   Again </h4></GridItem>

        </GridContainer>
      </div>
    );



  }
}


export default UpCommingRequests;


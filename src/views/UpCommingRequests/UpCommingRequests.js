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




    // ;
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
    this.setState({ resID: obj.id })
    //  this.setState({transferedObj : obj})
    // ; 
    if (obj.status === "PendingForLabConfirmation") {
      let temp = this.state.fullDataList.filter(item => item[7] === obj.id)

        // setviewObj({ id: temp.id, userName: temp.name, dateOfBirth:temp.dateOfBirth ,
        //    gender:temp.gender,phone :temp.phone})

        //    var tttt =viewObj ;
        ;

      this.state.transferedObj.userName = temp[0][0]
      this.state.transferedObj.id = temp[0][7]
      this.state.transferedObj.dateOfBirth = temp[0][8]
      this.state.transferedObj.gender = temp[0][9]
      this.state.transferedObj.phone = temp[0][10]

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
debugger;
    var fromHome = ""
    var btnStatus = ""
    let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');

    ref.orderByChild("status").equalTo("PendingForLabConfirmation").on('value', snapshot => {
      this.state.dataShowList = []

      snapshot.forEach(function (item) {
        ;
        var obj = item.val();
        console.log(obj)
        let user;
        // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
        firebase.database().ref('/').child('Users').child(obj.userId)
          .on("value", snap => {
            debugger;;
            user = snap.val();
            console.log(user)
            // this.setState({ sampleStatus: obj.status });

            this.state.sampleStatus = obj.status === "PendingForLabConfirmation" ? " Pending " : "";

            if (obj.isFromHome === "true") {
              fromHome = "Yes"
            } else if (obj.isFromHome === "false") {
              fromHome = "No"
            }


            var reqObj = ["-  -  -  -  -  -  -", user.name, obj.date, obj.time, fromHome, obj.testName,

            <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
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


      ref.orderByChild("status").equalTo("PendingForTakingTheSample").on('value', snapshot => {
        ;
        // this.forceUpdate();


        debugger;;
        if (window.$name.state.isNew) {
          snapshot.forEach(function (item) {

            var obj = item.val();
            console.log(obj)
            let user;
            // firebase.database().ref('/').child('Users').child('-M5sNybXk09dmQ6gx443')
            firebase.database().ref('/').child('Users').child(obj.userId)
              .on("value", snap => {
                debugger ;
                user = snap.val();
                console.log(user)
                this.state.sampleStatus = obj.status === "PendingForTakingTheSample" ? "Waiting   Sample" : "";
                // this.state.sampleStatus  = obj.status;
                if (obj.status === "PendingForResult") {
                  this.state.sampleStatus = "Upload  Result"
                }
                if (obj.isFromHome === "true") {
                  fromHome = "Yes"
                } else if (obj.isFromHome === "false") {
                  fromHome = "No"
                }

                // this.setState({ sampleStatus: obj.status });
           
                var reqObj = [obj.generatedCode, user.name, obj.date, obj.time, fromHome, obj.testName, 
                <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
                ]



                console.log(reqObj)



                var unique = window.$name.state.dataShowList.filter((v, i, a) => a[i][0] === reqObj[0])


                 if(unique.length > 0){

                  window.$name.state.dataShowList.forEach(function( item , i ) {
                    if(item[0]===reqObj[0]){
                      console.log(item[1])
                       item[1]=reqObj[1]
                       console.log( item[1])
                       window.$name.state.dataShowList[i][1] = reqObj[1]
                       console.log( item)
                       console.log( window.$name.state.dataShowList[i][1])
                       console.log("*************")
                    }
                  });

                 }

                 
                 window.$name.forceUpdate()
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
        this.state.searchResult = window.$name.state.dataShowList;
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

  render() {
    ;

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


import React from "react";


import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import firebase from 'firebase';
import AlertDialogSlide from "../AlertDialoge/AlertDialogSlide";
import SendResult from "views/Modals/SendResult/SendResult.js";


import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};


class MainTestResults extends React.Component {



    constructor(props) {

        super(props);
        window.self = this
        this.state = {
            isVisable : 'hidden',
            openAlert: false,
            searchResult :[],
            dataShowList: [],
            temp : [] ,
            requests: [],
            tableBodyData: '',
            sampleStatus: '',
            objId: '',

        }
        this.setState({ ...this.state.dataShowList })

    }


    componentDidMount() {
        // debugger

        this.getResquests();
    }

    //   componentWillUpdate(prevProps, prevState) {
    //     this.setState({...this.state.dataShowList})
    //   }


    writeUserData = () => {

        console.log('DATA SAVED');
    }


    debugger;

    handleStatus(obj) {

        // prompt(obj.id)


        this.setState({ objId: obj.id })

        this.setState({ openAlert: true })

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

        ref.orderByChild("status").equalTo("PendingForResult").on('value', snapshot => {
            this.state.dataShowList = []

            snapshot.forEach(function (item) {
                debugger;
                var obj = item.val();
                console.log(obj)
                let user;
                firebase.database().ref('/').child('Users').child(obj.userId)
                    .on("value", snap => {
                        debugger;
                        user = snap.val();
                        console.log(user)

                        this.state.sampleStatus = obj.status;

                        debugger
                        var reqObj = [obj.id ,user.name, obj.date, obj.time, obj.isFromHome, obj.testName,
                        <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
                        ]

                        console.log(reqObj)

                        this.state.dataShowList.push(reqObj)
                        this.forceUpdate()
                    });


            }.bind(this));
            window.self.state.searchResult =  this.state.dataShowList ;

        });


    }

    ///****************************************************************************** */

    handleClose = () => {
        // setOpen(false);
        // this.state.open = false
        this.setState({ openAlert: false })

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
        debugger
        //  prompt("ffsfsfsfsf")
        this.setState({ openAlert: true })

        //  change status of SampleObject to Done leave it in the same table
        // in the result pages get all  tests which have status == Done only
        // console.log(itemId)



        // var ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');
        // ref.child(this.state.objId).update({ 'status': 'Done' })


        // this.setState({ sampleStatus: 'Done' })
        // this.setState({ openAlert: false })

        // this.forceUpdate()



    };




////************************   Search    ***************************** */
 
handleSearch(te){
    console.log(te.target.value)
    window.self.state.isVisable='hidden'

    // var searchText = te.target.value
 debugger ;
 
 var searchText = (te.target.value).toLowerCase();
debugger ;
var search  = window.self.state.searchResult


// let filteredcontacts = this.props.contacts.filter(contact => {
//   return contact.name.toLocaleLowerCase().indexOf(this.state.search) !== -1;
// });



window.self.state.temp= []
window.self.state.dataShowList= []
   ////************ Search with  Name    */
if(search.length>0){ 

    window.self.state.temp  =  window.self.state.searchResult.filter(item =>{
     return (item[1]).toLocaleLowerCase().startsWith(searchText)
  });

 }
 window.self.state.temp.forEach(item => window.self.state.dataShowList.push(item))

       ////************ Search with  Code    */

 if(search.length>0){ 

    window.self.state.temp  =  window.self.state.searchResult.filter(item =>{
     return (item[0]).toLocaleLowerCase().startsWith(searchText)
  });

 }
 window.self.state.temp.forEach(item =>window.self.state.dataShowList.push(item))


//   for (const iterator of search) {
//    debugger ;
//      console.log(iterator[1])
//      if(iterator[1].toUpperCase()===searchText.toUpperCase() || iterator[0].toUpperCase()===searchText.toUpperCase() )
//      window.self.state.dataShowList.push(iterator)
//    }
   
 

   debugger ;
   if(  window.self.state.dataShowList.length<=0 && searchText.length<=0){
     debugger ;
     window.self.state.isVisable='hidden'

     window.self.state.dataShowList =  window.self.state.searchResult
     }else if(  window.self.state.dataShowList.length<=0 && searchText.length>0){
       console.log("dsffdddddddddddddddddddd")
       window.self.state.isVisable='visible'

     }
     window.self.forceUpdate()
   
 
 
 }





    render() {
        debugger;

        return (
            <div>
                {/* <AlertDialogSlide text="  Did you want to send Result to the Patient ?" open={this.state.openAlert} handleAlertOpen={this.handleAlertOpen}  handleAlertClose={this.handleAlertClose}  /> */}
                {this.state.openAlert ?
                    <SendResult testId={this.state.objId} open={this.state.openAlert} handleClose={this.handleAlertClose}></SendResult>
                    : ''
                }
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4>Sample Results</h4>
                                <p>
                                    Shoo  The Pending  Resluts
                                </p>
                            </CardHeader>
                                
                                <CardBody>
                                <div>


                                    
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
                                </CardBody>


                            <CardBody>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHeaderColor="primary"
                                    tableHead={[ "Test Code" , "Patient Name", "  Date", " Time", "  From Home", "  Test Name"  ,"   Sample Staus"]}
                                    tableData={this.state.dataShowList.length === 0 ? [] : this.state.dataShowList}
                                
                                />
                              
                            </CardBody>
                            
                           
                        </Card>
                    </GridItem>
                  <GridItem > <h4 style={{textAlign : "center" , visibility: window.self.state.isVisable , color : "purple"}}> There  Is  No  Data  Found   Tri   Again </h4>  </GridItem> 
                </GridContainer>
            </div>

        )
    }
}

export default MainTestResults;
import React from "react";


import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import firebase, { auth } from 'firebase';
import AlertDialogSlide from "../AlertDialoge/AlertDialogSlide";
import SendResult from "views/Modals/SendResult/SendResult.js";
import Authentication from 'Authentication';


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
            isVisable: 'hidden',
            openAlert: false,
            searchResult: [],
            dataShowList: [],
            temp: [],
            requests: [],
            tableBodyData: '',
            sampleStatus: '',
            objId: '',

        }
        this.setState({ ...this.state.dataShowList })

    }


    componentDidMount() {
        // 

        this.getResquests();
    }

    //   componentWillUpdate(prevProps, prevState) {
    //     this.setState({...this.state.dataShowList})
    //   }


    writeUserData = () => {

        console.log('DATA SAVED');
    }


        ;

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
        let self = this
        // ;
        var fromHome = ""
        var btnStatus = ""
        
        var data = { labBranchFireBaseId: auth().currentUser.uid, Status: ['PendingForResult'] };
        // 
        fetch(Authentication.API_URL+'/api/AnalysisService/GetTestsBySpecificLabBranches', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                
                console.log('Success:', data);
                // var responseArray = JSON.parse(data)
                data.forEach(function (item) {

                    var obj = item
                    let user;
                    firebase.database().ref('/').child('Users').child(obj.userId)
                        .on("value", snap => {
                            debugger
                            user = snap.val();
                            console.log(user)

                            // this.state.sampleStatus  = obj.status;
                            if (obj.status === "PendingForResult") {
                                self.state.sampleStatus = "Upload  Result"
                            }
                            if ((obj.isFromHome)) {
                                fromHome = "Yes"
                            } else if ((!obj.isFromHome)) {
                                fromHome = "No"
                            }


                            var reqObj = [obj.generatedCode, user.name, obj.dateRequest, obj.timeRequest, fromHome, obj.testName,
                            <Button key={obj.id} onClick={() => self.handleStatus(obj)} color="primary" >{self.state.sampleStatus}</Button>
                            ]

                            console.log(reqObj)

                            self.state.dataShowList.push(reqObj)
                            self.forceUpdate()
                        });
                })
                            window.self.state.searchResult = this.state.dataShowList;

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://checkup.somee.com/api/AnalysisService/GetTestsBySpecificLabBranches',true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        // // xhr.setRequestHeader('Origin','http://checkup.somee.com');
        // var data = {labBranchFireBaseId :'IaTcOwrdXhVBa7qx40FOkW5b94J3',Status : ['PendingForResult']};
        // xhr.send(JSON.stringify(data));
        // xhr.onreadystatechange = function() {
        //    

        //    var responseArray = JSON.parse(xhr.response)
        //    responseArray.forEach(function (item) {

        //    var obj = item
        //    let user;
        //    firebase.database().ref('/').child('Users').child(obj.userId)
        //                .on("value", snap => {
        //                    ;
        //                    user = snap.val();
        //                    console.log(user)

        //                    // this.state.sampleStatus  = obj.status;
        //                    if (obj.status ==="PendingForResult") {
        //                     self.state.sampleStatus = "Upload  Result"
        //                    }
        //                    if ((obj.isFromHome)) {
        //                        fromHome = "Yes"
        //                    } else if ((!obj.isFromHome)) {
        //                        fromHome = "No"
        //                    }           


        //                    var reqObj = [obj.generatedCode, user.name, obj.dateRequest, obj.timeRequest, fromHome, obj.testName,
        //                    <Button key={obj.id} onClick={() => self.handleStatus(obj)} color="primary" >{self.state.sampleStatus}</Button>
        //                    ]

        //                    console.log(reqObj)

        //                    self.state.dataShowList.push(reqObj)
        //                    self.forceUpdate()
        //                });
        //             })
        // //    console.log(x)
        // //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // //         // Request finished. Do processing here.
        // //         var response = this.responseText;
        // //     }
        // };



        // let ref = firebase.database().ref('/').child('Tests').child('0G9djW7SzMXGTiXKdGkiYuiTY3g1');

        // ref.orderByChild("status").equalTo("PendingForResult").on('value', snapshot => {
        //     this.state.dataShowList = []
        //     
        //     snapshot.forEach(function (item) {
        //         
        //         var obj = item.val();
        //         console.log(obj)
        //         let user;
        //         firebase.database().ref('/').child('Users').child(obj.userId)
        //             .on("value", snap => {
        //                 ;
        //                 user = snap.val();
        //                 console.log(user)

        //                 // this.state.sampleStatus  = obj.status;
        //                 if (obj.status ==="PendingForResult") {
        //                     this.state.sampleStatus = "Upload  Result"
        //                 }
        //                 if ((obj.isFromHome ==="true")) {
        //                     fromHome = "Yes"
        //                 } else if ((obj.isFromHome === "false")) {
        //                     fromHome = "No"
        //                 }           


        //                 var reqObj = [obj.generatedCode, user.name, obj.date, obj.time, fromHome, obj.testName,
        //                 <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
        //                 ]

        //                 console.log(reqObj)

        //                 this.state.dataShowList.push(reqObj)
        //                 this.forceUpdate()
        //             });


        //     }.bind(this));
        //     window.self.state.searchResult = this.state.dataShowList;

        // });


    }

    ///****************************************************************************** */

    handleClose = () => {
        // setOpen(false);
        // this.state.open = false
        this.setState({ openAlert: false })

    };


    handleAlertClose = () => {
        // setOpen(false);
         this.state.open = false
        this.setState({ openAlert: false })

    };

    handleAlertOpen = () => {
        // setOpen(false);
        // this.state.open = false
        // this.setState({ openAlert: true })

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

    handleSearch(te) {
        console.log(te.target.value)
        window.self.state.isVisable = 'hidden'

        // var searchText = te.target.value

        
        var searchText = (te.target.value).toLowerCase();

        var search = window.self.state.searchResult


        // let filteredcontacts = this.props.contacts.filter(contact => {
        //   return contact.name.toLocaleLowerCase().indexOf(this.state.search) !== -1;
        // });

        let mySet = new Set()

        window.self.state.temp = []
        window.self.state.dataShowList = []
        ////************ Search with  Name    */
        if (search.length > 0 && searchText.length > 0) {

            window.self.state.temp = window.self.state.searchResult.filter(item => {
                return (item[1]).toLocaleLowerCase().startsWith(searchText)
            });

        }
        window.self.state.temp.forEach(item => mySet.add(item))

        ////************ Search with  Code    */

        if (search.length > 0 && searchText.length > 0) {

            window.self.state.temp = window.self.state.searchResult.filter(item => {
                return (item[0]).toLocaleLowerCase().startsWith(searchText)
            });

        }
        window.self.state.temp.forEach(item => mySet.add(item))


        for (let item of mySet) {
            window.self.state.dataShowList.push(item);
        }

        //   for (const iterator of search) {
        //    
        //      console.log(iterator[1])
        //      if(iterator[1].toUpperCase()===searchText.toUpperCase() || iterator[0].toUpperCase()===searchText.toUpperCase() )
        //      window.self.state.dataShowList.push(iterator)
        //    }
        // var unique = window.self.state.dataShowList.filter((v, i, a) => a[i][0] === "a")
        //     if (unique.length == 0) {
        //     //   window.$name.state.dataShowList.push(reqObj)
        //     }




        if (window.self.state.dataShowList.length <= 0 && searchText.length <= 0) {

            window.self.state.isVisable = 'hidden'

            window.self.state.dataShowList = window.self.state.searchResult
        } else if (window.self.state.dataShowList.length <= 0 && searchText.length > 0) {
            console.log("dsffdddddddddddddddddddd")
            window.self.state.isVisable = 'visible'

        }
        window.self.forceUpdate()



    }





    render() {
        ;

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
                                <h4 style={{ textAlign: "center",fontSize: 25  ,fontFamily: 'Josefin Sans'  }}>Sample Results</h4>
                                <p style={{ textAlign: "center",fontSize: 20  ,fontFamily: 'Josefin Sans'  }} >
                                   Show  Pending  Results
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
                                        <Search  style={{ textAlign: "center"  }}/>
                                    </Button>
                                </div>
                            </CardBody>


                            <CardBody>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHeaderColor="primary"
                                    tableHead={["Test Code", "Patient Name", "  Date", " Time", "  From Home", "  Test Name", "   Sample Staus"]}
                                    tableData={this.state.dataShowList.length === 0 ? [] : this.state.dataShowList}

                                />

                            </CardBody>


                        </Card>
                    </GridItem>
                    <GridItem >  <h4 style={{ textAlign: "center", visibility: window.self.state.isVisable, color: "purple" }}> There  Is  No  Data  Found   Try   Again </h4></GridItem>
                </GridContainer>
            </div>

        )
    }
}

export default MainTestResults;
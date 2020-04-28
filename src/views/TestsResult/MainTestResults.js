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

        this.state = {
            openAlert: false,

            dataShowList: [],
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
                        var reqObj = [obj.testName, obj.date, obj.time, obj.isFromHome, user.name,
                        <Button key={obj.id} onClick={() => this.handleStatus(obj)} color="primary" >{this.state.sampleStatus}</Button>
                        ]

                        console.log(reqObj)

                        this.state.dataShowList.push(reqObj)
                        this.forceUpdate()
                    });


            }.bind(this));

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
                                <Table
                                    tableHeaderColor="primary"
                                    tableHeaderColor="primary"
                                    tableHead={["Patient Name", "Date", "Time", "FromHome", "Sample Staus"]}
                                    tableData={this.state.dataShowList.length === 0 ? [["Patient Name", "Date", "Time", "FromHome", "Sample Staus"]] : this.state.dataShowList}

                                />
                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
            </div>

        )
    }
}

export default MainTestResults;
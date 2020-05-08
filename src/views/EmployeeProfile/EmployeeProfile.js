import React from "react";
import GridContainer from "components/Grid/GridContainer.js";

import EmployeeList from "./EmployeeList"
import EmployeeProfileView from "./EmployeeProfileView";
import CreateEmployeeDesign from "views/CreateNewEmployee/CreateEmployeeDesign";
import Snackbar from "components/Snackbar/Snackbar.js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ConfirmMessage from "views/Modals/ConfirmMessage";
export default function EmployeeProfile() {
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     senderEmpObj: null
  //   }
  // }
  const [senderEmpObj, setSenderEmpObj] = React.useState(null)
  const [phoneStr, setPhoneStr] = React.useState(null)
  const [isEdit, setIsEdit] = React.useState(false)
  const [tc, setTC] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState(false);
  const [alertConfig, setAlertConfig] = React.useState(null);
  const [employeeProfileViewReference, setEmployeeProfileViewReference] = React.useState(null);
  const handleViewProfile = (element, phoneStr) => {
    
    setSenderEmpObj(element);
    setPhoneStr(phoneStr);
    // this.props.handleViewProfile(element)
  }
  const updateEmployee = (status) => {
    setIsEdit(status)
  }
  const showNotification = msg => {
    setSenderEmpObj(null)

    setAlertMsg(msg)
    setTC(true);
    setTimeout(function() {
      setTC(false);
    }, 6000);
    
  };
  const updateAlertConfig = (alertConfig) => {
    // 
    // setSenderEmpObj(null)
    setAlertConfig({alertConfig: alertConfig})
    
  }
  const handleConfirm = (status) => {
    if(status === 'deleteEmployee'){
      setSenderEmpObj(null)
    }
    employeeProfileViewReference.handleConfirm(status)
  }
  const handleSetEmployeeProfileViewReference = (ref) => {
    
    setEmployeeProfileViewReference(ref)
  }
  const handleClose = ()=> {
    setAlertConfig(null)
  }
  // handleViewProfile = (element) =>{
  //   
  //   //  var obj = this.state.employeeList[index]
  //    this.setState({senderEmpObj: element});     
  //   this.props.handleViewProfile(element)

  //   //  this.context.router.push('/my-route')
  // }
  return (
    <div>
      <Snackbar
                  place="tc"
                  color={alertMsg=="Employee updated successfully" ? "success":"danger"}
                  icon={alertMsg=="Employee updated successfully" ? CheckCircleIcon:CancelIcon}
                  message={alertMsg}
                  open={tc}
                  closeNotification={() => setTC(false)}
                  close
                />
        {alertConfig?<ConfirmMessage handleClose={handleClose} alertConfig={alertConfig} handleConfirm={handleConfirm}></ConfirmMessage> : '' }
  
    <GridContainer style={{ marginTop: "120px" }}>
      {isEdit ?
        <CreateEmployeeDesign  showNotification={showNotification} senderEmpObj={senderEmpObj} updateEmployee={updateEmployee}></CreateEmployeeDesign>
        :
        <EmployeeList handleViewProfile={handleViewProfile}></EmployeeList>
      }
      {senderEmpObj != null ?
        <EmployeeProfileView handleSetEmployeeProfileViewReference={handleSetEmployeeProfileViewReference} updateAlertConfig={updateAlertConfig} senderEmpObj={senderEmpObj} phoneStr={phoneStr} updateEmployee={updateEmployee}></EmployeeProfileView>
        :
        ''
      }
    </GridContainer>
    </div>
  );
}

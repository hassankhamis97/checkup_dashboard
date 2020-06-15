import React from "react";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
// @material-ui/core components
import CreateEmployeeDesign from "views/CreateNewEmployee/CreateEmployeeDesign"
// const styles = {
//     cardCategoryWhite: {
//         color: "rgba(255,255,255,.62)",
//         margin: "0",
//         fontSize: "14px",
//         marginTop: "0",
//         marginBottom: "0"
//     },
//     cardTitleWhite: {
//         color: "#FFFFFF",
//         marginTop: "0px",
//         minHeight: "auto",
//         fontWeight: "300",
//         fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//         marginBottom: "3px",
//         textDecoration: "none"
//     }
// };

// const useStyles = makeStyles(styles);

export default function CreateNewEmployee() {
  const [tc, setTC] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState(false);
        React.useEffect(() => {
            // Specify how to clean up after this effect:
            return function cleanup() {
              // to stop the warning of calling setState of unmounted component
              var id = window.setTimeout(null, 0);
              while (id--) {
                window.clearTimeout(id);
              }
            };
          });
          const showNotification = msg => {
            setAlertMsg(msg)
            setTC(true);
            setTimeout(function() {
              setTC(false);
            }, 6000);
            
          };
        

    return (
        <div>
        <Snackbar
                  place="tc"
                  color={alertMsg=="Technician saved successfully" ? "success":"danger"}
                  icon={alertMsg=="Technician saved successfully" ? CheckCircleIcon:CancelIcon}
                  message={alertMsg}
                  open={tc}
                  closeNotification={() => setTC(false)}
                  close
                />
        <CreateEmployeeDesign showNotification={showNotification}></CreateEmployeeDesign>
        </div>
    );
}

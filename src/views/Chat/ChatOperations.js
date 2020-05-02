import { firestore, storage } from '../../firebase';
import { AppString } from './Const'
import Authentication from 'Authentication';
export default class ChatOperations {
    getUnReadTotalMessages(response) {
        debugger

        firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).onSnapshot(function (pearedUsersMessages) {
            // Document was found in the cache. If no cached document exists,
            // an error will be returned to the 'catch' block below.
            var totalNoOfUnReadMessage = 0
            console.log(pearedUsersMessages)
            for (let i = 0; i < pearedUsersMessages.docs.length; i++) {
                totalNoOfUnReadMessage += pearedUsersMessages.docs[i].data().noOfUnReadMessage
                // var pearedUsersMessages = await firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).get()
                // console.log(pearedUsersMessages[i])
            }
            response(totalNoOfUnReadMessage)
        })

        // var noOfRM = pearObj.data().noOfUnReadMessage
    }
    // getUnReadMessagesForSpecificPearedPerson(response,pearedPersonId){
    //     firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).doc(pearedPersonId).onSnapshot(function (pearedUsersMessages) {

    // }
    clearCurrentViewedPerson(isFromRoute) {
        debugger
        if (isFromRoute || window.location.href === "http://localhost:3000/admin/chat") {
            var senderChatStatus = {
                currentViewedPerson: ""
            }

            firestore
                .collection(AppString.NODE_USERCHAT)
                .doc(Authentication.loggedUser.uid)
                .set(senderChatStatus)
                .then(() => {
                    
                })
                .catch(err => {
                    
                    // this.props.showToast(0, err.toString())
                })
        }
    }
}
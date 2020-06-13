import firebase from 'firebase';
// import database from './firebase';
// import {storage} from '../src/firebase';
import { firestore, storage } from './firebase';
import { AppString } from '../src/views/Chat/Const'
export default class Authentication {
    static loggedUser = "wait";
    static currentUserImage = ''
    static API_URL = 'http://www.checkuplive.somee.com'
    // static API_URL = 'http://192.168.1.5:3000'
    constructor() {
        
        Authentication.loggedUser = firebase.auth().currentUser == null ? "wait" : firebase.auth().currentUser
        // firebase.auth().signOut().then(function() {
        //     Authentication.userId = firebase.auth().currentUser
        //   }).catch(function(error) {
        //     // An error happened.
        //   });
        // this.getUser()
          
    }
    checkUser(email, password,errorBack) {
        let self = this
        const auth = firebase.auth()
        auth.signInWithEmailAndPassword(email, password)
            .then(function (response) {
                console.log(response)
                debugger
                firestore.collection(AppString.NODE_USERS).doc(response.user.uid).get().then(result => {
                    debugger
                    console.log(result)
                    var user = result.data()
                    
                    if (user.type != 3) {
                        firebase.auth().signOut().then(function() {
                            
                            // respose()
                          }).catch(function(error) {
                            // An error happened.
                          });
                    }
                    else{
                        self.getUser()
                    }
                    // self.forceUpdate();
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    errorBack('Wrong password.');
                    // alert('Wrong password.');
                } else {
                    errorBack(errorMessage);
                    // alert(errorMessage);
                }
                console.log(error);
            });
            
        // auth.onAuthStateChanged(firebaseUser => {
        //     console.log(firebaseUser)
        //     console.log(firebase.auth().currentUser)

        // })
        console.log(firebase.auth().currentUser)
        // return 0
    }

    getUser(response){
        let self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // console.log(firebase.auth().currentUser)
                Authentication.loggedUser = user
                
                if(response){
                    
                    // firebase.auth().verifyIdToken(user.uid).then((claims) => {
                    //     if (claims.admin === true) {
                    //         
                    //     }
                    //   });
                    response()
                }
                // else{
                //     firebase.auth().setCustomUserClaims(user.uid, {admin: true}).then(() => {
                //         // The new custom claims will propagate to the user's ID token the
                //         // next time a new one is issued.
                //       });
                // }
            } else {
                Authentication.loggedUser = null
                if(response) response()
            }
          });
    }
    logout(respose){
        firebase.auth().signOut().then(function() {
            respose()
          }).catch(function(error) {
            // An error happened.
          });
    }
    getImage (self,image,respose) {
        
        storage.ref().child(image).getDownloadURL().then((url) => {
            respose(url,self)
            Authentication.currentUserImage = url
        //   state[image] = url
        //   this.setState(state)
        }).catch((error) => {
            console.log(error)
          // Handle any errors
        })
      }
      getNoOfNewUpcomingRequests(response) {
        var starCountRef = firebase.database().ref('/').child('Notification').child(Authentication.loggedUser.uid)
        starCountRef.on('value', function(snapshot) {
            // updateStarCount(postElement, snapshot.val());
            fetch(Authentication.API_URL+'/api/AnalysisService/GetNewRequestNotification?branchId=' + Authentication.loggedUser.uid, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    debugger
                    var count = data;
                    response(count)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
        
        // firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).onSnapshot(function (pearedUsersMessages) {
        //     // Document was found in the cache. If no cached document exists,
        //     // an error will be returned to the 'catch' block below.
        //     var totalNoOfUnReadMessage = 0
        //     console.log(pearedUsersMessages)
        //     for (let i = 0; i < pearedUsersMessages.docs.length; i++) {
        //         totalNoOfUnReadMessage += pearedUsersMessages.docs[i].data().noOfUnReadMessage
        //         // var pearedUsersMessages = await firestore.collection(AppString.NODE_USERCHAT).doc(Authentication.loggedUser.uid).collection(Authentication.loggedUser.uid).get()
        //         // console.log(pearedUsersMessages[i])
        //     }
        //     response(totalNoOfUnReadMessage)
        // })

        // var noOfRM = pearObj.data().noOfUnReadMessage
    }
}
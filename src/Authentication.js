import firebase from 'firebase';
import database from './firebase';

export default class Authentication {
    static loggedUser = null;
    constructor() {
        debugger
        Authentication.loggedUser = firebase.auth().currentUser
        // firebase.auth().signOut().then(function() {
        //     Authentication.userId = firebase.auth().currentUser
        //   }).catch(function(error) {
        //     // An error happened.
        //   });
        // this.getUser()
          
    }
    checkUser(email, password,errorBack) {
        debugger
        const auth = firebase.auth()
        auth.signInWithEmailAndPassword(email, password)
            .then(function (response) {
                console.log(response)
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
            this.getUser()
        // auth.onAuthStateChanged(firebaseUser => {
        //     console.log(firebaseUser)
        //     console.log(firebase.auth().currentUser)

        // })
        console.log(firebase.auth().currentUser)
        // return 0
    }

    getUser(response){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // console.log(firebase.auth().currentUser)
                Authentication.loggedUser = user
                if(response)
                    response()
            } else {
                Authentication.loggedUser = null
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
}
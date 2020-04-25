import firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage'
var config = {
    apiKey: "AIzaSyDRGCeI7Um-ZgtDBwx8J9Z5Lf_v-4-nCY0",
    authDomain: "checkup-23ffe.firebaseapp.com",
    databaseURL: "https://checkup-23ffe.firebaseio.com",
    projectId: "checkup-23ffe",
    storageBucket: "checkup-23ffe.appspot.com",
    messagingSenderId: "734287541282",
    appId: "1:734287541282:web:921014a84dca664176867b",
    measurementId: "G-XZF8FBBK4Y"
}
// Initialize Firebase
firebase.initializeApp(config);
//analytics is optional for this tutoral 
firebase.analytics();
debugger
const storage = firebase.storage()
const database = firebase.database()
// export default database
// export default storage
export  {
    storage, database as default
  }
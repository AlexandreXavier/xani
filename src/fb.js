import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe-YZ1YCksoIbxofTwA0Og5R3Ec75CkVI",
    authDomain: "vuetify-firebase-fb9f0.firebaseapp.com",
    databaseURL: "https://vuetify-firebase-fb9f0.firebaseio.com",
    projectId: "vuetify-firebase-fb9f0",
    storageBucket: "vuetify-firebase-fb9f0.appspot.com",
    messagingSenderId: "1065454917532",
    appId: "1:1065454917532:web:2d0aee8f3649d92305da59"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;

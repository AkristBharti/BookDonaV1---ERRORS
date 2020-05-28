import * as firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAU501N17Lo_nw_YBSV3MXpIiCr8KqzvEU",
    authDomain: "bookdona.firebaseapp.com",
    databaseURL: "https://bookdona.firebaseio.com",
    projectId: "bookdona",
    storageBucket: "bookdona.appspot.com",
    messagingSenderId: "1088858171584",
    appId: "1:1088858171584:web:eb24f41754b741f457e525",
    measurementId: "G-KV6BL8V81P"
  };
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
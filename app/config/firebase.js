import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC4zq49qPiFSmAjNmOSmsMvAdp5s5GLcjo",
  authDomain: "ngangkot-e258e.firebaseapp.com",
  databaseURL: "https://ngangkot-e258e.firebaseio.com",
  projectId: "ngangkot-e258e",
  storageBucket: "ngangkot-e258e.appspot.com",
  messagingSenderId: "430950127435"
};

firebase.initializeApp(config);
export default firebase;
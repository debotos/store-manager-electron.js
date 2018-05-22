import * as firebase from 'firebase';
// Initialize Firebase
// I am uploading this secret config file to github
// Don't misuse it
var config = {
  apiKey: 'AIzaSyDsmxbMNk-Mir5hNH0Zr0nYs90ZU3Kq5GQ',
  authDomain: 'store-management-deb.firebaseapp.com',
  databaseURL: 'https://store-management-deb.firebaseio.com',
  projectId: 'store-management-deb',
  storageBucket: 'store-management-deb.appspot.com',
  messagingSenderId: '546219312878'
};
firebase.initializeApp(config);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

export { googleAuthProvider, firebase, database as default };

//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//import dotenv from "dotenv";

console.log(process.env.VUE_APP_APIKEY);
// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: "",
  databaseURL: "",
  projectId: "vue-app-5095b",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
// const settings = {
//   timestampsInSnapshots: true
// };
// db.settings(settings);
db.settings({});

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};

// It looks like you're using the development build of the Firebase JS SDK.
// When deploying Firebase apps to production, it is advisable to only import
// the individual SDK components you intend to use.

// For the module builds, these are available in the following manner
// (replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

// CommonJS Modules:
// const firebase = require('firebase/app');
// require('firebase/<PACKAGE>');

// ES Modules:
// import firebase from 'firebase/app';
// import 'firebase/<PACKAGE>';

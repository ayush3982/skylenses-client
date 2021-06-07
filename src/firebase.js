import firebase from "firebase/app"
import "firebase/auth"

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQtvIQ27di97wOYB6Mq5YPsTR6i5gGxIY",
  authDomain: "skylenses-auth.firebaseapp.com",
  projectId: "skylenses-auth",
  storageBucket: "skylenses-auth.appspot.com",
  messagingSenderId: "708926395574",
  appId: "1:708926395574:web:a4ca5176f8b67dba910217"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
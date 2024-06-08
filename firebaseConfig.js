// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQKRM4YAygiOaZv-18qL9M8sU-MBTrldQ",
  authDomain: "fir-wheats-8c507.firebaseapp.com",
  projectId: "fir-wheats-8c507",
  storageBucket: "fir-wheats-8c507.appspot.com",
  messagingSenderId: "939205124826",
  appId: "1:939205124826:web:5eb441cbe1010a63237be3",
  measurementId: "G-HQBWL5GPQ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBs6Df1aO2Wj5nsQSMnZTWgcLeMfnoywyI",
  authDomain: "project-sia-e7c63.firebaseapp.com",
  projectId: "project-sia-e7c63",
  storageBucket: "project-sia-e7c63.firebasestorage.app",
  messagingSenderId: "290301975412",
  appId: "1:290301975412:web:ddbb0e89d4653519146a21",
  measurementId: "G-S6FCWYV4G9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

console.log("Firebase App:", app.name);

export const auth = getAuth(app);
export const db = getFirestore(app);
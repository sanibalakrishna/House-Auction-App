// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCzze64hcdmzy3_D1kSFZXQ3Dgmcd47LRE",
  authDomain: "house-marketplace-app-a0725.firebaseapp.com",
  projectId: "house-marketplace-app-a0725",
  storageBucket: "house-marketplace-app-a0725.appspot.com",
  messagingSenderId: "47304298743",
  appId: "1:47304298743:web:36b5e64553663062bb03f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();
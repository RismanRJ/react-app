
import {initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAYv7FiDHT1jnFcQ61GaizOyhbnpLv5FZY",
    authDomain: "webreact-21f64.firebaseapp.com",
    databaseURL: "https://webreact-21f64-default-rtdb.firebaseio.com",
    projectId: "webreact-21f64",
    storageBucket: "webreact-21f64.appspot.com",
    messagingSenderId: "285770891037",
    appId: "1:285770891037:web:7a2109573369fb07166bf4"
  };

const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const firestore= getFirestore(app)
const db= getDatabase(app);
const storage=getStorage(app)
export {app,auth,firestore,db,storage};
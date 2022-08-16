import { initializeApp } from "firebase/app";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apikey : process.env.REACT_APP_FIREBASE_KEY,
    authDomain :process.env.REACT_APP_AUTHDOMAIN ,
    projectId :process.env.REACT_APP_PROJECT_ID ,
    storageBucket :process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId : process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId : process.env.REACT_APP_APP_ID
}


initializeApp(firebaseConfig)
const dbService = getFirestore()
const storageService = getStorage();
export {dbService};
export {storageService}
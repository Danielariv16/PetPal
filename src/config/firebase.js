import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBUVnw9mjO342kuKitAw2kILwyIf-sGrDo",
  authDomain: "petpal-d1947.firebaseapp.com",
  projectId: "petpal-d1947",
  storageBucket: "petpal-d1947.appspot.com",
  messagingSenderId: "336226222311",
  appId: "1:336226222311:web:6573b7bdbf2ea47c252242",
  measurementId: "G-PPEESGWR00"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider =  new GoogleAuthProvider();
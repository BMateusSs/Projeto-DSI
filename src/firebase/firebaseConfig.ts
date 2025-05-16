// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSSVhBuiFGK60QgR1wVRZtubzTNgq_8ZY",
  authDomain: "projeto-dsi-df033.firebaseapp.com",
  projectId: "projeto-dsi-df033",
  storageBucket: "projeto-dsi-df033.firebasestorage.app",
  messagingSenderId: "317461053981",
  appId: "1:317461053981:web:6eab3035ab1ba5f1543cf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
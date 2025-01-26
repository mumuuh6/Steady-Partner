// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV2pZvPu5xd_AyQDQvu7e-BaUpbSzGN8g",
  authDomain: "steady-partner.firebaseapp.com",
  projectId: "steady-partner",
  storageBucket: "steady-partner.firebasestorage.app",
  messagingSenderId: "964523500553",
  appId: "1:964523500553:web:84b8aadd6997bdfb0e84d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
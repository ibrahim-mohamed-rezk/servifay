import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB30AThS9nFO7KLuwU-WgtX0oPiGiqtTs0",
  authDomain: "servify-adf1a.firebaseapp.com",
  databaseURL: "https://servify-adf1a-default-rtdb.firebaseio.com",
  projectId: "servify-adf1a",
  storageBucket: "servify-adf1a.appspot.com",
  messagingSenderId: "300545863446",
  appId: "1:300545863446:web:a4bab9058bca35dc1aea37",
  measurementId: "G-2047J300DJ",
};

export const firebaseConf = initializeApp(firebaseConfig);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDI7qmeWy09bySWqL0IZd8sDRnNoabgVFI",
  authDomain: "kids-network-381.firebaseapp.com",
  projectId: "kids-network-381",
  storageBucket: "kids-network-381.appspot.com",
  messagingSenderId: "532900275448",
  appId: "1:532900275448:web:0c3e6d36ce5976a815470d",
  measurementId: "G-8DX71L7QBY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

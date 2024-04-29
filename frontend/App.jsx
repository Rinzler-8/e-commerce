import React from "react";
import "./App.scss";
import { routes } from "./router/routes";
import storage from "./storage/Storage";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCAO3C4TwMdnIQDxm7j1ofUMRTU9SGWa8E",
  authDomain: "genuinedignity-eed4c.firebaseapp.com",
  projectId: "genuinedignity-eed4c",
  storageBucket: "genuinedignity-eed4c.appspot.com",
  messagingSenderId: "558741080406",
  appId: "1:558741080406:web:82fcb50c49ebf4fe1a2ef7",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  if (!storage.getItem("id")) {
    storage.setItem("id", Math.floor(Math.random() * 3000) + 1);
  }
  return <div className="App">{routes}</div>;
}

export default App;

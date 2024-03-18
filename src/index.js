import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWLFC2rei4RVlUzl_KkAJ3XGv9jiIfTHM",
  authDomain: "myday-5b240.firebaseapp.com",
  projectId: "myday-5b240",
  storageBucket: "myday-5b240.appspot.com",
  messagingSenderId: "590084488670",
  appId: "1:590084488670:web:0633266b7108235dbd314f"
};

const app = initializeApp(firebaseConfig);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default app;
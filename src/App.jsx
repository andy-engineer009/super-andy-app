// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import DailyTaskCard from './components/DailyTaskCard'  
import ProgressCard from './components/ProgressCard'


import React, { useEffect, useState } from "react";
import { messaging } from "./firebase-config";
import { getToken, onMessage } from "firebase/messaging";

function App() {
  const [token, setToken] = useState("1:1098347719441:web:b6263f91f3094f143bfab0");

  useEffect(() => {
    requestPermission();
    listenForMessages();
  }, []);


  const requestPermission = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: "BLcjMphAFbEOLaY8pkHNYcl8Zl4VI2CyfoBGJ58zYKJqjnHlx4ydI6P0huxdZtFAkTSdq3CJnIqxNIKQqR1iTD8",
      });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        setToken(currentToken);
      } else {
        console.warn("No registration token available.");
      }
    } catch (err) {
      console.error("An error occurred while retrieving token. ", err);
    }
  };

  const listenForMessages = () => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
    });
  };

  return (
    <>
      {/* <DailyTaskCard /> */}
      <ProgressCard />

          <div style={{ padding: "2rem" }}>
      <h1>React FCM Test</h1>
      <p><strong>Your FCM Token:</strong></p>
      <textarea value={token} readOnly rows={5} style={{ width: "100%" }} />
      <p>{token}</p>
    </div>
    </>
  )
}

export default App

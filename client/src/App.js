import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Send from "./components/Send/Send";
import Receive from "./components/Receive/Receive";

function App() {
  const [toggle, settoggle] = useState(0);
  const handleClick = () => {
    if (!toggle) settoggle(1);
    else settoggle(0);
  };
  return (
    <div className="app">
      <h1>Login/Register</h1>
      <label class="switch">
        <input type="checkbox" onChange={handleClick}></input>
        <span class="slider round"></span>
      </label>
      <div>{toggle ? <Login /> : <Register />}</div>
    </div>
  );
}

export default App;

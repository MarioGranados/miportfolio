import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <h2>Register</h2>
      <Register />
      <h2>Login</h2>
      <Login />
    </>
  );
}

export default App;

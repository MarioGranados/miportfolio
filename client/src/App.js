import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserContext from "./UserContext";

function App() {
  return (
    <>
      <h2>Register</h2>
      <Register />
      <h2>Login</h2>
      <Login />
      <h2>Profile</h2>
      <UserContext/>
    </>
  );
}

export default App;

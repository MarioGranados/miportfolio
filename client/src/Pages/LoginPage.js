import { useState } from "react";
import { API_URL } from "../Config/Confg";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const[redirect, setRedirect] = useState(false);
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function login(e) {
    e.preventDefault();
    console.log(user)
    const response = await fetch(API_URL + '/login', {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserData(userInfo);
        //   setRedirect(true);
        console.log(userData)
        setRedirect(true)
      });
    } else {
      alert("wrong credentials");
    }
  }

  if(redirect) {
    return (<Navigate to={'/profile'}/>)
  }

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          onChange={handleChange}
          name="username"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

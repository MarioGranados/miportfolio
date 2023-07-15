import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserData(userInfo);
        //   setRedirect(true);
        console.log(userData);
      });
    } else {
      alert("wrong credentials");
    }
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
        <input type="button" value="submit" />
      </form>
    </div>
  );
}

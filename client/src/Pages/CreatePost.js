import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../Config/Confg";

export default function CreatePost() {
  const [post, setPost] = useState({
    name: "",
    price: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(post))

    const respone = await fetch(`${API_URL}/post`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post),
      credentials: "include",
    });
    if (respone.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="stock name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="stock price"
          name="price"
          onChange={handleChange}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
}

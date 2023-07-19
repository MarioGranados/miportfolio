import React, { useState, useEffect } from "react";
import { API_URL } from "../Config/Confg";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const [user, setUserInfo] = useState({});
  useEffect(() => {
    fetch(`${API_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  if(user.username == null) {
    return <Navigate to={'/login'}/>
  }
  return (
    <>
      Welcome {user.username == null ? "null" : user.username + " "} glad to
      have you back{" "}
      {user.username == null
        ? "null"
        : " " + user.firstName + " " + user.lastName}
    </>
  );
}

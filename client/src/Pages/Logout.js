import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../Config/Confg";

export default function Logout() {
  useEffect(() => {
    fetch(`${API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
  }, []);
  return <Navigate to={"/"} />;
}

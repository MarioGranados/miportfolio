import React, { useState, useEffect } from "react";
import { API_URL } from "../Config/Confg";
import { Navigate } from "react-router-dom";
import { Chart } from "react-google-charts";

export default function Profile() {
  const data = [
    ["Year", "Current", "Expected"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];

  const options = {
    title: "Portfolio Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

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
  if (user.username == '') {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      Welcome {user.username == null ? "null" : user.username + " "} glad to
      have you back{" "}
      {user.username == null
        ? "null"
        : " " + user.firstName + " " + user.lastName}

<Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />

    </>
  );
}

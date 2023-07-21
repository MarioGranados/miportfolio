import React, { useState, useEffect } from "react";
import { API_URL } from "../Config/Confg";
import { Navigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row'
import StockCards from '../Components/StockCards'

export default function Profile() {
  const [posts, setPosts] = useState([]);
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

    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts)
      });
    });
  }, []);
  if (user.username == "") {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Container>
        <Row>
        Welcome {user.username == null ? "null" : user.username + " "} glad to
        have you back{" "}
        {user.username == null
          ? "null"
          : " " + user.firstName + " " + user.lastName}
        </Row>
        <Row>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
        </Row>
        {posts.map((item, index) => {
          return <StockCards props={item} key={index} />;
        })}

      </Container>
    </>
  );
}

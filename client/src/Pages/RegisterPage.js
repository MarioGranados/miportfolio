import React, { useState } from "react";
import { API_URL } from "../Config/Confg";
import { Navigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  async function register(e) {
    e.preventDefault();
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
      setRedirect(true);
    } else {
      alert("registration failed");
    }
    console.log(JSON.stringify(user));
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <form onSubmit={register}>
            <FloatingLabel
              controlId="username"
              label="username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="firstName"
              label="first name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="first name"
                name="firstName"
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="lastName"
              label="last name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="last name"
                name="lastName"
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="email" label="email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="password"
              label="password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
            </FloatingLabel>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

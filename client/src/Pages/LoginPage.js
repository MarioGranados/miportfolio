import { useState } from "react";
import { API_URL } from "../Config/Confg";
import { Navigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function login(e) {
    e.preventDefault();
    const response = await fetch(API_URL + "/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserData(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <form onSubmit={login}>
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
              Log In
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

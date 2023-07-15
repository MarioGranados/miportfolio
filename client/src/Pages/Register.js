import React, {useState} from 'react'

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
      async function register(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          alert("registration successful");
        } else {
          alert("registration failed");
        }
        console.log(JSON.stringify(user))
      }
    
      return (
        <>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="username"
              onChange={handleChange}
              name="username"
            />
            <input
              type="text"
              placeholder="first name"
              onChange={handleChange}
              name="firstName"
            />
            <input
              type="text"
              placeholder="last name"
              onChange={handleChange}
              name="lastName"
            />
            <input
              type="email"
              placeholder="email"
              onChange={handleChange}
              name="email"
            />
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
            />
            <input type="submit" value="submit" />
          </form>
        </>
      );
    }


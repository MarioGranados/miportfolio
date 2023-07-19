const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const Stock = require("./Models/stockModel");
const User = require("./Models/userModel");
// const { CONNECT, SECRET, SALT} = require("./Models/Config");

const salt = bcrypt.genSaltSync(8);
const secret = "asdf";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    const userData = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign(
      {
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        username,
        id: userDoc._id,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { name, price } = req.body;
    const stockDoc = await Stock.create({
      name,
      price,
      author: info.id,
    });
    res.json(stockDoc);
  });
});

app.get("/all", async (req, res) => {
  const stockDoc = await Stock.find().lean()
  res.json(stockDoc);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));

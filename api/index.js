const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const StockModel = require("./Models/stockModel");
const Stock = require("./Models/stockModel");

const userModel = require("./Models/userModel");
const User = require("./Models/userModel");

const salt = bcrypt.genSaltSync(8);
const secret = "asdf";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://mariogranados:lFiOvAn7sqzaUrCL@cluster0.cr3njog.mongodb.net/"
);

app.post("/stock", async (req, res) => {
  const { name, price } = req.body;
  try {
    const stockData = await new Stock({ name, price });
    res.json(stockData);
  } catch (error) {
    res.status(400).json(e);
  }
});

app.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    const userData = await new User({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userData);
  } catch (error) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
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

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));

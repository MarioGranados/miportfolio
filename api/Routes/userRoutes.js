const userModel = require("./Models/userModel");
const User = require("./Models/userModel");

app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const userData = await new User({firstName, lastName, email, password})
      res.json(userData);
    } catch (error) {
      res.status(400).json(e);
    }
  });
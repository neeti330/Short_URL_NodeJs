const { v4: uuidv4 } = require("uuid");
const USER = require("../models/user");
const { setUser } = require("../service/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await USER.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
};

module.exports = { handleUserSignup, handleUserLogin };

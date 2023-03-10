
// homeroutes contains all the view routes that do not require any authentication
const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

router.get("/", async (req, res) => {
  res.render("signup&login");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup&login");
});

module.exports = router;


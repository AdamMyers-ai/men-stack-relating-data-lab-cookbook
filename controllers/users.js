const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users/index", { users });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET /users/:userId  (view a user's pantry)
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.render("users/show", { user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;

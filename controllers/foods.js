const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");

// GET /users/:userId/foods
router.get("/", async (req, res) => {
  try {
    // Look up the current user from the session
    const user = await User.findById(req.session.user._id);

    res.locals.userId = req.params.userId;
    res.locals.pantry = user.recipes;

    res.render("foods/index");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET /users/:userId/foods/new
router.get("/new", (req, res) => {
  res.locals.userId = req.params.userId;
  res.render("foods/new");
});

// POST to /users/:userId/foods
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.recipes.push(req.body);
    await user.save();

    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET /users/:userId/foods/:itemId/edit
router.get("/:itemId/edit", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.recipes.id(req.params.itemId);

    res.locals.userId = req.params.userId;
    res.locals.food = food;

    res.render("foods/edit");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// POST to /users/:userId/foods/:itemId
router.put("/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.recipes.id(req.params.itemId);

    food.set(req.body);

    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// DELETE to /users/:userId/foods/:itemId
router.delete("/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const recipe = user.recipes.id(req.params.itemId);

    if (!recipe) {
      return res.redirect(`/users/${req.params.userId}/foods`);
    }

    recipe.deleteOne();

    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;

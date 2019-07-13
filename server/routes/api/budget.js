const express = require("express");
const { check, validationResult } = require("express-validator/check");
const config = require("config");

const router = express.Router();
const Budget = require("../../models/Budget");

// @route 	GET api/budget
// @desc 		Test
// @access 	Public
router.get("/", async (req, res) => {
  try {
    res.json({ msg: "YOU GET IT" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route 	POST api/budget
// @desc 		send data to client, DID MOUNT
// @access 	Private
router.post("/", async (req, res) => {
  try {
    let budget = await Budget.findOne({ userID: req.body.id });

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route 	POST api/budget/total-exp
// @desc 		send Current User Profile
// @access 	Public && Private
router.post(
  "/total-exp",
  [
    check("amount", "Please enter amount")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, amount } = req.body;

    if (amount < 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Amount cant go negetive" }] });
    }

    try {
      let newBudget = await Budget.findOne({ userID: id });

      if (!newBudget) {
        newBudget = new Budget();
      }

      newBudget.amount = amount;
      newBudget.userID = id;

      await newBudget.save();

      res.json(amount);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 	POST api/budget/categories
// @desc 		Add new Categories
// @access 	Private
router.post(
  "/categories",
  [
    check("category", "Nothing there")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, category } = req.body;
    try {
      let newBudget = await Budget.findOne({ userID: id });
      if (!newBudget) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Please set Budget amount First" }] });
      }
      if (newBudget.categories.includes(category)) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Can not enter same category twice" }] });
      }

      newBudget.categories.push(category);

      await newBudget.save();

      res.json(newBudget.categories);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 	POST api/budget/edit-cat
// @desc 		Add new Categories
// @access 	Public && Private
router.post(
  "/edit-cat",
  [
    check("newCat", "Nothing there")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldCat, newCat, id } = req.body;

    console.log("ALL DATAS ======= ", oldCat, newCat, id);

    try {
      let newBudget = await Budget.findOne({ userID: id });
      if (!newBudget) {
        return res.status(400).json({ errors: [{ msg: "Something Wrong" }] });
      }

      let index = newBudget.categories.indexOf(oldCat);

      newBudget.categories.fill(newCat, index, index + 1);

      let buzz = await Budget.findByIdAndUpdate(
        { _id: newBudget._id },
        { $set: { categories: newBudget.categories } },
        { new: true }
      );

      await buzz.save();

      res.json(newBudget.categories);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 	POST api/budget/del-cat
// @desc 		Delete a Category
// @access 	Private
router.post("/del-cat", async (req, res) => {
  const { id, category } = req.body;
  try {
    let newBudget = await Budget.findOne({ userID: id });
    if (!newBudget) {
      return res.status(400).json({ errors: [{ msg: "Something Wrong" }] });
    }

    let index = newBudget.categories.indexOf(category);

    newBudget.categories.splice(index, 1);

    let buzz = await Budget.findByIdAndUpdate(
      { _id: newBudget._id },
      { $set: { categories: newBudget.categories } },
      { new: true }
    );

    await buzz.save();

    res.json(newBudget.categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

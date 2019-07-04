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
    // console.log("BUDGET ========", budget);

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
// @access 	Public && Private
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

module.exports = router;

const express = require("express");
const { check, validationResult } = require("express-validator/check");

const router = express.Router();
const Budget = require("../../models/Budget");
const Exp = require("../../models/Expenses");

// @route 	GET api/budget
// @desc 		send categories to client, DID MOUNT
// @access 	Private
router.get("/:id", async (req, res) => {
  try {
    let budget = await Budget.findOne({ userID: req.params.id });

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route 	POST api/budget
// @desc 		add or edit budget amount
// @access 	Private
router.post(
  "/",
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

// @route 	PUT api/budget
// @desc 		Add new Categories
// @access 	Private
router.put("/:id/:category", async (req, res) => {
  const { id, category } = req.params;
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
});

// @route 	PUT api/budget/edit-cat
// @desc 		Edit a Categories
// @access 	Private
router.put("/edit-cat/:id/:oldCat/:newCat", async (req, res) => {
  const { oldCat, newCat, id } = req.params;

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
});

// @route 	DELETE api/budget
// @desc 		Delete a Category
// @access 	Private
router.delete("/:id/:category", async (req, res) => {
  const { id, category } = req.params;
  try {
    let newBudget = await Budget.findOne({ userID: id });
    if (!newBudget) {
      return res.status(400).json({ errors: [{ msg: "Something Wrong" }] });
    }

    let index = newBudget.categories.indexOf(category);

    newBudget.categories.splice(index, 1);

    await Exp.updateMany({ userID: id, category }, { deleted: true });

    await Budget.findByIdAndUpdate(
      { _id: newBudget._id },
      { $set: { categories: newBudget.categories } },
      { new: true }
    );

    res.json(newBudget.categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

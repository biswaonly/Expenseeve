const express = require("express");
const { check, validationResult } = require("express-validator/check");

const router = express.Router();
const Exp = require("../../models/Expenses");

// @route 	POST api/budget/categories
// @desc 		Add new Categories
// @access 	Public && Private
router.post(
  "/",
  [
    check("category", "Category Not there")
      .not()
      .isEmpty(),
    check("itemName", "Item Name Not there")
      .not()
      .isEmpty(),
    check("price", "Price Not there")
      .not()
      .isEmpty(),
    check("date", "Date Not there")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    console.log("======BODY======", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, itemName, price, date, userID, image } = req.body;
    try {
      let newExp = new Exp({ category, itemName, price, date, userID, image });

      newExp.deleted = false;
      console.log("=====NEW=====", newExp);

      await newExp.save();

      res.json(newExp);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 	POST api/budget/categories
// @desc 		Add new Categories
// @access 	Private
router.get("/:id", async (req, res) => {
  try {
    let newExp = await Exp.find({ userID: req.params.id, deleted: false });
    res.json(newExp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/test/:id", (req, res) => {
  console.log("/test");
  res.send("success");
});
// @route 	POST api/budget/categories
// @desc 		Add new Categories
// @access 	Private
router.delete("/delete/:id", async (req, res) => {
  console.log("============= /// \\ =================", req.params);

  try {
    await Exp.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { deleted: true } },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        console.log(doc);
      }
    );

    res.json(req.params.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

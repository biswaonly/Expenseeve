const express = require("express");
const imgur = require("imgur");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const router = express.Router();
const Exp = require("../../models/Expenses");

// @route 	POST api/budget/categories
// @desc 		Add new Categories
// @access 	Public && Private
router.post(
  "/add",
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, itemName, price, date, userID, image } = req.body;
    try {
      //IMGUR
      imgur
        .setClientId(config.get("imgurId"))
        .uploadFile(image)
        .then(function(json) {
          console.log(json.data.link);
        })
        .catch(function(err) {
          console.error(err.message);
        });

      let newExp = new Exp({ category, itemName, price, date, userID });

      newExp.deleted = false;

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
router.post("/get-data", async (req, res) => {
  try {
    let newExp = await Exp.find({ userID: req.body.id });
    res.json(newExp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

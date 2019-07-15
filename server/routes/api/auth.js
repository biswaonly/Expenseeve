const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// @route 	GET api/auth
// @desc 		Send User Data
// @access 	Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route		GET api/auth/log
// @desc		LOGIN User Authentication and send Token
// @access	Public
router.get("/log/:email/:password", async (req, res) => {
  const { email, password } = req.params;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: `Invalid Credentials` }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password do not match" }] });
    }

    // JWT token generate
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

// @route		POST api/auth/log
// @desc		REGISTER User data saved to the Database
// @access	Public
router.post(
  "/log",
  [
    check("name", "Please enter your name")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should be minimum 6 character").isLength({
      min: 6
    })
  ],

  async (req, res) => {
    // Check Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // Check email already exists or not
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "email already exists" }] });
      }
      user = new User({
        name,
        email,
        password
      });

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      // Save User in DB
      await user.save();
      res.send("done");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

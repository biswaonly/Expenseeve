const mongoose = require("mongoose");
const config = require("config");

// DB config
const db = config.get("mongoURI");

// Connect MongoDB
const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (err) {
    console.error(err.message);
    // Exit Process with Failure
    process.exit(1);
  }
};

module.exports = connectDB;

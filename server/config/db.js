const mongoose = require("mongoose");
const config = require("config");

mongoose.set('bufferCommands', false);

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
    console.info(`DB connected: ${db}`)

    
  } catch (err) {
    console.error(err.message);
    // Exit Process with Failure
    process.exit(1);
  }
};

module.exports = connectDB;

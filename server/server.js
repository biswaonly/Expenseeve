const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect with DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// CORS headers
// app.use
app.use("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Started");
});

//Define Routes
app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/budget", require("./routes/api/budget"));

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server has Started on port ${port}`));

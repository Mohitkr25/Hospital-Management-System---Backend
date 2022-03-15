require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/conn");
const app = express();
const PORT = process.env || 3000;
// console.log("hello world from express ");
const cors = require("cors");
const bodyParser = require("body-parser");
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth"));
app.use(require("./router/Allpatients"));

// app.get("/signin", (req, res) => {
//   res.send("<h1>signin page</h1>");
// });
app.listen(5000, () => {
  console.log("Listening on Port 5000");
});

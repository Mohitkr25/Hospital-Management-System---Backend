const mongoose = require("mongoose");
const db = process.env.DATAB_URL;

function connectDB() {
  mongoose
    .connect(db)
    .then(() => {
      console.log("connection succesfuly 🥳🥳");
    })
    .catch((err) => console.log(err));
}

module.exports = connectDB;

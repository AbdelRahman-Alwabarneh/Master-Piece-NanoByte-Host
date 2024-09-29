const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE;

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully to MongoDB");
});

module.exports = mongoose;

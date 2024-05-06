const mongoose = require("mongoose");

const connectToDataBase = () => {
  mongoose.connect(process.env.MONGODB_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "DB connection error"));
  db.once("open", () => {
    console.log("Database successfully connected");
  });
};

module.exports=connectToDataBase
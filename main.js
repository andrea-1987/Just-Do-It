const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectToDataBase = require("./db");
const cors = require("cors");
const path = require("path");
const usersRoutes = require("./routes/users");
const professionalRoutes = require("./routes/professionals");
const loginRoutes = require("./routes/login");
const worksRoutes = require("./routes/works");

const PORT = process.env.PORT || 4040;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", loginRoutes);
app.use("/", usersRoutes);
app.use("/", professionalRoutes);
app.use("/", worksRoutes);

connectToDataBase();

app.listen(PORT, () => {
  console.log(`Server connected and listening on port ${PORT}`);
});

const mongoose = require("mongoose");

const WorksSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      max: 40,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
      default: "unknown",
    },
    pubDate: {
      type: Date,
      required: false,
      default: Date.now(),
    },
  },
  { timestamps: true, strict: true }
);
module.exports = mongoose.model("WorksModel", WorksSchema, "works");

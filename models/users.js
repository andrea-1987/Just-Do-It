const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    icon: {
      type: String,
      required: false,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg",
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
    preferWorks:[{
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
      location:{
        type:String,
        required:true,
        default :"unknown"
      },
      pubDate:{
        type:Date,
        required:false,
        default:Date.now()
      }
    }],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("UserModel", UserSchema, "users");

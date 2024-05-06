const mongoose = require("mongoose");
const WorksSchema= require("./works")

const ProfessionalSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 255,
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
      minlength: 8,
    },
    age: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg",
    },
    job: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "professional",
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
    myWorks: [{
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
        required:false,
        default :"unknown"
      },
      pubDate:{
        type:Date,
        required:false,
        default:Date.now()
      }
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProfessionalModel", ProfessionalSchema, "professionals");
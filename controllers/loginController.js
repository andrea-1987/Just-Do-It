const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");
const ProfessionalModel = require("../models/professionals");

exports.toLoggIn = async (req, res) => {
  try {
    let profile;
    let user = await UserModel.findOne({
      email: req.body.email,
    });
    if (user) {
      profile = user;
    } else {
      let professional = await ProfessionalModel.findOne({
        email: req.body.email,
      });
      if (professional) {
        profile = professional;
      } else {
        return res.status(404).send({
          statusCode: 404,
          message: "This user or professional does not exist!",
        });
      }
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      profile.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign(
      {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        role: profile.role,
        _id: profile._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.setHeader("authorization", token);
    res.status(200).send({
      message: "Login successful",
      statusCode: 200,
      token,
      _id: profile._id,
    });
  } catch (e) {
    res.status(500).send({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

const UserModel = require("../models/users");
const ProfessionalModel = require("../models/professionals");

const checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    const existingProfessional = await ProfessionalModel.findOne({ email });

    if (existingUser || existingProfessional) {
      return res.status(400).send({
        statusCode: 400,
        message: "An account with this email already exists."
      });
    }

    next(); 
  } catch (error) {
    console.error("Error checking duplicate email:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = checkDuplicateEmail;

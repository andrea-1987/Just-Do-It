const express=require("express");
const router = express.Router();
const usersController= require("../controllers/usersController");
const validateUser = require("../middlewares/validateUserBody");
const verified = require("../middlewares/verifyToken");
const checkDuplicateEmail= require("../middlewares/checkDuplicateEmail");

router.get("/user",verified, usersController.getUsers);

router.get("/user/:id", usersController.getSingleUsers);

router.get("/user/:id/preferWorks", usersController.getPreferWorks);

router.post("/createUser",validateUser,checkDuplicateEmail,usersController.addUser);

router.patch("/user/update/:id",usersController.updateUser);

router.patch("/user/:id/preferWorks", usersController.toggleToPreferWorks);

router.delete("/user/delete/:id",usersController.deleteUser);

router.delete("/user/:userId/preferWorks/:workId", usersController.deleteWorkFromPreferWorks);


module.exports=router
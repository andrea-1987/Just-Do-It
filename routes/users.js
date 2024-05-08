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

router.post("/user/:id/preferWorks",usersController.addWorkToPreferWorks);

router.patch("/user/update/:id",usersController.updateUser);

router.delete("/user/delete/:id",usersController.deleteUser);

router.delete("/user/:userId/preferWorks/:workId", usersController.deleteWorkFromPreferWorks);


module.exports=router
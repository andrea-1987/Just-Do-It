const express=require("express");
const router = express.Router();
const professionalController= require("../controllers/professionalController");
const validateProfessional = require("../middlewares/validateProfessionalBody");
const verified = require("../middlewares/verifyToken");

router.get("/professional",verified,professionalController.getProfessional);

router.get("/professional/:id", professionalController.getSingleProfessional);

router.get("/professional/:id/preferWorks", professionalController.getPreferWorks);

router.get("/professional/:id/myWorks",professionalController.getMyWorks);

router.post("/createProfessional",validateProfessional,professionalController.addProfessional);

router.post("/professional/:id/myWorks",professionalController.addWorkToMyWorks);

router.post("/professional/:id/preferWorks",professionalController.addWorkToPreferWorks);

router.patch("/professional/update/:id",professionalController.updateProfessional);

router.delete("/professional/delete/:id",professionalController.deleteProfessional);

module.exports=router
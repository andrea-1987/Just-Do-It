const express=require("express");
const router = express.Router();
const professionalController= require("../controllers/professionalController");
const validateProfessional = require("../middlewares/validateProfessionalBody");
const verified = require("../middlewares/verifyToken");
const checkDuplicateEmail= require("../middlewares/checkDuplicateEmail");

router.get("/professional",verified,professionalController.getProfessional);

router.get("/professional/:id", professionalController.getSingleProfessional);

router.get("/professional/:id/preferWorks", professionalController.getPreferWorks);

router.get("/professional/:id/myWorks",professionalController.getMyWorks);

router.get("/allWorks/:workId", professionalController.getSingleWork);

router.get("/allWorks", professionalController.getAllProfessionalMyWorks);

router.post("/createProfessional",validateProfessional,checkDuplicateEmail,professionalController.addProfessional);

router.post("/professional/:id/myWorks",professionalController.addWorkToMyWorks);

router.patch("/professional/:id/update/myWorks/:workId",professionalController.updateMyWork);

router.patch("/professional/:id/preferWorks",professionalController.toggleToPreferWorks);

router.patch("/professional/update/:id",professionalController.updateProfessional);

router.delete("/professional/delete/:id",professionalController.deleteProfessional);

router.delete("/professional/:professionalId/preferWorks/:workId", professionalController.deleteWorkFromPreferWorks);

router.delete("/professional/:professionalId/myWorks/:workId", professionalController.deleteWorkFromMyWorks);


module.exports=router
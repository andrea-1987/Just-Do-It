const express = require("express");
const router = express.Router();
const worksController = require("../controllers/worksController");
const cloudUpload = require ("../middlewares/cloudinary");

router.get("/works",worksController.getWorks);

router.get("/works/:id", worksController.getSingleWork);

router.post("/createWork", worksController.addWork);

router.patch("/works/update/:id", worksController.updateWork);

router.delete("/works/delete/:workId", worksController.deleteWork);

router.post("/works/cloudUploadImg",cloudUpload,worksController.cloudUploadWorks);



module.exports = router;

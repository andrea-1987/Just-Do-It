const multer= require("multer")

const internalStorage= multer.diskStorage({
    destination:(req,file,cb) => {
         cb(null,"uploads")},
    filename:(req,file,cb)=>{
        const uniqSuffix= Date.now() + "-"+ Math.round(Math.random()*1E9);
        const fileExtension = file.originalname.split(".")
        cb(null,`${file.fieldname}-${uniqSuffix}.${fileExtension}`)
    }
});

const upload = multer({storage:internalStorage})
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"uploads/");
    },
    filename:function(req,file,cb) {
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const fileFiler = (req,file,cb)=> {
    const allowedTypes = /jpg|jpeg|png|gif/;
    const fileType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if(fileType ) {
        return cb(null,true);
    } 
    else {
        return cb(new Error("Only images allowed"),false);
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize:  30 * 1024 * 1024 },
    fileFilter:fileFiler
})

module.exports = upload;
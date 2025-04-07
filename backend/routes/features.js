const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const handleFileUpload = require("../controllers/features");
const checkAuth = require('../middlewares/checkAuth');

router.post("/predict-tumor",checkAuth,upload.single("image"),handleFileUpload)

module.exports = router;
const express = require('express');
const {handleLogin, handleRegistration, handleLogout,checkUserAuth} = require("../controllers/auth");
const upload = require("../config/multer");
const router = express.Router();

router.post("/sign-in",handleLogin);
router.post("/sign-up", handleRegistration);
router.post("/sign-out",handleLogout);
router.get("/check-auth",checkUserAuth);
module.exports = router;
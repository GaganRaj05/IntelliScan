const User = require("../models/User")
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
async function handleLogin(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(401).json("Email does not exists, please create an account");

        const result = await bcryptjs.compare(password, user.password);
        if(!result) return res.status(401).json("Incorred password");

        const token = jsonwebtoken.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie("jwt",token, {
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/"
        })
        res.status(201).json("Login successfull");
    }   
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleRegistration(req,res) {
    try {
        const {name,email,password,phone,address} = req.body;
        const emailExists = await User.findOne({email:email});
        if(emailExists) return res.status(401).json("Account exists.. Login");

        const phoneExists = await User.findOne({phone:phone});
        if(phoneExists) return res.status(401).json("Account exists.. Login");
        const imagePath = req.file ? 
        req.file.path.replace(/\\/g, '/').replace(/^uploads\//, '') : 
        "default.jpg";
        const hashedPassword = await bcryptjs.hash(password,await bcryptjs.genSalt(10));

        await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone,
            address:address,
            image:imagePath
        })
        return res.status(201).json("Account created successfully");

    }
    catch(err) {
        console.log(err);
        return res.status(501).json("Some error occure please try again later");
    }
}

async function handleLogout(req,res) {
    try {
        res.clearCookie("jwt",{
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        return res.status(201).json("Logout successfull");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
module.exports = {handleLogin, handleRegistration, handleLogout};
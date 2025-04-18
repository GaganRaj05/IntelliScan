require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/db");
const path = require("path")
const authRoutes = require("./routes/auth")
const featureRoutes = require("./routes/features")
const cors = require('cors');
const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/uploads",express.static(path.join(__dirname,"uploads"), {
    setHeaders: (res)=> {
        res.setHeaders("Cross-Origin-Resource-Policy","cross-origin")
    }
}));
connectToDb(process.env.MONGODB_URL);
app.use(express.json())
app.use("/app/auth",authRoutes);
app.use("/app/features",featureRoutes);
app.listen(process.env.PORT,()=>console.log("Server started at: ",process.env.PORT))



require('dotenv').config() ;
const express = require("express");
const cors = require("cors");
const { authorization } = require('paypal-rest-sdk');
const authRoutes = require("./routes/auth-routes/index");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI ;


// cors develop a connection between clientSite and serverSite
app.use(cors({
    origin : process.env.CLIENT_URL ,
    methods : ["GET","POST","PUT","DELETE"],
    allowedHeaders : ["Content-Type","Authorization"],
    // credentials: true 
})
);
app.use(express.json());

// Connect to database 

mongoose.connect(MONGODB_URI).then(() => console.log("MongoDB is connected")
)
.catch((e) => console.log(e)
);

app.get("/",function(req,res){
    res.send("hello aman")
})

// routes configuration
app.use("/auth",authRoutes);
app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).json({
        success : false,
        message : "Something went wrong"
    });
    
})


app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`);
    
})



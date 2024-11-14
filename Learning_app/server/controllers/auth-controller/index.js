const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req,res) => {
    const {userName,userEmail,password,role} = req.body;
    const existingUser = await User.findOne({$or : [{userName},{userEmail}],});

    if(existingUser){
        return res.status(400).json({
            success : false,
            message : "User name or user Email already exists" 
        })
    }   

    const hassPassword = await bcrypt.hash(password,10);
    const newUser = new User({userName,userEmail,role,password : newUser});

    await newUser.save();

    return res.status.json({
        success : true,
        message : 'User registered successfully!'
    });
    
};

module.exports = { registerUser };
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, enrollmentNo, email, password } = req.body;
        const user = await UserModel.findOne({ enrollmentNo });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, login with your credentials', success: false });
        }
        const userModel = new UserModel({ name, enrollmentNo, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        console.log("Error in signup", err);
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { enrollmentNo, password } = req.body;
        const user = await UserModel.findOne({ enrollmentNo });
        const errorMsg = 'Auth failed! Enrollment number or Password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { enrollmentNo: user.enrollmentNo, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Logged In Successfully",
                success: true,
                jwtToken,
                enrollmentNo: user.enrollmentNo,
                name: user.name,
                userId: user._id
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}
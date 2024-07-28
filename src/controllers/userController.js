import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        //checking if password matche
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        //checking if the user already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res
                .status(401)
                .json({ success: false, message: "User already exist" });
        }

        //create a new user
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();

        const accessToken  = jwt.sign({ userId: newUser._id, email }, process.env.JWT_SECRET, {expiresIn : '1hr'});
        res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly : true,
            secure : false,
            maxAge : 3600000
        }).json({ newUser, accessToken });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        // compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, {expiresIn : '1hr'});
        res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly : true,
            secure : false,
            maxAge : 3600000
        })
        .json({
            message: `${user.email} Login Successfully`,
            user: { _id: user._id, name: user.name, email: user.email }, accessToken,
        });
    } catch (error) {
        res.status(500)
        .json({
            success: false,
            message: "Internal server error",
        });
        console.log(error);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

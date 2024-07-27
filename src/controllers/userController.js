import { User } from "../models/userModel.js";

export const registerController = async (req, res) => {
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

        res.status(200).json({ newUser });
    } catch (error) {
        res.status(500).json({
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
        console.log(error);
    }
};

// export const checkUser =  (req, res) => {
//     const { username, pass } = req.body;
//     // checking by static password and username
//     if ( username === 'admin' && pass === 'admin123'){
//         res.json({message: 'User Found', status : 200, username})
//     }
//     else {
//         res.json({message: 'User not found', status: 404})
//     }
// }

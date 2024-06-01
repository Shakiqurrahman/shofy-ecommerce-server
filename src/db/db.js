import mongoose from "mongoose";
import { MONGODB_URI } from '../constants.js'

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGODB_URI);
        console.log(
            `\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB connection FAILED!! ", error);
        process.exit(1); //current process will stop!! - [node js]
    }
};


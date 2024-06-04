import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 8080;
export const MAX_JSON_SIZE = "30mb";
export const MONGODB_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@shake.mdn38bt.mongodb.net/`
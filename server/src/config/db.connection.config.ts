import mongoose from "mongoose";
import { config } from "./config";

const {databaseUri} = config
const connectDB = async () => {
    try {
        await mongoose.connect(databaseUri)
    } catch (error) {
        console.log(error)
    }
}

export {connectDB}
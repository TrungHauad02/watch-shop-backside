import mongoose from "mongoose";
import { env } from "./env.js";

const uri = env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối thành công MongoDB ");
  } catch (error) {
    console.error("Lỗi khi kết nối MongoDB:", error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("Lỗi khi đóng kết nối MongoDB:", error);
    throw error;
  }
};

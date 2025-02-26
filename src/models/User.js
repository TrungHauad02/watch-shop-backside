import mongoose from "mongoose";
import { validator } from "../utils/validators.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên người dùng là bắt buộc"],
    }, // Tên người dùng

    email: {
      type: String,
      required: [true, "Email người dùng là bắt buộc"],
      unique: true,
      validate: validator.isValidEmail,
    }, // Email người dùng

    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
      validate: validator.isValidPassword,
    }, // Mật khẩu

    refreshToken: {
      type: String,
    }, // Token để làm mới xác thực

    role: {
      type: String,
      enum: {
        values: ["user", "admin", "owner"],
        message: "Vai trò không hợp lệ",
      },
      default: "user",
      required: [true, "Vai trò là bắt buộc"],
    }, // Phân quyền

    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Trạng thái tài khoản không hợp lệ",
      },
      default: "active",
      required: [true, "Trạng thái tài khoản là bắt buộc"],
    }, // Trạng thái tài khoản
  },
  {
    // Cấu hình timestamps để tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo model User từ schema
const User = mongoose.model("User", userSchema);
export default User;

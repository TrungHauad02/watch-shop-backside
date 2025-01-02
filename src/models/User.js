import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Mã định danh duy nhất của người dùng
    createdAt: { type: Date, default: Date.now }, // Ngày tạo người dùng
    updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật người dùng
    name: { type: String, required: true }, // Tên người dùng
    email: { type: String, required: true, unique: true }, // Email người dùng
    password: { type: String, required: true }, // Mật khẩu
    refreshToken: { type: String }, // Token để làm mới xác thực
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Phân quyền
    status: { type: String, enum: ["active", "inactive"], default: "active" }, // Trạng thái tài khoản
  },
  {
    // Cấu hình timestamps để tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo model User từ schema
const User = mongoose.model("User", userSchema);
export default User;

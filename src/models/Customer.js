import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true }, // Id của người dùng
    saveProducts: { type: Array, required: false, default: [] }, // Danh sách sản phẩm đã lưu
  },
  {
    // Cấu hình timestamps để tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo model Customer từ schema
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;

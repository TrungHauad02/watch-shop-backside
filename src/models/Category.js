import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Mã định danh duy nhất của loại
    createdAt: { type: Date, default: Date.now }, // Ngày tạo loại
    updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật loại
    name: { type: String, required: true }, // Tên loại
    description: { type: String, required: true }, // Mô tả loại
  },
  {
    // Cấu hình timestamps để tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo model Category từ schema
const Category = mongoose.model("Category", categorySchema);
export default Category;

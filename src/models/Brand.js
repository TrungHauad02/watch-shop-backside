import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Mã định danh duy nhất của hãng
    createdAt: { type: Date, default: Date.now }, // Ngày tạo hãng
    updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật hãng
    name: { type: String, required: true }, // Tên hãng
    description: { type: String, required: true }, // Mô tả hãng
    logoUrl: { type: String, required: true }, // Logo hãng
  },
  {
    // Cấu hình timestamps để tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo model Brand từ schema
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

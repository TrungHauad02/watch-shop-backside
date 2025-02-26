import mongoose from "mongoose";
import { validator } from "../utils/validators.js";

const productSchema = new mongoose.Schema(
  {
    view: { type: Number, default: 0 },
    name: {
      type: String,
      required: [true, "Tên sản phẩm là bắt buộc"],
    },
    productId: {
      type: String,
      unique: true,
      required: [true, "Mã sản phẩm là bắt buộc"],
    },
    brandId: {
      type: String,
      required: [true, "Mã thương hiệu là bắt buộc"],
    },
    categoryId: {
      type: String,
      required: [true, "Danh mục sản phẩm là bắt buộc"],
    },
    quantity: {
      type: Number,
      required: [true, "Số lượng sản phẩm là bắt buộc"],
      default: 0,
      validate: validator.isValidQuantity,
    },
    price: {
      type: Number,
      required: [true, "Giá sản phẩm là bắt buộc"],
      validate: validator.isValidPrice,
    },
    discount: {
      type: Number,
      default: 0,
      validate: validator.isValidDiscount,
    },
    details: {
      caseSize: {
        type: Number,
        required: [true, "Cỡ mặt đồng hồ là bắt buộc"],
        validate: validator.isValidCaseSize,
      },
      caseThickness: {
        type: Number,
        required: [true, "Độ dày mặt đồng hồ là bắt buộc"],
        validate: validator.isValidCaseThickness,
      },
      waterResistance: {
        type: Number,
        required: [true, "Khả năng chống nước là bắt buộc"],
        validate: validator.isValidWaterResistance,
      },
      powerReserve: {
        type: Number,
        required: [true, "Thời lượng pin là bắt buộc"],
        validate: validator.isValidPowerReserve,
      },
      caseMaterial: {
        type: String,
        required: [true, "Chất liệu vỏ đồng hồ là bắt buộc"],
        validate: validator.isValidString,
      },
      strapMaterial: {
        type: String,
        required: [true, "Chất liệu dây đồng hồ là bắt buộc"],
        validate: validator.isValidString,
      },
      movement: {
        type: String,
        required: [true, "Bộ máy đồng hồ là bắt buộc"],
        validate: validator.isValidString,
      },
      glassType: {
        type: String,
        required: [true, "Loại kính đồng hồ là bắt buộc"],
        validate: validator.isValidString,
      },
      functions: {
        type: [String],
      },
      origin: {
        type: String,
        required: [true, "Xuất xứ sản phẩm là bắt buộc"],
        validate: validator.isValidString,
      },
      gender: {
        type: String,
        enum: validator.allowedGenders,
        required: [true, "Giới tính sản phẩm là bắt buộc"],
      },
      description: {
        // Mô tả
        type: String,
      },
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

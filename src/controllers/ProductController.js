import { productService } from "../services/ProductService.js";
import { logger } from "../config/logger.js";

const getAllProduct = async (req, res) => {
  try {
    const result = await productService.getAllProductService();
    return res.status(200).json({
      success: true,
      data: result.data,
      message: result.message,
    });
  } catch (error) {
    logger.error("Lỗi server khi tìm kiếm các sản phẩm", {
      error: error.message,
    });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await productService.createProductService(req.body);

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
        errors: result.errors || null,
      });
    }
  } catch (error) {
    logger.error("Lỗi server khi tạo sản phẩm", { error: error.message });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductByIdService(id);

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    logger.error("Lỗi server khi tìm kiếm sản phẩm", { error: error.message });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.updateProductService(id, req.body);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
        errors: result.errors || null,
      });
    }
  } catch (error) {
    logger.error("Lỗi server khi cập nhật sản phẩm", { error: error.message });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProductByIdService(id);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    logger.error("Listring server khi xoa sản phẩm", { error: error.message });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const productController = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById,
};

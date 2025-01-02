import Product from "../models/Product.js";
import { logger } from "../config/logger.js";
import { parseValidationErrors } from "../utils/parseValidationErrors.js";

const MESSAGES = {
  CREATE_SUCCESS: "Tạo mới sản phẩm thành công",
  CREATE_FAIL: "Tạo mới sản phẩm thất bại",
  VALIDATION_FAIL: "Dữ liệu không hợp lệ",
  DUPLICATE_PRODUCT_ID: "Product ID đã tồn tại",
  PRODUCT_NOT_FOUND: "Không tìm thấy sản phẩm",
  GET_PRODUCT_ERROR: "Lỗi khi tìm kiếm sản phẩm",
  PRODUCT_FOUND: "Tìm thấy sản phẩm",
};

const getAllProductService = async () => {
  try {
    logger.info("Bắt đầu tìm kiếm các sản phẩm");
    const products = await Product.find();
    logger.info("Tìm thấy các sản phẩm", { count: products.length });
    return {
      success: true,
      message: MESSAGES.PRODUCT_FOUND,
      data: products,
    };
  } catch (error) {
    logger.error(MESSAGES.GET_PRODUCT_ERROR, { error: error.message });
    return {
      success: false,
      message: MESSAGES.GET_PRODUCT_ERROR,
      error: error.message,
    };
  }
};

const createProductService = async (data) => {
  try {
    logger.info(`Bắt đầu tạo mới sản phẩm`);

    const dataDetails = data.details;

    const details = {
      caseSize: dataDetails.caseSize,
      caseThickness: dataDetails.caseThickness,
      waterResistance: dataDetails.waterResistance,
      powerReserve: dataDetails.powerReserve,
      origin: dataDetails.origin,
      gender: dataDetails.gender,
      caseMaterial: dataDetails.caseMaterial,
      strapMaterial: dataDetails.strapMaterial,
      movement: dataDetails.movement,
      functions: dataDetails.functions,
      glassType: dataDetails.glassType,
    };

    const product = new Product({
      name: data.name,
      productId: data.productId,
      brandId: data.brandId,
      categoryId: data.categoryId,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount,
      details: details,
    });

    const savedProduct = await product.save();

    logger.info(MESSAGES.CREATE_SUCCESS, { productId: savedProduct._id });
    return {
      success: true,
      message: MESSAGES.CREATE_SUCCESS,
      data: savedProduct,
    };
  } catch (error) {
    logger.error(`${MESSAGES.CREATE_FAIL}: ${error.message}`);
    logger.error(`Data dẫn đến lỗi: ${JSON.stringify(data)}`);

    if (error.name === "ValidationError") {
      const errorMessages = parseValidationErrors(error);

      return {
        success: false,
        message: MESSAGES.VALIDATION_FAIL,
        errors: errorMessages,
      };
    }

    if (error.code === 11000) {
      return {
        success: false,
        message: MESSAGES.DUPLICATE_PRODUCT_ID,
      };
    }

    return {
      success: false,
      message: MESSAGES.CREATE_FAIL,
      error: error.message,
    };
  }
};

const getProductByIdService = async (productId) => {
  try {
    logger.info(`Bắt đầu tìm kiếm sản phẩm với ID: ${productId}`);
    const product = await Product.findById(productId);

    if (!product) {
      logger.warn(MESSAGES.PRODUCT_NOT_FOUND, { productId });
      return {
        success: false,
        message: MESSAGES.PRODUCT_NOT_FOUND,
      };
    }

    logger.info("Tìm thấy sản phẩm", { productId });
    return {
      success: true,
      data: product,
      message: MESSAGES.PRODUCT_FOUND,
    };
  } catch (error) {
    logger.error(MESSAGES.GET_PRODUCT_ERROR, { error: error.message });
    return {
      success: false,
      message: MESSAGES.GET_PRODUCT_ERROR,
      error: error.message,
    };
  }
};

export const productService = {
  createProductService,
  getProductByIdService,
  getAllProductService,
};

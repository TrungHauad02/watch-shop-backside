import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger.js";
import { env } from "../config/env.js";

const MESSAGES = {
  LOGIN_SUCCESS: "Đăng nhập thành công",
  LOGIN_FAIL: "Đăng nhập thất bại",
  REGISTER_SUCCESS: "Đăng ký thành công",
  REGISTER_FAIL: "Đăng ký thất bại",
  EMAIL_EXISTS: "Email này đã tồn tại",
  EMAIL_NOT_VALID: "Email không hợp lệ",
  PASSWORD_NOT_VALID: "Mật khẩu không hợp lệ",
  USER_NOT_FOUND: "Không tìm thấy người dùng",
  NAME_NOT_VALID: "Tên người dùng không hợp lệ",
  INTERNAL_ERROR: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
  TOKEN_NOT_VALID: "Token không hợp lệ",
  TOKEN_EXPIRED: "Token không hợp lệ hoặc hết hạn",
};

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRATION_TIME = "1h";
const REFRESH_TOKEN_EXPIRATION_TIME = "7d";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRATION_TIME,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
  });
};

const login = async (email, password) => {
  if (!email || !password) {
    return {
      success: false,
      message: MESSAGES.EMAIL_NOT_VALID,
    };
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return {
        success: false,
        message: MESSAGES.USER_NOT_FOUND,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: MESSAGES.LOGIN_FAIL,
      };
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
      success: true,
      message: MESSAGES.LOGIN_SUCCESS,
      data: { accessToken, refreshToken },
    };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return {
      success: false,
      message: MESSAGES.INTERNAL_ERROR,
    };
  }
};

const register = async (name, email, password) => {
  if (!name || !email || !password) {
    return {
      success: false,
      message: MESSAGES.NAME_NOT_VALID,
    };
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return {
        success: false,
        message: MESSAGES.EMAIL_EXISTS,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      status: "active",
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    return {
      success: true,
      message: MESSAGES.REGISTER_SUCCESS,
      data: { accessToken, refreshToken },
    };
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    return {
      success: false,
      message: MESSAGES.INTERNAL_ERROR,
    };
  }
};

const refreshToken = async (token) => {
  try {
    if (!token) {
      return {
        success: false,
        message: MESSAGES.TOKEN_NOT_VALID,
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return {
        success: false,
        message: MESSAGES.USER_NOT_FOUND,
      };
    }

    const newAccessToken = generateAccessToken(user);
    return {
      success: true,
      data: { accessToken: newAccessToken },
    };
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    return {
      success: false,
      message: MESSAGES.TOKEN_EXPIRED,
    };
  }
};

export const authService = {
  login,
  register,
  refreshToken,
};

const isValidPrice = {
  validator: (value) => value > 0,
  message: "Giá phải lớn hơn 0",
};

const isValidQuantity = {
  validator: (value) => value >= 0,
  message: "Số lượng phải lớn hơn hoặc bằng 0",
};

const isValidDiscount = {
  validator: (value) => value >= 0 && value <= 100,
  message: "Giảm giá phải nằm trong khoảng từ 0 đến 100",
};

const isValidCaseSize = {
  validator: (value) => value > 0,
  message: "Kích thước mặt đồng hồ phải lớn hơn 0",
};

const isValidCaseThickness = {
  validator: (value) => value > 0,
  message: "Độ dày mặt đồng hồ phải lớn hơn 0",
};

const isValidWaterResistance = {
  validator: (value) => value >= 0,
  message: "Khả năng chống nước phải lớn hơn hoặc bằng 0",
};

const isValidPowerReserve = {
  validator: (value) => value > 0,
  message: "Thời lượng pin phải lớn hơn 0",
};

const isValidString = {
  validator: (value) => typeof value === "string" && value.trim().length > 0,
  message: "Trường này phải là một chuỗi không rỗng",
};

const allowedGenders = ["male", "female", "unisex"];

const isValidEmail = {
  validator: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message: "Email không hợp lệ",
};

const isValidPassword = {
  validator: (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  },
  message:
    "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
};

export const validator = {
  isValidPrice,
  isValidQuantity,
  isValidDiscount,
  isValidCaseSize,
  isValidCaseThickness,
  isValidWaterResistance,
  isValidPowerReserve,
  isValidString,
  allowedGenders,
};

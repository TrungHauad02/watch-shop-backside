export const parseValidationErrors = (error) => {
  if (error.name !== "ValidationError") {
    return ["Lỗi không xác định"];
  }

  const errorMessages = Object.values(error.errors).map((err) => {
    return err.message;
  });

  return errorMessages;
};

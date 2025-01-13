export const parsePaginationQuery = (query) => {
  const { page = 1, size = 10, sort = "", filter = "{}" } = query;

  let filterObj = {};
  try {
    if (typeof filter === "string" && filter.trim() !== "") {
      filterObj = JSON.parse(filter);
    } else if (typeof filter === "object" && filter !== null) {
      filterObj = filter;
    }
  } catch (e) {
    console.error("Invalid filter JSON string:", e);
    filterObj = {};
  }

  const parsedPage = parseInt(page, 10);
  const parsedSize = parseInt(size, 10);

  const limit = !isNaN(parsedSize) && parsedSize > 0 ? parsedSize : 10;
  const skip =
    !isNaN(parsedPage) && parsedPage > 0 ? (parsedPage - 1) * limit : 0;

  const sortObj = sort
    ? sort.split(",").reduce((acc, field) => {
        const trimmedField = field.trim();
        if (trimmedField === "") return acc;

        const direction = trimmedField.startsWith("-") ? -1 : 1;
        const fieldName = trimmedField.startsWith("-")
          ? trimmedField.substring(1)
          : trimmedField;

        if (fieldName) {
          acc[fieldName] = direction;
        }

        return acc;
      }, {})
    : {};

  return { page, size, limit, skip, sortObj, filterObj };
};

function formatResponse(data, message) {
  return {
    data: data ? data : {},
    message: message ? message : "success",
  };
}

module.exports = { formatResponse };

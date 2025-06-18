const errorHandler = (error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    error: error.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { errorHandler };

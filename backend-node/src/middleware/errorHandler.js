const errorHandler = (err, req, res, next) => {
  // Log full error server-side
  console.error('Error Details:', err);

  // Return sanitized error to client
  res.status(500).json({
    success: false,
    error: 'Internal Server Error. Please try again later.'
  });
};

module.exports = errorHandler;

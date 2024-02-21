const handleDuplicateError = (err, req, res) => {
  const field = Object.keys(err.keyPattern)[0];
  const errorObj = {};
  errorObj[field] = `${field} already exists!`;

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    errors: errorObj,
    message: 'Duplicate field value in database.',
  });
};

const sendProdError = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  if (process.env.NODE_ENV.trim() === 'production') {
    const error = Object.create(
      Object.getPrototypeOf(err),
      Object.getOwnPropertyDescriptors(err)
    );

    if (error.code === 11000) {
      return handleDuplicateError(error, req, res);
    }

    return sendProdError(err, req, res);
  }

  // Dev errors
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
  });
};

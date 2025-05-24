//const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };
  /*if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }*/
  // mongoose validation error
  if (err.name === "ValidationError") {
    CustomError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    CustomError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    CustomError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    CustomError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    CustomError.message = `No item found with id : ${err.value}`;
    CustomError.statusCode = StatusCodes.NOT_FOUND;
  }

  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(CustomError.statusCode).json({ msg: CustomError.message });
};

module.exports = errorHandlerMiddleware;

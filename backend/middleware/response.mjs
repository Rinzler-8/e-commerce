import { getReasonPhrase, StatusCodes } from "http-status-codes";

const response = (req, res, next) => {
  res.success = (data, count) => {
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: getReasonPhrase(StatusCodes.OK),
      data,
      total: count,
    });
  };

  return next();
};

export default response;

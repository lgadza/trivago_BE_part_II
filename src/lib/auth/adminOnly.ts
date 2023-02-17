import createHttpError from "http-errors";
import { ErrorRequestHandler } from "express";

export const adminOnlyMiddleware: ErrorRequestHandler = (req, res, next) => {
  if (req.user.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Host only endpoint!"));
  }
};

import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { TokenPayload } from "./tools";

interface UserRequest extends Request {
  user?: TokenPayload;
}
export const adminOnlyMiddleware: RequestHandler = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    next(createHttpError(403, "Admin only endpoint!"));
  }
};

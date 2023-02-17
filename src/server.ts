import express from "express";
import cors from "cors";
import usersRouter from "./api/users";
import {
  forbiddenErrorHandler,
  genericErroHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandlers";
import passport from "passport";
import accommodationRouter from "./api/accommodations";
import { createServer } from "http";
const expressServer = express();

// *****************SOCKET>IO**************************
const httpServer = createServer(expressServer);
// ***************************** MIDDLEWARES ***************************
expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(passport.initialize());
// ****************************** ENDPOINTS ****************************
expressServer.use("/users", usersRouter);
expressServer.use("/accommodations", accommodationRouter);

// *************************** ERROR HANDLERS **************************
expressServer.use(notFoundErrorHandler);
expressServer.use(unauthorizedErrorHandler);
expressServer.use(forbiddenErrorHandler);
expressServer.use(genericErroHandler);

export { expressServer, httpServer };

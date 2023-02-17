import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
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

const server = express();
const port = process.env.PORT || 3001;

// ***************************** MIDDLEWARES ***************************
server.use(cors());
server.use(express.json());
server.use(passport.initialize());
// ****************************** ENDPOINTS ****************************
server.use("/users", usersRouter);
server.use("/accommodations", accommodationRouter);

// *************************** ERROR HANDLERS **************************
server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(genericErroHandler);

mongoose.connect(process.env.MONGO_URL!);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");

  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
export { server };

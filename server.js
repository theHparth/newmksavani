import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
// import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// hello
// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import authRouterHospital from "./routes/user/authRoutesHospital.js";
import jobsRouter from "./routes/jobsRoutes.js";
import hospitalRouter from "./routes/hospitalRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";
import stockRouter from "./routes/stockRoutes.js";
import stocksInRouter from "./routes/stocksInRouter.js";
import stockOutRouter from "./routes/stockOutRouter.js";
import stockInUserRouter from "./routes/user/stockInUserRouter.js";
import hospitalStockViewAdmin from "./routes/hospitalStockViewAdmin.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authenticateHospital from "./middleware/user/authHospital.js";

import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.use(express.static("app/client/build"));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use(cors());

// for admin management
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/authHospital", authRouterHospital);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/hospitals", authenticateUser, hospitalRouter);
app.use("/api/v1/vendors", authenticateUser, vendorRouter);
app.use("/api/v1/stocks", authenticateUser, stockRouter);
app.use("/api/v1/wereHouse", authenticateUser, stocksInRouter);
app.use("/api/v1/stockOut", authenticateUser, stockOutRouter);
app.use("/api/v1/hospitalDataAdmin", authenticateUser, hospitalStockViewAdmin);

// for hospital management
app.use("/api/v1/stocksUser", authenticateHospital, stockInUserRouter);

// only when ready to deploy
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// });
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config();
// // import "express-async-errors";
// require("express-async-errors");
// var morgan = require("morgan");

// const { dirname } = "path";
// const { fileURLToPath } = "url";
// const path = require("path");

// const helmet = require("helmet");
// const xss = require("xss-clean");
// const mongoSanitize = require("express-mongo-sanitize");

// // hello
// // db and authenticateUser
// const connectDB = "./db/connect";

// // routers
// const authRouter = require("./routes/authRoutes");
// const authRouterHospital = "./routes/user/authRoutesHospital";
// const jobsRouter = "./routes/jobsRoutes";
// const hospitalRouter = "./routes/hospitalRoutes";
// const vendorRouter = "./routes/vendorRoutes";
// const stockRouter = "./routes/stockRoutes";
// const wereHouseRouter = "./routes/wereHouseRouter";
// const stockOutRouter = "./routes/stockOutRouter";
// const stockInUserRouter = "./routes/user/stockInUserRouter";
// const hospitalStockViewAdmin = "./routes/hospitalStockViewAdmin";

// // middleware
// const notFoundMiddleware = "./middleware/not-found.js";
// const errorHandlerMiddleware = "./middleware/error-handler.js";
// const authenticateUser = "./middleware/auth.js";
// const authenticateHospital = "./middleware/user/authHospital.js";

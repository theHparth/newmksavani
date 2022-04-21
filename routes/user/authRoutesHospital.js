import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import {
  login,
  update,
} from "../../controllers/user/authControllerHospital.js";

import authenticateUser from "../../middleware/user/authHospital.js";

router.route("/login").post(apiLimiter, login);
router.route("/updateHospital").patch(authenticateUser, update);

export default router;

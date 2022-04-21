import express from "express";
const router = express.Router();

import {
  hospitalStockViewAdmin,
  minimumThresold,
  hospitalSellings,
} from "../controllers/hospitalStockViewAdmin.js";

router.route("/").get(hospitalStockViewAdmin);
router.route("/minimumThresold").get(minimumThresold);
router.route("/hospitalSelling").get(hospitalSellings);

export default router;

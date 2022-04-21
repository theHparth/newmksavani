import express from "express";
const router = express.Router();

import {
  addStock,
  deleteStock,
  getAllStock,
  updateStock,
} from "../controllers/stockController.js";

router.route("/").post(addStock).get(getAllStock);
router.route("/:id").put(deleteStock).patch(updateStock);

export default router;

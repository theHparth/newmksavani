import express from "express";
const router = express.Router();

import {
  addStockinWereHouse,
  deleteStockfromWereHouse,
  getAllStockfromWereHouse,
  updateStockfromWereHouse,
} from "../controllers/wareHouseController.js";

router.route("/").post(addStockinWereHouse).get(getAllStockfromWereHouse);
router
  .route("/:id")
  .delete(deleteStockfromWereHouse)
  .patch(updateStockfromWereHouse);

export default router;

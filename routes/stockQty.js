import express from "express";
const router = express.Router();

import { getTotoalQtyofStock } from "../controllers/totalQtyController.js";

router.route("/").get(getTotoalQtyofStock);

export default router;

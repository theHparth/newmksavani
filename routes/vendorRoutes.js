import express from "express";
const router = express.Router();

import {
  addVendor,
  deleteVendor,
  getAllVendor,
  updateVendor,
} from "../controllers/vendoresController.js";

router.route("/").post(addVendor).get(getAllVendor);
// remember about :id
// router.route("/stats").get(showStats);
router.route("/:id").put(deleteVendor).patch(updateVendor);

export default router;

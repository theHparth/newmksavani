import express from "express";
const router = express.Router();

import {
  registerHospital,
  deleteHospital,
  getAllHospital,
  updateHospital,
} from "../controllers/hospitalsController.js";

router.route("/").post(registerHospital).get(getAllHospital);
// remember about :id
// router.route("/stats").get(showStats);
router.route("/:id").put(deleteHospital).patch(updateHospital);

export default router;

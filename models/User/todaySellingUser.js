import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const todaySellingHospitalSchema = new mongoose.Schema(
  {
    todaySellingData: {
      type: Object,
      required: [true, "Please provide proper selling data"],
    },

    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Please provide created for"],
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "TodaySellingHospital",
  todaySellingHospitalSchema
);

import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockHospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
      unique: true,
    },
    minimumLimit: {
      type: Number,
      // required: [true, "Please provide minimum limit"],
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Please provide created for"],
    },
    totalQtyUser: {
      type: Number,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("StocksHospital", StockHospitalSchema);

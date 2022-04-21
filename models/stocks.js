import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
    },
    description: {
      type: String,
      required: [true, "Please provide Description"],
    },
    minimumLimit: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    stockStatus: { type: Boolean, default: true },
    price: {
      type: Number,
    },
    totalQty: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stocks", StockSchema);

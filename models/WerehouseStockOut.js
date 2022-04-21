import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const StockOutSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "Please provide Hoapital Name"],
      maxlength: 150,
    },
    stock_name: {
      type: String,
      required: [true, "Please provide stock name"],
      maxlength: 100,
    },
    price: {
      type: Number,
      maxlength: 10000000,
    },

    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    totalQtyInOneBox: {
      type: Number,
      required: [true, "Please provide number of qty in one box"],
    },
    totalBox: {
      type: Number,
      required: [true, "Please provide number of total box"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("StockOut", StockOutSchema);

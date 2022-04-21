import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const WereHouseSchema = new mongoose.Schema(
  {
    invoiceNumStockIn: {
      type: Number,
      required: [true, "Please add invoice number"],
    },

    vendor_name: {
      type: String,
      required: [true, "Please select vendor"],
      maxlength: 100,
    },
    stockInDetail: {
      type: Object,
      required: [true, "Please provide stock detal"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    stockInNote: {},
  },
  { timestamps: true }
);

export default mongoose.model("WereHouseStocks", WereHouseSchema);

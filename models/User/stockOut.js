import mongoose from "mongoose";
// import vendorDetail from "../controllers/vendoresController.js";

const stockOutSchema = new mongoose.Schema(
  {
    invoiceNum: {
      type: Number,
      required: [true, "Please provide Invoice number"],
    },
    hospitalName: {
      type: String,
      required: [true, "Please provide hospital name"],
      maxlength: 100,
    },
    status: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdFor: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Please provide created for"],
    },
    stockOutDetail: {
      type: Object,
      required: [true, "Please provide stock detal"],
    },
    messageForHospital: {},
    deliveryDate: {},
  },
  { timestamps: true }
);

export default mongoose.model("UserStock", stockOutSchema);

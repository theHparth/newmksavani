import mongoose from "mongoose";
// import onlyVendorsName from "../controllers/jobsController.js";
import validator from "validator";

// onlyVendorsName

const VendorSchema = new mongoose.Schema(
  {
    vendor_name: {
      type: String,
      required: [true, "Please provide Name"],
      maxlength: 150,
    },

    address: {
      type: String,
      required: [true, "Please provide address"],
      maxlength: 150,
    },
    contect: {
      type: String,
      required: [true, "Please provide contect"],
      maxlength: 10,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      maxlength: 150,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    pincode: {
      type: Number,
      required: [true, "Please provide pincode"],
      maxlength: 150,
    },
    vendorStatus: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", VendorSchema);

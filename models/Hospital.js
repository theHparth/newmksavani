import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const HospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: [true, "Please provide Hoapital Name"],
      maxlength: 150,
    },
    password: {
      type: String,
      select: false,
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
    },
    pincode: {
      type: Number,
      required: [true, "Please provide pincode"],
      maxlength: 5,
    },
    hospitalStatus: {
      type: Boolean,
      default: true,
    },
    lastActive: {},
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

HospitalSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

HospitalSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      hospitalId: this._id,
      hospitalName: this.hospitalName,
      hospitalStatus: this.hospitalStatus,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

HospitalSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Hospital", HospitalSchema);

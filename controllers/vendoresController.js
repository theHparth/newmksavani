import vendors from "../models/Vendor.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import { BadRequestError, NotFoundError } from "../errors/index.js";

import checkPermissions from "../utils/checkPermissions.js";

const addVendor = async (req, res) => {
  const { vendor_name, address, pincode, contect, email } = req.body;

  if (!vendor_name || !address || !pincode || !contect || !email) {
    throw new BadRequestError("Please provide all values");
  }
  const userAlreadyExists = await vendors.findOne({
    vendor_name: { $regex: vendor_name, $options: "i" },
  });
  if (userAlreadyExists) {
    throw new BadRequestError("Vendor name should be unique");
  }

  req.body.createdBy = req.user.userId;

  const vendor = await vendors.create(req.body);
  res.status(StatusCodes.CREATED).json({ vendor });
};

const onlyVendorsName = async (req, res) => {
  vendors.find({}, function (err, vendor) {
    var userMap = {};

    vendor.forEach(function (v) {
      userMap[v._id] = v.vendor_name;
    });
    if (!userMap) {
      return [];
    }
    return userMap;
  });
};

const getAllVendor = async (req, res) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = vendors.find(queryObject);

  const vendorList = await result;

  res.status(StatusCodes.OK).json({ vendorList });
};

const updateVendor = async (req, res) => {
  const { id: VendorId } = req.params;

  const { vendor_name, address, pincode, contect, email } = req.body;

  if (!vendor_name || !address || !pincode || !contect || !email) {
    throw new BadRequestError("Please provide all values");
  }
  // const userAlreadyExists = await vendors.findOne({ vendor_name });
  // if (userAlreadyExists) {
  //   throw new BadRequestError("Vendor name should be unique");
  // }
  const vendor = await vendors.findOne({ _id: VendorId });

  if (!vendor) {
    throw new NotFoundError(`No vendor data with id :${VendorId}`);
  }
  // check permissions

  checkPermissions(req.user, vendor.createdBy);

  const updatedVendor = await vendors.findOneAndUpdate(
    { _id: VendorId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedVendor });
};

const deleteVendor = async (req, res) => {
  const { id: vendorId } = req.params;

  const vendor = await vendors.findOne({ _id: vendorId });

  if (!vendor) {
    throw new NotFoundError(`No vendor data with id :${vendorId}`);
  }

  checkPermissions(req.user, vendor.createdBy);

  // await vendor.remove();
  const deactiveVendor = await vendors.findOneAndUpdate(
    { _id: vendorId },
    { vendorStatus: !vendor.vendorStatus },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ deactiveVendor });
};

export { addVendor, deleteVendor, getAllVendor, updateVendor, onlyVendorsName };

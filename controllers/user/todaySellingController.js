import TodaySellingHospital from "../../models/User/TodaySellingUser.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../../errors/index.js";
import checkPermissionsHospital from "../../utils/user/checkPermissionsHospital.js";
import { addStockQty, removeStockQty } from "./userStockController.js";
import Hospital from "../../models/Hospital.js";
import StocksHosital from "../../models/User/StocksHospital.js";

const AddtodaySellingHospital = async (req, res) => {
  const { todaySellingData } = req.body;

  req.body.createdFor = req.hospital.hospitalId;
  var createdFor = req.hospital.hospitalId;

  // if status is flase , not authorized
  var hospitalName = req.hospital.hospitalName;
  var forStatus = await Hospital.findOne({
    hospitalName,
  });
  if (!forStatus.hospitalStatus) {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }

  for (var data of todaySellingData) {
    // todaySellingData.map((data) => {
    if (!data.totalQtyInOneBox || !data.totalBox || !data.stock_name) {
      throw new BadRequestError("Please provide all values");
    }
    if (isNaN(data.totalQtyInOneBox) || isNaN(data.totalBox)) {
      throw new BadRequestError("Please enter number");
    }

    const stockData = await StocksHosital.findOne({
      stock_name: data.stock_name,
    });

    if (
      stockData &&
      stockData.totalQtyUser < data.totalQtyInOneBox * data.totalBox
    ) {
      throw new BadRequestError(
        `Only ${stockData.totalQtyUser} qty. available of ${data.stock_name} `
      );
    }

    removeStockQty(
      createdFor,
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox
    );
  }

  const todaySelling = await TodaySellingHospital.create(req.body);

  res.status(StatusCodes.CREATED).json({ todaySelling });
};

const allTodaySelling = async (req, res) => {
  const queryObject = {
    createdFor: req.hospital.hospitalId,
  };
  var hospitalStatus = req.hospital.hospitalStatus;
  if (!hospitalStatus) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  let result = TodaySellingHospital.find(queryObject);
  if (!result) {
    result = {};
  }
  result = result.sort("-createdAt");
  // result = result.reverse();
  const stockListTodaySelling = await result;

  res.status(StatusCodes.OK).json({ stockListTodaySelling });
};

const updateTodaySelling = async (req, res) => {
  const { id: stockOutId } = req.params;

  const { todaySellingData } = req.body;

  // if status is flase , not authorized
  var hospitalName = req.hospital.hospitalName;
  var forStatus = await Hospital.findOne({
    hospitalName,
  });

  const todaySellinginfo = await TodaySellingHospital.findOne({
    _id: stockOutId,
  });

  if (!todaySellinginfo) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }

  checkPermissionsHospital(
    req.hospital,
    todaySellinginfo.createdFor,
    forStatus
  );
  var createdFor = req.hospital.hospitalId;

  todaySellinginfo.todaySellingData.map((data) => {
    addStockQty(
      createdFor,
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox
    );
  });
  for (var data of todaySellingData) {
    // todaySellingData.map((data) => {
    if (!data.totalQtyInOneBox || !data.totalBox || !data.stock_name) {
      throw new BadRequestError("Please provide all values");
    }
    if (isNaN(data.totalQtyInOneBox) || isNaN(data.totalBox)) {
      throw new BadRequestError("Please enter number");
    }
    const stockData = await StocksHosital.findOne({
      stock_name: data.stock_name,
    });

    if (
      stockData &&
      stockData.totalQtyUser < data.totalQtyInOneBox * data.totalBox
    ) {
      throw new BadRequestError(
        `Only ${stockData.totalQtyUser} qty. available of ${data.stock_name} `
      );
    }

    removeStockQty(
      createdFor,
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox
    );
  }
  req.body.createdFor = req.hospital.hospitalId;
  const updatedStock = await TodaySellingHospital.findOneAndUpdate(
    { _id: stockOutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteTodaySelling = async (req, res) => {
  const { id: stockOutId } = req.params;
  var hospitalStatus = req.hospital.hospitalStatus;
  if (!hospitalStatus) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const todaySellingData = await TodaySellingHospital.findOne({
    _id: stockOutId,
  });

  if (!todaySellingData) {
    throw new NotFoundError(`No job with id :${stockOutId}`);
  }

  // if status is flase , not authorized
  var hospitalName = req.hospital.hospitalName;
  var forStatus = await Hospital.findOne({
    hospitalName,
  });

  checkPermissionsHospital(
    req.hospital,
    todaySellingData.createdFor,
    forStatus
  );

  await todaySellingData.remove();
  var createdFor = req.hospital.hospitalId;

  todaySellingData.todaySellingData.map((data) => {
    addStockQty(
      createdFor,
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox
    );
  });

  res.status(StatusCodes.OK).json({ msg: "Success! stock out data removed" });
};

export {
  AddtodaySellingHospital,
  updateTodaySelling,
  deleteTodaySelling,
  allTodaySelling,
};

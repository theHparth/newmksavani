import UserStock from "../../models/User/stockOut.js";
import StocksHosital from "../../models/User/stocksHospital.js";
import { StatusCodes } from "http-status-codes";
import Hospital from "../../models/Hospital.js";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../../errors/index.js";
import checkPermissionsHospital from "../../utils/user/checkPermissionsHospital.js";

const addStockQty = async (
  createdFor,
  stock_name,
  totalQtyInOneBox,
  totalBox
) => {
  var obId = createdFor.toString();

  await StocksHosital.updateOne(
    {
      $and: [
        { stock_name: { $regex: stock_name, $options: "i" } },
        { createdFor: obId },
      ],
    },
    {
      $inc: {
        totalQtyUser: totalQtyInOneBox * totalBox,
      },
    }
  );
};
const removeStockQty = async (
  createdFor,
  stock_name,
  totalQtyInOneBox,
  totalBox
) => {
  var obId = createdFor.toString();

  await StocksHosital.updateOne(
    {
      $and: [
        { stock_name: { $regex: stock_name, $options: "i" } },
        { createdFor: obId },
      ],
    },
    {
      $inc: {
        totalQtyUser: -(totalQtyInOneBox * totalBox),
      },
    }
  );
};

const statusController = async (req, res) => {
  const { id: stockOutId } = req.params;
  // var hospitalStatus = req.hospital.hospitalStatus;
  // console.log(hospitalStatus, "status=======");
  // if (!hospitalStatus) {
  //   throw new UnAuthenticatedError("Invalid Credentials");
  // }
  const { status } = req.body;
  const stockOutData = await UserStock.findOne({ _id: stockOutId });

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockOutId}`);
  }
  var hospitalName = req.hospital.hospitalName;
  var forStatus = await Hospital.findOne({
    hospitalName,
  });

  checkPermissionsHospital(req.hospital, stockOutData.createdFor, forStatus);
  var createdFor = stockOutData.createdFor;
  var createdBy = stockOutData.createdBy;

  stockOutData.stockOutDetail.map(async (data) => {
    var stock_name = data.stock_name;
    let result = await StocksHosital.findOne({
      $and: [
        { stock_name: { $regex: stock_name, $options: "i" } },
        { hospitalName: { $regex: hospitalName, $options: "i" } },
      ],
    });
    if (!result) {
      await StocksHosital.create({
        hospitalName,
        stock_name,
        createdFor,
        createdBy,
      });
    }
    addStockQty(
      createdFor,
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox
      // data.price
    );
  });

  if (stockOutData.status === true) {
    res
      .status(StatusCodes.OK)
      .json({ msg: "Now, you can't change delivery status" });
    return;
  }

  await UserStock.findOneAndUpdate(
    { _id: stockOutId },
    { status: true, deliveryDate: new Date() },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Success! status updated!" });
};

// const minimumTheresold = async (req, res) => {
//   var result = await UserStock.aggregate([
//     {
//       $group: {
//         _id: "$hospitalName",
//       },
//     },
//     {
//       $project: {
//         stock_name: 1,
//         totalQtyUser: 1,
//         isMinimum: { $lt: ["$totalQtyUser", "$minimumLimit"] },
//         count: 1,
//       },
//     },
//   ]);

//   res.status(StatusCodes.OK).json({ stockInDataFalseStatus, totalStock });
// };

const stockInUserFun = async (req, res) => {
  const { searchText, hospitalId, status, startDate, endDate } = req.query;

  console.log(status, "status");
  const queryObject = {
    createdFor: req.hospital.hospitalId,
    status: status,
  };
  let result = UserStock.find(queryObject);
  const stockInUser = await result;
  const totalStock = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ stockInUser, totalStock });
};

const statusTrue = async (req, res) => {
  var hospitalStatus = req.hospital.hospitalStatus;
  if (!hospitalStatus) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const { hospitalId } = req.query;
  const queryObject = {
    createdFor: req.hospital.hospitalId,
    status: true,
  };
  if (hospitalId) {
    queryObject._id = hospitalId;
  }
  let result = UserStock.find(queryObject);
  const stockInDataTrueStatus = await result;
  const totalStock = await UserStock.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ stockInDataTrueStatus, totalStock });
};

const totoalStocksInUser = async (req, res) => {
  var hospitalStatus = req.hospital.hospitalStatus;

  const queryObject = {
    createdFor: req.hospital.hospitalId,
  };
  let result = StocksHosital.find(queryObject);
  const presentStockUser = await result;

  // var result = await StocksHosital.aggregate([
  //   { $match: { $expr: { $lt: ["$totalQtyUser", "$minimumLimit"] } } },
  //   {
  //     $group: {
  //       _id: "$hospitalName",
  //       belowLimit: {
  //         $push: {
  //           stock_name: "$stock_name",
  //           totalQtyUser: "$totalQtyUser",
  //         },
  //       },
  //     },
  //   },
  // ]);

  res.status(StatusCodes.OK).json({ presentStockUser });
};

const minimumRequiremantUserChange = async (req, res) => {
  var hospitalStatus = req.hospital.hospitalStatus;
  if (!hospitalStatus) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const { id: stockId } = req.params;

  const { minimumLimit } = req.body;
  const stockOutData = await StocksHosital.findOne({ _id: stockId });

  if (!stockOutData) {
    throw new NotFoundError(`No stock data with id :${stockId}`);
  }
  var hospitalName = stockOutData.hospitalName;
  var forStatus = await Hospital.findOne({
    hospitalName,
  });
  checkPermissionsHospital(req.hospital, stockOutData.createdFor, forStatus);
  var stock_name = stockOutData.stock_name;
  var createdFor = stockOutData.createdFor;
  var totalQtyUser = stockOutData.totalQtyUser;
  var createdBy = stockOutData.createdBy;
  await StocksHosital.findOneAndUpdate(
    { _id: stockId },
    {
      minimumLimit,
      hospitalName,
      stock_name,
      createdFor,
      totalQtyUser,
      createdBy,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Success! status updated!" });
};

export {
  statusController,
  addStockQty,
  removeStockQty,
  stockInUserFun,
  statusTrue,
  totoalStocksInUser,
  minimumRequiremantUserChange,
};

import stocks from "../models/Stocks.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, NotFoundError } from "../errors/index.js";
import StocksHosital from "../models/User/stocksHospital.js";

import checkPermissions from "../utils/checkPermissions.js";
import UserStock from "../models/User/stockOut.js";

const addStockQty = async (stock_name, totalQtyInOneBox, totalBox, price) => {
  // console.log(stock_name, totalQtyInOneBox, totalBox);
  // const stock = await stocks.findOne({
  //   stock_name: { $regex: stock_name, $options: "i" },
  // });
  // console.log(stock);
  try {
    await stocks.updateOne(
      { stock_name: { $regex: stock_name, $options: "i" } },
      {
        $inc: {
          totalQty: totalBox * totalQtyInOneBox,
        },
        price,
      }
    );
  } catch (err) {
    console.log(err);
    throw new BadRequestError(
      `Something is wrong while adding value in database`
    );
  }
};
const removeStockQty = async (
  stock_name,
  totalQtyInOneBox,
  totalBox,
  price
) => {
  const stock = stocks.findOne({
    stock_name: { $regex: stock_name, $options: "i" },
  });

  if (stock.totalQty - totalBox * totalQtyInOneBox < 0) {
    console.log("limit exceed");
    throw new BadRequestError("Limit exceeded");
    // return;
    // res.status(StatusCodes.OK).json({ msg: "stock limit exceed" });
  }
  try {
    await stocks.updateOne(
      { stock_name: { $regex: stock_name, $options: "i" } },
      {
        $inc: {
          totalQty: -(totalBox * totalQtyInOneBox),
          // price: -(
          //   (stock.price / stock.totalQty) *
          //   totalBox *
          //   totalQtyInOneBox
          // ),
        },
        // price: (stock.price + price) / 2,
      }
    );
  } catch (err) {
    console.log(err);
    throw new BadRequestError(
      `Something is wrong while removing value in database`
    );
  }
};

const addStock = async (req, res) => {
  var { description, stock_name, minimumLimit } = req.body;
  // here you can remove vendor_id
  if (!description || !stock_name || !minimumLimit) {
    throw new BadRequestError("Please provide all values");
  }

  var result = {};
  result.stock_name = { $regex: stock_name, $options: "i" };
  const stockAlreadyExists = await stocks.findOne(result);

  if (stockAlreadyExists) {
    throw new BadRequestError("Stock already in Database");
  }
  req.body.createdBy = req.user.userId;

  const stock = await stocks.create(req.body);
  res.status(StatusCodes.CREATED).json({ stock });
};

const getAllStock = async (req, res) => {
  const { searchText } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (searchText) {
    queryObject.stock_name = { $regex: searchText, $options: "i" };
  }
  // NO AWAIT

  let result = stocks.find(queryObject);

  result = result.sort("-createdAt");

  const stockList = await result;

  res.status(StatusCodes.OK).json({ stockList });
};

const updateStock = async (req, res) => {
  const { id: stockId } = req.params;

  const { description, stock_name, minimumLimit } = req.body;

  if (!description || !stock_name || !minimumLimit) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await stocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No stock data with id :${stockId}`);
  }
  // check permissions

  checkPermissions(req.user, stock.createdBy);

  const updatedStock = await stocks.findOneAndUpdate(
    { _id: stockId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  await UserStock.updateMany(
    { stockOutDetail: { $elemMatch: { stock_name: stock.stock_name } } },
    { stock_name },
    {
      new: true,
      runValidators: true,
    }
  );
  await StocksHosital.updateMany(
    { stock_name: stock.stock_name },
    { stock_name },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteStock = async (req, res) => {
  const { id: stockId } = req.params;

  const stock = await stocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No job with id :${stockId}`);
  }

  checkPermissions(req.user, stock.createdBy);

  // await stock.remove();
  const deactiveStock = await stocks.findOneAndUpdate(
    { _id: stockId },
    { stockStatus: !stock.stockStatus },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ deactiveStock });
};

export {
  addStock,
  deleteStock,
  getAllStock,
  updateStock,
  addStockQty,
  removeStockQty,
};

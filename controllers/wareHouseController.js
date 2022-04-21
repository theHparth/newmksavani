import WereHouseStocks from "../models/Warehouse.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import { addStockQty, removeStockQty } from "../controllers/stockController.js";

const addStockinWereHouse = async (req, res) => {
  const { invoiceNumStockIn, vendor_name, stockInDetail, stockInNote } =
    req.body;
  if (!invoiceNumStockIn || !vendor_name || !stockInDetail) {
    throw new BadRequestError("Please provide all values");
  }
  stockInDetail.map((data) => {
    if (
      !data.totalQtyInOneBox ||
      !data.totalBox ||
      !data.stock_name ||
      !data.price
    ) {
      throw new BadRequestError("Please provide all values");
    }
    if (
      isNaN(data.totalQtyInOneBox) ||
      isNaN(data.totalBox) ||
      isNaN(data.price)
    ) {
      throw new BadRequestError("Please enter valid number");
    }
    addStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  req.body.createdBy = req.user.userId;
  const stock = await WereHouseStocks.create(req.body);
  console.log("in server werehouse", stockInDetail);
  res.status(StatusCodes.CREATED).json({ stock });
};

const getAllStockfromWereHouse = async (req, res) => {
  var { search, searchText, vendorName, startDate, endDate } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (vendorName) {
    queryObject.vendor_name = { $regex: vendorName, $options: "i" };
  }
  //  else if (searchText) {
  //   queryObject.vendor_name = { $regex: searchText, $options: "i" };
  //   queryObject.stockInDetail = {
  //     $elemMatch: {
  //       stock_name: { $regex: searchText, $options: "i" },
  //     },
  //   };
  // }

  // if (startDate) {
  //   queryObject.createdAt = { $gte: startDate };
  //   queryObject.createdAt = { $lte: endDate };
  // }
  let result;
  if (!searchText && !startDate) {
    result = WereHouseStocks.find(queryObject);
  } else {
    if (isNaN(searchText) === false) {
      queryObject.invoiceNumStockIn = searchText;
      searchText = parseInt(searchText);
      result = WereHouseStocks.find(queryObject);
    } else if (startDate) {
      console.log("startDate", startDate, "endDate", endDate);

      if (!searchText) {
        searchText = "";
      }
      // queryObject.createdAt = { $gte: startDate };
      // queryObject.createdAt = { $lte: endDate };
      result = WereHouseStocks.find({
        $and: [
          queryObject,
          {
            createdAt: {
              $gte: startDate,
            },
          },
          {
            createdAt: {
              $lte: endDate,
            },
          },
          {
            $or: [
              { vendor_name: { $regex: searchText, $options: "i" } },
              {
                stockInDetail: {
                  $elemMatch: {
                    stock_name: { $regex: searchText, $options: "i" },
                  },
                },
              },
            ],
          },
        ],
      });
    } else {
      result = WereHouseStocks.find({
        $and: [
          queryObject,
          {
            $or: [
              { vendor_name: { $regex: searchText, $options: "i" } },
              {
                stockInDetail: {
                  $elemMatch: {
                    stock_name: { $regex: searchText, $options: "i" },
                  },
                },
              },
            ],
          },
        ],
      });
    }
  }
  if (result) {
    result = result.sort("-createdAt");
  }

  const stockList = await result;

  res.status(StatusCodes.OK).json({ stockList });
};

const updateStockfromWereHouse = async (req, res) => {
  const { id: stockId } = req.params;

  const { invoiceNumStockIn, vendor_name, stockInDetail, stockInNote } =
    req.body;
  if (!invoiceNumStockIn || !vendor_name || !stockInDetail) {
    throw new BadRequestError("Please provide all values");
  }

  const stock = await WereHouseStocks.findOne({ _id: stockId });

  if (!stock) {
    throw new NotFoundError(`No stock data in werehouse with id :${stockId}`);
  }
  // check permissions

  checkPermissions(req.user, stock.createdBy);

  stockInDetail.map((data) => {
    if (
      !data.totalQtyInOneBox ||
      !data.totalBox ||
      !data.stock_name ||
      !data.price
    ) {
      throw new BadRequestError("Please provide all values");
    }
    if (
      isNaN(data.totalQtyInOneBox) ||
      isNaN(data.totalBox) ||
      isNaN(data.price)
    ) {
      throw new BadRequestError("Please enter valid number");
    }
    addStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  stock.stockInDetail.map((data) => {
    removeStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  const updatedStock = await WereHouseStocks.findOneAndUpdate(
    { _id: stockId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  // removeStockQty(
  //   stock.stock_name,
  //   stock.totalQtyInOneBox,
  //   stock.totalBox,
  //   stock.price
  // );
  // addStockQty(stock_name, totalQtyInOneBox, totalBox, price);

  res.status(StatusCodes.OK).json({ updatedStock });
};

const deleteStockfromWereHouse = async (req, res) => {
  const { id: stockId } = req.params;
  const stock = await WereHouseStocks.findOne({ _id: stockId });
  // console.log(stock);

  if (!stock) {
    throw new NotFoundError(`No stock data in werehouse with id :${stockId}`);
  }

  checkPermissions(req.user, stock.createdBy);

  stock.stockInDetail.map((data) => {
    removeStockQty(
      data.stock_name,
      data.totalQtyInOneBox,
      data.totalBox,
      data.price
    );
  });

  await stock.remove();

  // await WereHouseStocks.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Stock data from werehouse is removed" });
};

export {
  addStockinWereHouse,
  deleteStockfromWereHouse,
  getAllStockfromWereHouse,
  updateStockfromWereHouse,
};

import StocksHosital from "../models/User/StocksHospital.js";
import { StatusCodes } from "http-status-codes";
import TodaySellingHospital from "../models/User/TodaySellingUser.js";

const minimumThresold = async (req, res) => {
  var result = await StocksHosital.aggregate([
    { $match: { $expr: { $lt: ["$totalQtyUser", "$minimumLimit"] } } },
    {
      $group: {
        _id: "$hospitalName",
        belowLimit: {
          $push: {
            stock_name: "$stock_name",
            totalQtyUser: "$totalQtyUser",
            minimumLimit: "$minimumLimit",
          },
        },
      },
    },
  ]);

  const minimumThresoldData = result;
  // console.log("call in backend minimumThresoldData", minimumThresoldData);
  res.status(StatusCodes.OK).json({ minimumThresoldData });
};
const hospitalStockViewAdmin = async (req, res) => {
  const { searchText, id } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (id) {
    queryObject.createdFor = id;
  }
  if (searchText) {
    console.log("searchText", searchText);
    queryObject.stock_name = { $regex: searchText, $options: "i" };
  }

  let result = StocksHosital.find(queryObject);
  const hospitalPresentStock = await result;

  res.status(StatusCodes.OK).json({ hospitalPresentStock });
};
const hospitalSellings = async (req, res) => {
  const { searchText, id } = req.query;
  const queryObject = {
    createdFor: id,
  };

  let result = TodaySellingHospital.find(queryObject);

  const hospitalSelling = await result;

  res.status(StatusCodes.OK).json({ hospitalSelling });
};

export { hospitalStockViewAdmin, minimumThresold, hospitalSellings };

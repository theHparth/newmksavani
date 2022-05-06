import StocksOut from "../models/User/StocksOut.js";
import { StatusCodes } from "http-status-codes";

const filterDataCalculation = async (req, res) => {
  // var { getQtyByStockName, searchDate, getStockByHospitalName } = req.body;
  var {
    startDate,
    endDate,
    searchText,
    getStockByHospitalName,
    getQtyByStockName,
    searchStock,
  } = req.query;

  var result;
  if (!searchText) {
    searchText = "";
  }
  if (!searchStock) {
    searchStock = "";
  }
  var new_dates = [];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  new_dates = [];

  function aaa(d) {
    var str = d.split(" ");
    var mon = ("0" + (months.indexOf(str[1]) + 1)).slice(-2);
    new_dates.push(str[3] + "-" + mon + "-" + str[2]);
  }
  if (startDate) {
    aaa(startDate);
    aaa(endDate);
  }

  console.log(new_dates, "new_dates");
  result = await StocksOut.aggregate([
    {
      $project: {
        hospitalName: 1,
        stockOutDetail: 1,
        createdAt: {
          $substr: ["$createdAt", 0, 10],
        },
      },
    },
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: new_dates[0],
              $lte: new_dates[1],
            },
          },
          { hospitalName: { $regex: searchText, $options: "i" } },
          {
            stockOutDetail: {
              $elemMatch: {
                stock_name: { $regex: searchStock, $options: "i" },
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$stockOutDetail",
    },
    {
      $group: {
        _id: {
          hospitalName: "$hospitalName",
          name: "$stockOutDetail.stock_name",
        },
        summ: {
          $sum: {
            $multiply: [
              { $toInt: "$stockOutDetail.totalBox" },
              { $toInt: "$stockOutDetail.totalQtyInOneBox" },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id.hospitalName",
        stockInfo: {
          $push: {
            itemName: "$_id.name",
            totalQty: "$summ",
          },
        },
      },
    },
  ]);

  if (getStockByHospitalName) {
    result = await StocksOut.aggregate([
      {
        $match: {
          $and: [
            { hospitalName: { $regex: getStockByHospitalName, $options: "i" } },
            // { createdBy: req.user.userId },
          ],
        },
      },
      { $unwind: "$stockOutDetail" },
      {
        $group: {
          _id: "$stockOutDetail.stock_name",
          "total Qty": {
            $sum: {
              $multiply: [
                { $toInt: "$stockOutDetail.totalBox" },
                { $toInt: "$stockOutDetail.totalQtyInOneBox" },
              ],
            },
          },
        },
      },
    ]);
  }

  if (getQtyByStockName) {
    result = await StocksOut.aggregate([
      { $unwind: "$stockOutDetail" },
      {
        $group: {
          _id: "$stockOutDetail.stock_name",
          "total Qty": {
            $sum: {
              $multiply: [
                { $toInt: "$stockOutDetail.totalBox" },
                { $toInt: "$stockOutDetail.totalQtyInOneBox" },
              ],
            },
          },
        },
      },
    ]);
  }
  if (!result) {
    result = "no Data";
  }
  // if (searchText) {
  //   result = result.filter((data) => {
  //     return data._id == searchText;
  //   });
  // }

  var filterDataBack = result;
  // }
  res.status(StatusCodes.OK).json({ filterDataBack });
};

export { filterDataCalculation };

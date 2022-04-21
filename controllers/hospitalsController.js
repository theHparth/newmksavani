import Hospital from "../models/Hospital.js";
import { StatusCodes } from "http-status-codes";
import StocksHosital from "../models/User/stocksHospital.js";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
// import dotenv from "dotenv";
// dotenv.config();
// import nodemailer from "nodemailer";
import checkPermissions from "../utils/checkPermissions.js";
import UserStock from "../models/User/stockOut.js";

// import { google } from "googleapis";
// const OAuth2 = google.auth.OAuth2;
// // import OAuth2 from "google.auth.OAuth2";
// import http from "http";

// const oauth2Client = new OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN,
// });

// const accessToken = new Promise((resolve, reject) => {
//   oauth2Client.getAccessToken((err, token) => {
//     // console.log(token);
//     // if (err) {
//     //   reject("Failed to create access token :(");
//     // }
//     // return token;
//     resolve(token);
//   });
// });

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.USER_NAME,
//     accessToken,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });
// require("dotenv").config();

// var transporter = nodemailer.createTransport({
//   service: process.env.SMTP_SERVICE,
//   secure: false,
//   auth: {
//     user: process.env.USER_NAME,
//     pass: process.env.USER_PASSWORD,
//   },
// });

const registerHospital = async (req, res) => {
  const { address, pincode, contect, email, hospitalName, password } = req.body;

  if (
    !address ||
    !pincode ||
    !contect ||
    !email ||
    !hospitalName ||
    !password
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await Hospital.findOne({
    $or: [
      { hospitalName: { $regex: hospitalName, $options: "i" } },
      { email: { $regex: email, $options: "i" } },
    ],
  });
  // const userAlreadyExists = await Hospital.findOne({ email, hospitalName });
  if (userAlreadyExists) {
    throw new BadRequestError("Email or Hospital name already exists");
  }

  req.body.createdBy = req.user.userId;
  // console.log(req.body);
  const hospital = await Hospital.create(req.body);
  // var mailOptions = {
  //   from: process.env.MAIL_FROM,
  //   to: req.body.email,
  //   subject: "Thank you for being a part of this hospital",
  //   html: mailhospitalregistration(hospital),
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  res.status(StatusCodes.CREATED).json({ hospital });
};

const getAllHospital = async (req, res) => {
  const { status, sort, search, hospitalId, hospitalName } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (hospitalId) {
    queryObject._id = hospitalId;
  }
  if (hospitalName) {
    queryObject.hospitalName = { $regex: hospitalName, $options: "i" };
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Hospital.find(queryObject);
  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const hospitals = await result;
  // console.log(hospitals);

  const totalHospitals = await Hospital.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalHospitals / limit);
  // numOfPages;
  res.status(StatusCodes.OK).json({ hospitals, totalHospitals });
};

const updateHospital = async (req, res) => {
  const { id: hospitalId } = req.params;

  const { address, pincode, contect, email, hospitalName } = req.body;

  if (!address || !pincode || !contect || !email || !hospitalName) {
    throw new BadRequestError("Please provide all values");
  }

  const hospital = await Hospital.findOne({ _id: hospitalId });

  if (!hospital) {
    throw new NotFoundError(`No Hospital with id :${hospitalId}`);
  }
  // const userAlreadyExists = await Hospital.findOne({ email });
  // if (Object.keys(userAlreadyExists).length > 1) {
  //   throw new BadRequestError("Email is used");
  // }
  // const userAlreadyExistsUsername = await Hospital.findOne({ hospitalName });
  // if (userAlreadyExistsUsername) {
  //   throw new BadRequestError("Username is already taken");
  // }
  // check permissions

  checkPermissions(req.user, hospital.createdBy);

  const updatedHospital = await Hospital.findOneAndUpdate(
    { _id: hospitalId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  await UserStock.updateMany(
    { createdFor: hospitalId },
    { hospitalName },
    {
      new: true,
      runValidators: true,
    }
  );
  await StocksHosital.updateMany(
    { createdFor: hospitalId },
    { hospitalName },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedHospital });
};

const deleteHospital = async (req, res) => {
  const { id: hospitalId } = req.params;

  const hospital = await Hospital.findOne({ _id: hospitalId });
  console.log(hospital);
  if (!hospital) {
    throw new NotFoundError(`No job with id :${hospitalId}`);
  }

  checkPermissions(req.user, hospital.createdBy);

  // await hospital.remove();
  const deactiveHospital = await Hospital.findOneAndUpdate(
    { _id: hospitalId },
    { hospitalStatus: !hospital.hospitalStatus },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ deactiveHospital });
};

export { registerHospital, deleteHospital, getAllHospital, updateHospital };

// const showStats = async (req, res) => {
//   let stats = await Job.aggregate([
//     { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
//     { $group: { _id: "$status", count: { $sum: 1 } } },
//   ]);
//   stats = stats.reduce((acc, curr) => {
//     const { _id: title, count } = curr;
//     acc[title] = count;
//     return acc;
//   }, {});

//   const defaultStats = {
//     pending: stats.pending || 0,
//     interview: stats.interview || 0,
//     declined: stats.declined || 0,
//   };

//   let monthlyApplications = await Job.aggregate([
//     { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
//     {
//       $group: {
//         _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
//         count: { $sum: 1 },
//       },
//     },
//     { $sort: { "_id.year": -1, "_id.month": -1 } },
//     { $limit: 6 },
//   ]);
//   monthlyApplications = monthlyApplications
//     .map((item) => {
//       const {
//         _id: { year, month },
//         count,
//       } = item;
//       const date = moment()
//         .month(month - 1)
//         .year(year)
//         .format("MMM Y");
//       return { date, count };
//     })
//     .reverse();

//   res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
// };

function mailhospitalregistration(hospital) {
  var strTemplate =
    '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">';
  strTemplate +=
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="viewport" content="width=device-width, initialscale=1.0"><meta name="x-apple-disable-message-reformatting"><!--[if mso]><style>table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}div, td {padding:0;}div {margin:0 !important;}</style><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]--><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"rel="stylesheet"><style type="text/css">@media only screen and (max-width: 480px), only screen and (max-device-width: 480px) {*{box-sizing: border-box !important;}body{margin: 0 !important; padding: 0 !important;width:100%!important;}img{max-width: 100%!important;max-height: 100% !important; width: auto; height: auto;}.mainTable, .mainTable tbody, .mainTable tr{display: block !important; min-width: 100%; max-width: 100% !important; width: 100% !important;}.m-fullTd{display: block !important; min-width: 100%; width: 100% !important; height: 100% !important; max-width: 100% !important;padding-left: 15px !important;padding-right: 15px !important;}ul.carcolleclist li{font-size: 24px !important;}p{font-size: 14px !important;width: 100% !important;}.conTitle{font-size: 30px !important;padding-bottom: 20px !important;}.headerLogo, .footerMainLogo{width: 170px !important;}}</style></head>';
  strTemplate +=
    ' <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"rel="stylesheet"><style type="text/css">@media only screen and (max-width: 480px), only screen and (max-device-width: 480px) {*{box-sizing: border-box !important;}body{margin: 0 !important; padding: 0 !important;width:100%!important;}img{max-width: 100%!important;max-height: 100% !important; width: auto; height: auto;}.mainTable, .mainTable tbody, .mainTable tr{display: block !important; min-width: 100%; max-width: 100% !important; width: 100% !important;}.m-fullTd{display: block !important; min-width: 100%; width: 100% !important; height: 100% !important; max-width: 100% !important;padding-left: 15px !important;padding-right: 15px !important;}ul.carcolleclist li{font-size: 24px !important;}p{font-size: 14px !important;width: 100% !important;}.conTitle{font-size: 30px !important;padding-bottom: 20px !important;}.headerLogo, .footerMainLogo{width: 170px !important;}}</style></head>';
  strTemplate +=
    '<body style="margin: 0px;padding: 0px;word-spacing:normal;"><div role="article" aria-roledescription="email" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;"><center><table width="100%" bgcolor="#ffffff" align="center" cellspacing="0" cellpadding="0" style="width: 100%;border: none;border-spacing: 0; padding: 0px !important;"><tr><td align="center" style="padding: 0;margin: 0;"><table class="mainTable" width="800" bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0" style="padding: 0px !important;"><tr><td class="header m-fullTd" align="center" style="display: block !important; padding: 55px 0 50px 0;"><a href="' +
    process.env.SITE_FRONT +
    '"title="illuso-off-marketplace" style="display: block;"><img class="headerLogo" src="' +
    process.env.SITE_PATH +
    '/images/logoblack.png"alt="illuso-off-marketplace-logo" /></a></td></tr><tr><td class="m-fullTd" align="center" valign="top"><!--[if gte MSO 9]><table width="800"><tr><td><![endif]--><table width="100%" style="max-width:800px;" align="center" border="0" cellspacing="0" cellpadding="0"><tr><td align="center"><img src="' +
    process.env.SITE_PATH +
    '/images/bannerimg1.jpg" alt="" /></td></tr></table><!--[if gte MSO 9]></td></tr></table><![endif]--></td></tr>';
  strTemplate +=
    '<tr><td class="conentMain m-fullTd" style="padding:0px 60px 50px 60px;"><div class="conentMainInner"><h3 class="conTitle"style="font-family: \'Poppins\', sans-serif; font-size: 44px; font-weight:800; color: #000000; line-height:1.1; padding:0px 0px 35px; margin:0px;text-align: left;">Hi ' +
    hospital.name +
    "</h3>";
  strTemplate +=
    "<p style=\"display:block;font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height:1.4; color:#000000; margin:auto;text-align: left;width: 100%;margin-bottom: 20px;\">Great job! You have successfully submitted a vehicle for inclusion in your private Off-Market listing. Your listings showcase your exotic car collection to other users in our Off-Market Community. You will receive another email when this vehicle has been approved for inclusion in your collection.  </p>";
  strTemplate +=
    "<p style=\"display:block;font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height:1.4; color:#000000; margin:auto;text-align: left;width: 100%;margin-bottom: 20px;\">In order to ensure only prime exotic vehicles are included in our community, each vehicle submission is verified and approved by our team. Thank you for your submission, and your participation in the iLusso Off-Market Community. </p>";
  strTemplate +=
    " <p style=\"display:block;font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height:1.4; color:#000000; margin:auto;text-align: left;width: 100%;margin-bottom: 0px;\">Sincerely,</p>";
  strTemplate +=
    " <p style=\"display:block;font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height:1.4; color:#000000; margin:auto;text-align: left;width: 100%;margin-bottom: 0px;\">The iLusso Off-Market Team</p></div></td></tr>";
  strTemplate += "</table></td></tr></table></center></div></body></html>";
  return strTemplate;
}

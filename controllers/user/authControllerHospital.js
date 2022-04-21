import Hospital from "../../models/Hospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../../errors/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const hospital = await Hospital.findOne({
    email: { $regex: email, $options: "i" },
  }).select("+password");
  // for date of last active
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  var fullDate =
    year +
    "/" +
    month +
    "/" +
    date +
    " - " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  await Hospital.findOneAndUpdate(
    { email },
    {
      lastActive: fullDate,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!hospital || !hospital.hospitalStatus) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await hospital.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  var hospitalSend = {
    hospitalName: hospital.hospitalName,
    address: hospital.address,
    pincode: hospital.pincode,
    contect: hospital.contect,
    email: hospital.email,
  };
  const tokenHospital = hospital.createJWT();
  hospital.password = undefined;
  res.status(StatusCodes.OK).json({ tokenHospital, hospital: hospitalSend });
};

const update = async (req, res) => {
  const { hospitalName, address, contect, email, pincode } = req.body;
  if (!hospitalName || !address || !contect || !email || !pincode) {
    throw new BadRequestError("Please provide all values");
  }
  console.log("-----------------------");
  console.log(req.hospital);
  const hospital = await Hospital.findOne({
    _id: req.hospital.hospitalId,
  });

  hospital.hospitalName = hospitalName;
  hospital.email = email;
  hospital.address = address;
  hospital.contect = contect;
  hospital.pincode = pincode;

  await hospital.save();

  const tokenHospital = hospital.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ hospital, tokenHospital, hospitalName: hospital.hospitalName });
};

export { login, update };

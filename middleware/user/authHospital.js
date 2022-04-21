import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../../errors/index.js";

UnAuthenticatedError;
const authHospital = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const tokenHospital = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(tokenHospital, process.env.JWT_SECRET);
    req.hospital = {
      hospitalId: payload.hospitalId,
      hospitalName: payload.hospitalName,
      hospitalStatus: payload.hospitalStatus,
    };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authHospital;

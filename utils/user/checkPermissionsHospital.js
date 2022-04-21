import { UnAuthenticatedError } from "../../errors/index.js";
import Hospital from "../../models/Hospital.js";

const checkPermissionsHospital = (requestUser, resourceUserId, forStatus) => {
  if (
    requestUser.hospitalId === resourceUserId.toString() &&
    forStatus.hospitalStatus
  )
    return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissionsHospital;

// import { UnAuthenticatedError } from "../errors/index.js";

// const checkPermissions = (requestUser, resourceUserId) => {
//   if (requestUser.userId === resourceUserId.toString()) return;

//   throw new UnAuthenticatedError("Not authorized to access this route");
// };

// export default checkPermissions;

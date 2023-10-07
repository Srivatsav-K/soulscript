import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import User from "src/app/models/user";
import { UserDetailsRequest } from "src/types";
import { unauthorisedErrorResponse } from "src/utils/errorHandlers";

export const authenticateUser = async (
  req: UserDetailsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("X-Auth");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      unauthorisedErrorResponse(res);
    } else {
      const privateKey = process.env.JWT_SECRET;
      if (privateKey) {
        const tokenData: any = verify(token, privateKey);

        const foundUser = await User.findById(tokenData._id, "-password");
        if (foundUser) {
          req.user = foundUser;
          next();
        } else {
          unauthorisedErrorResponse(res);
        }
      } else {
        unauthorisedErrorResponse(res);
      }
    }
  } catch (e) {
    unauthorisedErrorResponse(res, e);
  }
};

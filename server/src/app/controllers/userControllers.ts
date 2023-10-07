import { Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { Controller, UserDetailsRequest } from "src/types";
import User from "../models/user";
import {
  handleErrorResponse,
  unauthorisedErrorResponse,
} from "src/utils/errorHandlers";

const signup: Controller = async (req, res) => {
  try {
    const body = req.body;

    const user = new User(body);

    await user.save();

    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json(userWithoutPassword);
  } catch (e) {
    handleErrorResponse(res, e);
  }
};

const login: Controller = async (req, res) => {
  try {
    const body = req.body;
    const foundUser = await User.findOne({ email: body?.email });
    if (foundUser) {
      const passwordMatch = await compare(body.password, foundUser.password);
      if (passwordMatch) {
        const payload = {
          _id: foundUser._id,
          username: foundUser.username,
        };

        const privateKey = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRY_DURATION;

        if (privateKey && expiresIn) {
          const token = sign(payload, privateKey, {
            expiresIn,
          });

          res.status(200).json({ token: `Bearer ${token}` });
        } else {
          unauthorisedErrorResponse(res);
        }
      } else {
        unauthorisedErrorResponse(res);
      }
    } else {
      unauthorisedErrorResponse(res);
    }
  } catch (e) {
    handleErrorResponse(res, e);
  }
};

const details = async (req: UserDetailsRequest, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    handleErrorResponse(res, e);
  }
};

const userControllers = {
  signup,
  login,
  details,
};

export default userControllers;

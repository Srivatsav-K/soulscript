import { Response } from "express";
import { CallbackWithoutResultAndOptionalError } from "mongoose";

export const handleErrorResponse = (res: Response, e: any): void => {
  if (e?.name === "ValidationError") {
    // Handle validation errors (e.g., missing fields)
    res.status(400).json({ error: "Validation failed", e });
  } else if (e?.name === "MongoError" && e?.code === 11000) {
    // Handle duplicate key error (e.g., email already exists)
    res.status(409).json({ error: "Duplicate record", e });
  } else {
    // Handle other unexpected errors
    console.log(e);
    res.status(500).json({ error: "Internal Server Error", e });
  }
};

export const unauthorisedErrorResponse = (res: Response, e?: any) => {
  res
    .status(401)
    .json({ error: "Unauthorized", message: "Authentication failed", ...e });
};

export const handleMiddleWareError = (
  next: CallbackWithoutResultAndOptionalError,
  e: unknown
) => {
  if (e instanceof Error) {
    next(e);
  } else {
    next(new Error("Something went wront", { cause: e }));
  }
};

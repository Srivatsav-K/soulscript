import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcryptjs";

import isEmail from "validator/es/lib/isEmail";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import uniqueValidator from "mongoose-unique-validator";

import { handleMiddleWareError } from "src/utils/errorHandlers";

import type { UserSchema } from "types";

const userSchema = new Schema<UserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 64,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          return isEmail(value);
        },
        message: (props) => {
          return `${props.value} is an invalid email`;
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
          });
        },
        message: function () {
          return "Password must contain at least 1 uppercase character,lowercase character,number & a special character";
        },
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "{PATH} exists" });

userSchema.pre("save", async function (next) {
  try {
    const salt = await genSalt();
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
  } catch (e) {
    handleMiddleWareError(next, e);
  }
});

const User = model<UserSchema>("User", userSchema);

export default User;

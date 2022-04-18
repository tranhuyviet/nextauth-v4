import { IUserDocument } from "./../../../utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { resError, resSuccess } from "../../../utils/returnRes";
import errorParse from "../../../utils/errorParse";
import {
  signupCredentialsValidate,
  signupProvidersValidate,
} from "../../../utils/validate";
import userService from "../../../services/userService";
import User from "../../../models/userModel";
import db from "../../../utils/db";
import providerList from "../../../utils/providerList";

const handler = nc();

// signup user
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let user: IUserDocument;
    //connect database
    await db.connect();

    if (providerList.includes(req.body.provider)) {
      await signupProvidersValidate.validate(req.body, { abortEarly: false });

      const { name, email, image, provider } = req.body;

      // check email exist
      const isExistUser = await userService.findUserByEmail(email as string);

      // if email is not exist -> create new user in database
      if (!isExistUser) {
        user = new User({ name, email, image, provider });
        // save new user
        await userService.save(user);
      } else {
        // update user
        user = isExistUser;
      }

      return resSuccess(res, { user: user.returnAuthUser() });
    } else if (req.body.provider === "credentials") {
      await signupCredentialsValidate.validate(req.body, { abortEarly: false });

      const { name, email, password } = req.body;

      // check email exist
      const isExistUser = await userService.findUserByEmail(email as string);

      // if email exist
      if (isExistUser) {
        return resError(
          res,
          "Conflict",
          {
            email:
              "Email is already taken, please enter another email address.",
          },
          409
        );
      }
      // create new user
      user = new User({ name, email });

      // hash password
      user.hashPassword(password);

      // save user
      await userService.save(user);
      return resSuccess(res, { user: user.returnAuthUser() });
    } else {
      return resError(
        res,
        "BadRequest",
        {
          email: "Must be have provider",
        },
        400
      );
    }

    // return user
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      const errors = errorParse(error);
      return resError(res, "Bad Request Error - Validate Input", errors, 400);
    }
    return resError(
      res,
      "Something went wrong",
      { global: "Something went wrong" },
      500
    );
  }
});

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { resError, resSuccess } from "../../../utils/returnRes";
import errorParse from "../../../utils/errorParse";
import { loginCredentialsValidate } from "../../../utils/validate";
import userService from "../../../services/userService";
import db from "../../../utils/db";

const handler = nc();

// login user
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // validate login body
    await loginCredentialsValidate.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;

    //connect database
    await db.connect();

    // find user by email
    const user = await userService.findUserByEmail(email);

    // check user is exist by login another providers
    console.log(user);
    if (user?.provider !== "credentials") {
      return resError(
        res,
        "Unauthrized",
        {
          global:
            "This email address is already in use by log in with " +
            user?.provider,
        },
        401
      );
    }

    // check email and correct password
    // if email or password wrong -> only return errors.global = 'Invalid credentials'
    // not return: 'Email incorrect' or 'Password incorrect'
    if (!user || !user.isValidPassword(password))
      return resError(
        res,
        "Unauthrized",
        {
          global: "Wrong email or password.",
        },
        401
      );

    // check user banned (true)
    if (user.banned)
      return resError(
        res,
        "Not Acceptable",
        { global: "This user is banned. Please contact to admin" },
        406
      );

    // return user
    return resSuccess(res, { user: user.returnAuthUser() });
  } catch (error) {
    console.log("ERRRRR", error);
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

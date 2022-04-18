import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { resError } from "../utils/returnRes";
import { secret } from "./config";

const checkAuthApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return resError(
        res,
        "Unauthorized",
        {
          global: "You are not logged in",
        },
        401
      );
    }
  } catch (error) {
    return resError(
      res,
      "Unauthorized",
      {
        global: "You are not logged in",
      },
      401
    );
  }
};

export default checkAuthApi;

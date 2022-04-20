import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { resError, resSuccess } from "../../../utils/returnRes";
import errorParse from "../../../utils/errorParse";
import { postValidate } from "../../../utils/validate";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { secret } from "../../../lib/config";
import checkAuthApi from "../../../lib/checkAuthApi";
import Post from "../../../models/postModel";
import postService from "../../../services/postService";

const handler = nc();

// add new post
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check authentication
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

    // validate post body
    await postValidate.validate(req.body, { abortEarly: false });

    const { content } = req.body;

    // create new post
    const newPost = new Post({
      content,
      user: token._id,
    });

    // create slug
    // newPost.createUniqueSlug(title);

    //connect database
    await db.connect();

    // save post to Database
    const post = await postService.save(newPost);

    return resSuccess(res, { post });
  } catch (error) {
    console.log(error);
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

// get posts
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check authentication
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

    //connect database
    await db.connect();

    // save post to Database
    const posts = await postService.getPosts();

    return resSuccess(res, { posts });
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

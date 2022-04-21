import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { resError, resSuccess } from "../../../utils/returnRes";
import errorParse from "../../../utils/errorParse";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { secret } from "../../../lib/config";
import postService from "../../../services/postService";
import { postValidate } from "../../../utils/validate";
import User from "../../../models/userModel";

const handler = nc();

// delete post by Id
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
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

    const { postId } = req.query;

    //connect database
    await db.connect();

    // check postId is correct
    const post = await postService.getPostById(postId as string);

    if (!post) {
      return resError(
        res,
        "Not Found",
        {
          global: "Not fount the post",
        },
        401
      );
    }

    // check the post belong the user authenticated
    if (post.user.toString() !== token._id) {
      return resError(
        res,
        "Not Allowed",
        {
          global: "You do not have permission to delete the post",
        },
        405
      );
    }

    // delete the post
    await postService.deletePost(postId as string);

    return resSuccess(res, null);
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

// edit post by Id
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
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

    const { postId } = req.query;
    const { content } = req.body;

    //connect database
    await db.connect();

    // check postId is correct
    const post = await postService.getPostById(postId as string);

    if (!post) {
      return resError(
        res,
        "Not Found",
        {
          global: "Not fount the post",
        },
        401
      );
    }

    // check the post belong the user authenticated
    if (post.user.toString() !== token._id) {
      return resError(
        res,
        "Not Allowed",
        {
          global: "You do not have permission to edit the post",
        },
        405
      );
    }

    // update the post
    const updatedPost = await postService.updatePost(postId as string, content);

    return resSuccess(res, { post: updatedPost });
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

// get post by Id
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

    const { postId } = req.query;

    //connect database
    await db.connect();

    // get post by Id
    const post = await postService.getPostById(postId as string);

    if (!post) {
      return resError(
        res,
        "Not Found",
        {
          global: "Not fount the post",
        },
        401
      );
    }

    // populate
    await post.populate({
      path: "user",
      select: "name image",
      model: User,
    });

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

export default handler;

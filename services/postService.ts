import { IPostDocument } from "./../utils/types";
import Post from "../models/postModel";
import User from "../models/userModel";

const save = async (post: IPostDocument): Promise<IPostDocument> => {
  return post.save();
};

const getPosts = async (): Promise<IPostDocument[]> => {
  return Post.find().populate({
    path: "user",
    select: "name image",
    model: User,
  });
};

const postService = { save, getPosts };

export default postService;

import { IPostDocument } from "./../utils/types";
import Post from "../models/postModel";

const save = async (post: IPostDocument): Promise<IPostDocument> => {
  return post.save();
};

const postService = { save };

export default postService;

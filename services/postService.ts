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

const getPostById = async (postId: string): Promise<IPostDocument | null> => {
  return Post.findById(postId);
};

const deletePost = async (postId: string): Promise<null> => {
  return Post.findByIdAndDelete(postId);
};

const updatePost = async (
  postId: string,
  content: string
): Promise<IPostDocument | null> => {
  return Post.findByIdAndUpdate(postId, { content }, { new: true });
};

const postService = { save, getPosts, getPostById, deletePost, updatePost };

export default postService;

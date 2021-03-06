import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// postSchema.methods.createUniqueSlug = function createUniqueSlug(title: string) {
//   this.slug = title.split(" ").join("-") + "-" + Date.now();
// };

const Post = models.posts || model("posts", postSchema);

export default Post;

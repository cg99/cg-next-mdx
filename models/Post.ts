import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    featuredImage: String,
    categories: [{ title: String, id: String }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

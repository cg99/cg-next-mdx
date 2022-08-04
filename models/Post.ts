import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    featuredImage: String,
    categories: [{ label: String, value: String }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  featuredImage: String,
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

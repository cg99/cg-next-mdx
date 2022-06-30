import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    featuredImage: String,
    category: [ObjectId],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

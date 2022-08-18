const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

postSchema.plugin(mongoosePaginate);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

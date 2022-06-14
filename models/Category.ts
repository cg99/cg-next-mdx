import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
  title: String,
  parent: ObjectId,
  children: [ObjectId],
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

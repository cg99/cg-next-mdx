const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
  title: String,
  parent: ObjectId,
  slug: String,
});

categorySchema.plugin(mongoosePaginate);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

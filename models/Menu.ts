import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const menuSchema = new mongoose.Schema({
  id: ObjectId,
  title: String,
  type: String,
  url: String,
  priority: Number,
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;

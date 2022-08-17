/*
 categories api -
  get category, categories
  post category
  update category
  delete category 
 */

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../../utils/db";
// import Post from "../../../models/Post";
import Category from "../../../models/Category";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const handler = nc()
  // .use(withAuth)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryId = req.query.id;

    try {
      if (categoryId) {
        const category = await Category.findById(categoryId);
        return res
          .status(200)
          .json({ success: true, message: "Get Post Successful", category });
      }

      const categories = await Category.find();
      return res
        .status(200)
        .json({ success: true, message: "Get Posts Successful", categories });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    let categoryContent = req.body;
    const categoryId = req.query.id;

    try {
      if (categoryId) {
        // Update Category
        await Category.findByIdAndUpdate(
          categoryId,
          categoryContent,
          (err, docs) => {
            if (err) {
              res
                .status(500)
                .json({ success: false, message: "Failed to update. " + err });
            }
            return res.status(200).json({
              success: true,
              message: "Category updated successfully",
              category: docs,
            });
          }
        )
          .clone()
          .catch((err) => console.log(err, "outputtin error"));
      } else {
        // create category
        const category = await Category.create(categoryContent);
        const response = await category.save();
        if (response) {
          return res.status(200).json({ success: true, category });
        }
        return res
          .status(500)
          .json({ success: false, message: "Failed to append" });
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await Category.deleteOne({ _id: req.query.id });
      if (response.deletedCount === 1) {
        return res.status(200).json({ success: true });
      }
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

export default connectDB(handler);

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
        res
          .status(200)
          .json({ success: true, message: "Get Post Successful", category });
      }

      const categories = await Category.find();
      res
        .status(200)
        .json({ success: true, message: "Get Posts Successful", categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryContent = req.body;
    const categoryId = req.query.id;

    // console.log(categoryContent);
    try {
      if (categoryId) {
        // Update Category
        const category = await Category.findById(categoryId);
        if (category) {
          const updatedCategory = await Category.updateOne(
            { _id: categoryId },
            categoryContent
          );
          // console.log(updatedCategory);
          if (updatedCategory.acknowledged) {
            return res.status(200).json({
              success: true,
              message: "Post updated successfully",
            });
          }
          res
            .status(500)
            .json({ success: false, message: "Failed to update. " });
        }
        res.status(500).json({
          success: false,
          message: "Failed to update. Post not found.",
        });
      } else {
        // create category
        const category = await Category.create(categoryContent);
        const response = await category.save();
        if (response) {
          res.status(200).json({ success: true, category });
        }
        res.status(500).json({ success: false, message: "Failed to append" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await Category.deleteOne({ _id: req.query.id });
      if (response.deletedCount === 1) {
        res.status(200).json({ success: true });
      }
      res.status(500).json({ success: false, message: "Failed to delete" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

export default connectDB(handler);

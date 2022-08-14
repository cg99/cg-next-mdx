/*
 menu api -
  get menu
  post menu
  update menu
  delete menu 
 */

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../utils/db";
import Menu from "../../models/Menu";

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
    try {
      const menu = await Menu.find();
      res
        .status(200)
        .json({ success: true, message: "Get Menu Successful", menu });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    let menuContent = req.body;
    const menuId = req.query.id;

    try {
      if (menuId) {
        // Update Menu
        await Menu.findByIdAndUpdate(menuId, menuContent, (err, docs) => {
          if (err) {
            res
              .status(500)
              .json({ success: false, message: "Failed to update. " + err });
          }
          return res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            menu: docs,
          });
        })
          .clone()
          .catch((err) => console.log(err, "outputtin error"));
      } else {
        // create menu
        const menu = await Menu.create(menuContent);
        const response = await menu.save();
        if (response) {
          res.status(200).json({ success: true, menu });
        }
        res.status(500).json({ success: false, message: "Failed to append" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await Menu.deleteOne({ _id: req.query.id });
      if (response.deletedCount === 1) {
        res.status(200).json({ success: true });
      }
      res.status(500).json({ success: false, message: "Failed to delete" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

export default connectDB(handler);

/*
For posts api - 
  - get posts
  - create a post
  - delete a post
*/

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../../utils/db";
import Post from "../../../models/Post";
import { QueryOptions } from "mongoose";

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
    const { page = 1, limit = undefined, q: searchKeyword = "" } = req.query;

    let query: QueryOptions = {};
    if (searchKeyword) {
      // query.title = {
      //   $regex: new RegExp(searchKeyword.toString()),
      //   $options: "i",
      // };
      query.content = {
        $regex: new RegExp(searchKeyword.toString()),
        $options: "i",
      };
    }

    const options = {
      sort: { createdAt: -1 },
      page,
      limit,
      pagination: !limit ? false : true,
    };
    try {
      await Post.paginate(query, options, function (err, result) {
        if (err) {
          return res.status(500).json({ success: false, message: err });
        }

        // console.log(result);
        return res.status(200).json({
          success: true,
          message: "Get Posts Successful",
          posts: result.docs,
        });
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const postContent = req.body;
    try {
      const post = await Post.create(postContent);
      const response = await post.save();
      if (response) {
        return res.status(200).json({ success: true, post });
      }
      return res
        .status(500)
        .json({ success: false, message: "Failed to append" });
      // }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  })
  // .patch((req: NextApiRequest, res: NextApiResponse) =>
  //   res.status(200).json({ message: "PATCH" })
  // )
  // .put((req: NextApiRequest, res: NextApiResponse) => {
  //   res.status(200).json({ message: "PUT" });
  // })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await Post.deleteOne({ _id: req.query.id });
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

// refs
// https://github.com/aravindnc/mongoose-paginate-v2/issues/85

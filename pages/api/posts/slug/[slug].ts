/*
For single post api - 
  - get a post
  - update a post
*/

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../../../utils/db";
import Post from "../../../../models/Post";

export function withAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => any
) {
  if (!req.headers.authentication) {
    res.status(401).json({ name: "Error" });
  }
  return next();
}

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
      const { slug } = req.query;

      if (slug) {
        const post = await Post.find({ slug });

        // console.log(post, "slag");
        return res.status(200).json({ post });
      }

      return res.status(500).json({ message: "Invalid Post Slug" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

export default connectDB(handler);

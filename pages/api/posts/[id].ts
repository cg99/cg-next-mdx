import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../../utils/db";
import Post from "../../../models/Post";

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
      const { id } = req.query;

      if (id) {
        const post = await Post.findById(id);
        return res.status(200).json({ post });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id, body } = req.query;

      console.log(body, id);

      return;

      if (id) {
        const post = await Post.updateOne({ id, body });
        return res.status(200).json({ post });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

export default connectDB(handler);

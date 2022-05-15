import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectDB from "../../../utils/db";
import Post from "../../../models/Post";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const posts = await Post.find();
//         return res.status(200).json({ posts });
//       } catch (error: any) {
//         return res.status(500).json({ message: error.message });
//       }
//       break;
//     case "POST":
//       res.status(200).json({ message: "POST" });
//       break;
//     case "PATCH":
//       res.status(200).json({ message: "PATCH" });
//       break;
//     case "PUT":
//       res.status(200).json({ message: "PUT" });
//       break;
//     case "DELETE":
//       res.status(200).json({ message: "DELETE" });
//       break;
//     default:
//       res.status(404).json({ message: "Not found" });
//   }
// };

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

const handler = nc()
  // .use(withAuth)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const posts = await Post.find();
      return res.status(200).json({ posts });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const postContent = req.body;

    console.log(postContent);
    const post = await Post.create(postContent);

    try {
      await post.save();
      res.status(200).json({ post });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  })
  .patch((req: NextApiRequest, res: NextApiResponse) =>
    res.status(200).json({ message: "PATCH" })
  )
  .put((req: NextApiRequest, res: NextApiResponse) =>
    res.status(200).json({ message: "PUT" })
  )
  .delete((req: NextApiRequest, res: NextApiResponse) =>
    res.status(200).json({ message: "DELETE" })
  );

export default connectDB(handler);

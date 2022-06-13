// import formidable, { File, Files } from "formidable";
import fs from "fs";
import path from "path";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
const multer = require("multer");

let savedImageName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const filepath = path.join("./public/uploads/", originalname);
    console.log(filepath);
    fs.stat(filepath, (error, stats) => {
      let uploadedFileName;
      if (error) {
        uploadedFileName = originalname;
      } else {
        uploadedFileName = Date.now() + "_" + originalname;
      }
      savedImageName = uploadedFileName;
      cb(null, uploadedFileName);
    });
  },
});

const imageUpload = multer({
  storage: storage,

  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: "GET" });
  })
  .post(
    imageUpload.single("image"),
    async (req: NextApiRequest, res: NextApiResponse) => {
      return res
        .status(201)
        .json({ message: "Image Uploaded", filename: savedImageName });
    }
  );

export default handler;

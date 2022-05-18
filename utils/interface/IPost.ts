import { ObjectId } from "mongodb";

export interface IPost {
  _id: number;
  title: string;
  content?: string;
  featuredImage?: string;
  createdAt?: Date;
}

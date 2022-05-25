import { ObjectId } from "mongodb";

export interface IPost {
  _id: number;
  title: string;
  slug?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  createdAt?: Date;
}

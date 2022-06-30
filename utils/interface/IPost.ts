export interface IPost {
  _id: string | number;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: string;
  category?: string[];
  createdAt?: Date;
  postUpdated?: boolean;
  postCreated?: boolean;
}

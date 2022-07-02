export interface IPost {
  _id: string | number;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: string;
  categories?: { label: string; value: string }[];
  createdAt?: Date;
  postUpdated?: boolean;
  postCreated?: boolean;
}

export interface IPost {
  _id: string | number;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: string;
  categories?: {
    value: string;
    label: string;
  }[];
  createdAt?: Date;
  // postUpdated?: boolean;
  // postCreated?: boolean;
}

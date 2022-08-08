export interface ICategory {
  _id: string | number;
  title: string;
  slug: string;
  parent?: string;
}

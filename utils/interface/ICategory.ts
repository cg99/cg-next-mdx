export interface ICategory {
  _id: string;
  title: string;
  slug: string;
  parent: string;
  categoryCreated?: boolean;
  categoryUpdated?: boolean;
}

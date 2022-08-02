export interface ICategory {
  _id: string;
  title: string;
  parent: string;
  categoryCreated?: boolean;
  categoryUpdated?: boolean;
}

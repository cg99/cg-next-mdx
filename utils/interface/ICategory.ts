export interface ICategory {
  _id: number;
  title: string;
  parent: string;
  categoryCreated?: boolean;
  categoryUpdated?: boolean;
}

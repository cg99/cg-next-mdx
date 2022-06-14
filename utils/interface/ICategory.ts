export interface ICategory {
  _id: number;
  title: string;
  parent: string;
  children: string[];
  categoryCreated?: boolean;
}

import { PostItItemModel } from './PostItItemModel';

export interface User {
  uid: string;
  username: string;
  password?: string;
  postItItems?: [PostItItemModel]
}
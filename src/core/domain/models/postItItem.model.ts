import { User } from './user.model';

export interface postItItem {
    uid: string;
    title: string;
    description: string;
    userUID: User;
}
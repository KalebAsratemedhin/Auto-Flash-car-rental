import { User } from "./User";

export interface Post {
    make: string;
    model: string;
    age: number;
    count: number;
    price: number;
    description: string;
    photo: string;
}

export interface PopulatedPost extends Post {
    username: User;

}

export type CreatePost = {
    make: string;
    model: string;
    age: number;
    count: number;
    price: number;
    description: string;
    photo: Blob;

}
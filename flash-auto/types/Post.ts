import { User } from "./User";

export interface Post {
    _id: string;
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

export type AverageRating = {
    averageScore: number;
    reviews: number;
}

export type Rating = {
    score: number;
    userId: string;
    carId: string;
}

export type Comment = {
    _id: string;
    content: string;
    userId: string;
    carId: string;
}

export type PopulatedComment = {
    _id: string;
    content: string;
    userId: User;
    createdAt: string;
    carId: string;
}
import { Post } from "./Post";
import { User } from "./User";

export type RentFormInput = {
    startDate: Date;
    endDate: Date;

}

export type Rent = {
    _id: string;
    car: Post;
    renter: User;
    rentee: User;
    totalCost: number;
    paymentStatus: string;
    startDate: string;
    endDate: string;

}

export type RentPopulated = {
    _id: string;
    car: Post;
    renter: string;
    rentee: string;
    totalCost: number;
    paymentStatus: string;
    startDate: string;
    endDate: string;
    status: string;

}
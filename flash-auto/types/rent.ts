import { Car } from "./car";
import {User} from "./user";

export type Rental = {
    car: Car,
    startDate: string,
    endDate: string,
    status: string,
    totalCost: number,
    _id: string,

}

export type ActiveRental = {
    renter: User,
    car: Car,
    startDate: string,
    endDate: string,
    status: string,
    totalCost: number,
    _id: string,
}
import { Car } from "./car";
import {User} from "./user";

export type RentForm = {
    startDate: string;
    endDate: string;
    insuranceOption: string;
    additionalDrivers: number;
}

export type Rent = {
    _id: string;
    startDate: string;
    endDate: string;
    insuranceOption: string;
    additionalDrivers: number;
    renter: string;
    rentee: string;
    status: string;
    car: Car;
    
}

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
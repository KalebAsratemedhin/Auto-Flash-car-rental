export type Car = {
    _id: string;
    photo: string;
    status: string;
    rating: number;
    make: string;
    model: string;
    year: number;
    transmission: string;
    fuelType: string;
    seats: number;
    price: number;
    description: string;
}


export type FavoriteCar = {
    userId: string;
    carId: Car;
    score: number;
}


export type Post = {
    make: string;
    model: string;
    year: number;
    transmission: string;
    fuelType: string;
    seats: number;
    price: number;
    description: string;
    photo: any;
  };
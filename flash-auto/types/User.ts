
export interface Response{
    message: string;
}

export interface User extends Response{
    user: {
        _id: string;
        fullName: string;
        email: string;
        password?: string;
        phoneNumber?: string;
        age?: number;
        address?: string;
        sex?: string;
        role: string;
        profilePic: string;
    }
   
}

export interface UserSummary {
    rented: number;
    posts: number;
    income: number;
}


export interface DoctorDataUpdate {
    speciality?: string;
    experience?: string;
    educationLevel?: string;
}


export interface UserUpdate{
    fullName?: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    sex?: string;
    profilePic?: string;
}



export interface AuthResponse{
    id: string;
    role: string;
    accessToken: string;
}


export interface AdminStats{
    doctorsCount: number;
    patientsCount: number;
    appointmentsCount: number;
}



export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors: string[];
}

export interface ApiError {
    success: boolean;
    message: string;
    data: null;
    errors: string[];
}
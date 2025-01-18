export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export interface LoginFormData {
    email: string;
    password: string;
}


export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


export interface Tokens{
    accessToken: string;
    refreshToken: string;
}

export interface DecodedUser{
    id: number;
    name: string;
    role: 'ADMIN' | 'USER' | 'INSTRUCTOR';
    iat: number;
    exp: number;
}
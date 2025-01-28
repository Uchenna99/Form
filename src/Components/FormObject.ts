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

export interface GoogleAuthResponse {
    credential: string;
    clientId: string;
    select_by: string;
}
  


export interface GoogleTokenPayload {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;    // User's given name
    iat: number;           // Issued at time (UNIX timestamp)
    iss: string;           // Issuer of the token (e.g., 'https://accounts.google.com')
    jti: string;           // Unique identifier for the token
    name: string;          // Full name of the user
    nbf: number;           // Not valid before time (UNIX timestamp)
    picture: string;       // URL to the user's profile picture
    sub: string;           // Subject identifier (unique user ID)
}


export interface ApiResponseUser {
    id: number;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    password: string;
    otp: string;
    otpExpiry: string;
    role: 'USER' | 'ADMIN' | 'INSTRUCTOR';
    createdAt: string;
    updatedAt: string;
}


export interface UserProfile {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    otp: string | null;
    otpExpiry: string | null;
    phoneNumber: string | null;
    profilePicture: string;
    googleId: string;
    role: "USER" | "ADMIN" | "INSTRUCTOR";
    createdAt: string;
    updatedAt: string;
}
  
  
  
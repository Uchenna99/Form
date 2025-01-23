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
  
import { create } from "zustand";
import { DecodedUser, Tokens, UserData } from "./Components/FormObject";

interface StateProps{
    tokens: Tokens | null;
    setTokens: (tokens: Tokens) => void;
    refresh: boolean;
    setRefresh: (refresh: boolean)=>void;
    users: UserData[];
    setUsers:(users: UserData[])=>void;
    decodedToken: DecodedUser | null;
    setDecodedToken: (decodedToken: DecodedUser)=>void;
    loggedIn: boolean;
    setloggedIn: (loggedIn: boolean)=>void;
    otp: string;
    setOtp: (otp: string)=>void;
}

const useGlobalState = create<StateProps>((set)=>({
    tokens: null,
    setTokens: (tokens: Tokens) => set({tokens}),
    refresh: false,
    setRefresh: (refresh: boolean)=> set({refresh}),
    users: [],
    setUsers: (users: UserData[])=> set({users}),
    decodedToken: null,
    setDecodedToken: (decodedToken: DecodedUser)=> set({decodedToken}),
    loggedIn: false,
    setloggedIn: (loggedIn: boolean)=> set({loggedIn}),
    otp: '',
    setOtp: (otp: string)=>set({otp})
}));


export default useGlobalState;
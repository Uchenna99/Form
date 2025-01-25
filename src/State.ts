import { create } from "zustand";
import { DecodedUser, FormData, Tokens, UserData } from "./Components/FormObject";

const baseForm: FormData = {firstName:'', lastName:'', email:'', password:''}

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
    forminfo: FormData;
    setForminfo: (forminfo: FormData)=>void;
    verifyEmail: string;
    setVerifyEmail: (verifyEmail: string)=>void;
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
    forminfo: baseForm,
    setForminfo: (forminfo: FormData)=>set({forminfo}),
    verifyEmail: '',
    setVerifyEmail: (verifyEmail: string)=>set({verifyEmail})
}));


export default useGlobalState;
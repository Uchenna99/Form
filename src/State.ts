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
    sessionUser: any;
    setSessionUser: (sessionUser: any)=>void;
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
    sessionUser: null,
    setSessionUser: (sessionUser: any)=> set({sessionUser})
}));


export default useGlobalState;
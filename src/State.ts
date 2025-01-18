import { create } from "zustand";
import { Tokens } from "./Components/FormObject";

interface StateProps{
    tokens: Tokens | null;
    setTokens: (tokens: Tokens) => void;
    refresh: boolean;
    setRefresh: (refresh: boolean)=>void;
}

const useGlobalState = create<StateProps>((set)=>({
    tokens: null,
    setTokens: (tokens: Tokens) => set({tokens}),
    refresh: false,
    setRefresh: (refresh: boolean)=> set({refresh})
}));


export default useGlobalState;
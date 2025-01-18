import axios from "axios";
import useGlobalState from "../State";
import { UserData } from "../Components/FormObject";
import { base_users_url } from "../URL";


const { tokens, setUsers } = useGlobalState();

export const usersAxios = axios.create({
    headers: {
        Authorization: `Bearer ${tokens?.accessToken}`
    }
});

export const getUsers = async ()=>{
    await usersAxios.get<UserData[]>(base_users_url)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err)
    )
};

import axios from "axios";
import { useState } from "react";
import useGlobalState from "../State";
import { base_users_url } from "../URL";
import { UserData } from "./FormObject";


const FindUser = () => {
    const {tokens, setUsers, decodedToken} = useGlobalState();
    const [showbsd, setshowbsd] = useState(false);
    const [id, setId] = useState<number>();

    const searchAxios = axios.create({
        headers: {
            Authorization: `Bearer ${tokens?.accessToken}`
        }
    })
    const handleSearch = async (id: number)=>{
        if(id === 0){null}
        await searchAxios.get(`${base_users_url}/${id}`)
        .then(res => {setUsers(res.data); setUsers(res.data)})
    }

    
    const getUsers = async ()=>{
        await searchAxios.get<UserData[]>(base_users_url)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err)
        )
    };

  return (
    <>
        <div className="button-selections">
            { decodedToken && <h4>Welcome, {decodedToken.name} </h4> }
            <button onClick={()=>{ setshowbsd(true); }}>Find User</button>
            <button onClick={()=>getUsers()}>Show All Users</button>
        </div>
        <div className="button-selection-dropdown" style={{display: showbsd? 'flex':'none'}}>
            <div className="bsd-close" onClick={()=>setshowbsd(false)}>X</div>

            <div className="find-user-byId">
                <input id="find-user-inp" type="number" placeholder="User ID" value={id}
                onChange={(e)=> setId(parseInt(e.target.value))}/>

                <button id="find-user-btn" onClick={()=>handleSearch(id!)}>Search</button>
            </div>
        </div>

    </>
  )
}

export default FindUser
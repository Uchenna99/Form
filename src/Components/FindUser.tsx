import axios from "axios";
import { useState } from "react";
import useGlobalState from "../State";
import { base_users_url } from "../URL";
import { UserData } from "./FormObject";


const FindUser = () => {
    const {tokens, setUsers} = useGlobalState();
    const [showbsd, setshowbsd] = useState(false);
    const [id, setId] = useState<number>(0);
    const [foundUser, setFoundUser] = useState<UserData>();

    const searchAxios = axios.create({
        headers: {
            Authorization: `Bearer ${tokens?.accessToken}`
        }
    })
    const handleSearch = async (id: number)=>{
        if(id === 0){null}
        await searchAxios.get(`${base_users_url}/${id}`)
        .then(res => {setFoundUser(res.data); setUsers(res.data)})
    }

  return (
    <>
        <div className="button-selections">
            <button onClick={()=>{ setshowbsd(true); }}>Find User</button>
            <button>Show All Users</button>
        </div>
        <div className="button-selection-dropdown" style={{display: showbsd? 'flex':'none'}}>
            <div className="bsd-close" onClick={()=>setshowbsd(false)}>X</div>

            <div className="find-user-byId">
                <input id="find-user-inp" type="text" placeholder="User ID" value={id}
                onChange={(e)=> setId(parseInt(e.target.value))}/>

                <button id="find-user-btn" onClick={()=>handleSearch(id)}>Search</button>
            </div>
        </div>

    </>
  )
}

export default FindUser
import axios from "axios";
import { useEffect } from "react";
import useGlobalState from "../State";

const Dashboard = () => {
  const {activeUser} = useGlobalState();

    useEffect(()=>{
        const fetchUser = async ()=> {
            await axios.get('http://localhost:3010/auth/google/callback/success')
            .then(response => console.log('User returned', response))
            .catch(err => console.error(err))
        }
        fetchUser();
    },[])

  return (
    <div>Welcome to your Dashboard {`${activeUser?.firstName} ${activeUser?.lastName}`}</div>
  )
}

export default Dashboard
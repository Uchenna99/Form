import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {

    useEffect(()=>{
        const fetchUser = async ()=> {
            await axios.get('http://localhost:3010/auth/google/callback/success')
            .then(response => console.log('User returned', response))
            .catch(err => console.error(err))
        }
        fetchUser();
    },[])

  return (
    <div>Welcome to your Dashboard</div>
  )
}

export default Dashboard
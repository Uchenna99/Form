import { useEffect, useState } from "react"
import Profile from "./Profile";
import useGlobalState from "../../State";
import axios from "axios";
import { UserProfile } from "../FormObject";
import { base_users_url } from "../../URL";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {userProfile, decodedToken, tokens, setloggedIn} = useGlobalState();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(true);
    const [courses, setCourses] = useState(false);
    const [Verification, setVerification] = useState(false);

    const userAxios = axios.create({
        headers: {
            Authorization: `Bearer ${tokens?.accessToken}`
        }
    })

    useEffect(()=>{
        console.log(tokens?.accessToken);
        const getUser = async()=>{
            await userAxios.get<UserProfile>(`${base_users_url}/${decodedToken?.id}`)
            .then((response)=>{
                console.log(response.data)
            })
        };
        getUser();
    },[]);

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', 'false');
        setloggedIn(false);
        navigate('/login');
    }


  return (
    <>
        <div className="dash-body">
            <div className="options-panel">
                <div className="dash-logo"><h2>E-LEARNING</h2></div>

                <div className="dash-options">
                    <div className="dash-option-select" 
                    onClick={()=>{setProfile(true); setCourses(false); setVerification(false);}}
                    style={{animationName: profile? 'dash-options':''}}>
                        <h4>Profile</h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={()=>{setCourses(true); setProfile(false); setVerification(false);}}
                    style={{animationName: courses? 'dash-options':''}}>
                        <h4>Courses</h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={()=>{setVerification(true); setProfile(false); setCourses(false);}}
                    style={{animationName: Verification? 'dash-options':''}}>
                        <h4>Verification</h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={logout}>
                        <h4>Logout</h4>
                    </div>
                </div>
            </div>

            <div className="main-dash-area">
                <div className="welcome-area">
                    <div className="profile-photo"></div>
                    <div className="name-tag">
                        <h2>Welcome</h2>
                        <h4> Uchenna Agbu </h4>
                    </div>
                </div>

                <div className="dash-details-display">
                    {profile && <Profile/>}
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard
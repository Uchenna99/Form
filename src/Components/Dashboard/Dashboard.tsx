import { useEffect, useState } from "react"
import Profile from "./Profile";
import useGlobalState from "../../State";
import axios from "axios";
import { DecodedUser, UserProfile } from "../FormObject";
import { base_users_url } from "../../URL";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Courses from "./Courses";
import VerificationPage from "./Verification";
import { MdVerified } from "react-icons/md";
import SeedTask from "./SeedTask";

const Dashboard = () => {
    const {userProfile, setUserProfile, setloggedIn} = useGlobalState();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(true);
    const [courses, setCourses] = useState(false);
    const [Verification, setVerification] = useState(false);
    const [seed, setSeed] = useState(false);

    
    useEffect(()=>{
        const getUser = async()=>{
            const userToken = localStorage.getItem('token');
            if(userToken){
                const userAxios = axios.create({
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                const decode: DecodedUser = jwtDecode(userToken);
                if(decode.id){
                    await userAxios.get<UserProfile>(`${base_users_url}/${decode.id}`)
                    .then((response)=>{
                        setUserProfile(response.data);
                        console.log(response.data);
                    })
                }else{
                    console.log('Authorization id not available')
                }
            }else{
                console.log('Error getting token');
            }
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
                    onClick={()=>{setProfile(true); setCourses(false); setVerification(false); setSeed(false);}}
                    style={{animationName: profile? 'dash-options':''}}>
                        <h4>Profile</h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={()=>{setCourses(true); setProfile(false); setVerification(false); setSeed(false);}}
                    style={{animationName: courses? 'dash-options':''}}>
                        <h4>Courses</h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={()=>{setVerification(true); setProfile(false); setCourses(false); setSeed(false);}}
                    style={{animationName: Verification? 'dash-options':''}}>
                        <h4>
                            Verification
                            {userProfile?.emailVerified && <MdVerified id="verified"/>}
                        </h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={()=>{setSeed(true); setCourses(false); setProfile(false); setVerification(false);}}
                    style={{animationName: seed? 'dash-options':''}}>
                        <h4>Seed Task</h4>
                    </div>

                    <div className="dash-option-select"
                    onClick={logout}>
                        <h4>Logout</h4>
                    </div>
                </div>
            </div>

            <div className="main-dash-area">
                <div className="welcome-area">
                    <div className="profile-photo"
                    style={{backgroundImage:`url(${userProfile?.profilePicture})`}}>
                        {/* <img src={userProfile?.profilePicture} alt="" /> */}
                    </div>
                    <div className="name-tag">
                        <h2>Welcome</h2>
                        <h4> {`${userProfile?.firstName} ${userProfile?.lastName}`} </h4>
                    </div>
                </div>

                <div className="dash-details-display">
                    {profile && <Profile/>}
                    {courses && <Courses/>}
                    {Verification && <VerificationPage/> }
                    {seed && <SeedTask/>}
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard
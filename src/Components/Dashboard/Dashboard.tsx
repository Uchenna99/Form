import { useState } from "react"
import Profile from "./Profile";

const Dashboard = () => {
    const [profile, setProfile] = useState(true);
    const [courses, setCourses] = useState(false);
    const [Verification, setVerification] = useState(false);

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

                    <div className="dash-option-select"><h4>Logout</h4></div>
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
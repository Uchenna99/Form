import axios from "axios";
import useGlobalState from "../../State";
import { base_users_url, send_otp } from "../../URL";
import { useState } from "react";
import ProfileVerifyEmailOtp from "./VerifyEmailOtp.profile";

const Profile = () => {
  const {userProfile, setUserProfile} = useGlobalState();
  const token = localStorage.getItem('token');
  
  const [verified, setVerified] = useState(false);
  const [confirmotp, setConfirmOtp] = useState(false);

  const [firstName, setfirstName] = useState(userProfile?.firstName);
  const [lastName, setlastName] = useState(userProfile?.lastName);
  const [email, setemail] = useState(userProfile?.email);
  const [phoneNumber, setphoneNumber] = useState(userProfile?.phoneNumber);

  const userAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const otpData = {
    email: userProfile?.email,
    otpType: 'email'
  }

  const patch = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber
  }

  const handleSave = async ()=>{
    await userAxios.post(send_otp, otpData)
    .then((response)=>{
      console.log(response);
      setConfirmOtp(true);

    })
  };

  const handleChanges = async ()=>{
    await userAxios.patch(`${base_users_url}/${userProfile?.id}`, patch)
    .then((response)=>{
      setUserProfile(response.data);
      alert('Changes saved successfully');
      setConfirmOtp(false);
    })
  };


  return (
    <>
        {
          confirmotp?
          <div className="gen-wrap">
            <ProfileVerifyEmailOtp switchUp={()=>{
              setConfirmOtp(false);
              setVerified(true);
            }}/>
          </div>
          :
          <div className="gen-wrap">
            <h3>Profile</h3>

            <div className="profile-input">
              <label htmlFor="firstName">First name</label>
              <input id="firstName" type="text" value={firstName} 
              onChange={(e)=>{setfirstName(e.target.value)}} 
              placeholder={userProfile?.firstName}/>
            </div>

            <div className="profile-input">
              <label htmlFor="lastName">Last name</label>
              <input id="lastName" type="text" value={lastName}
              onChange={(e)=>{setlastName(e.target.value)}} 
              placeholder={userProfile?.lastName} />
            </div>

            <div className="profile-input">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email}
              onChange={(e)=>{setemail(e.target.value)}} 
              placeholder={userProfile?.email} />
            </div>

            <div className="profile-input">
              <label htmlFor="phoneNumber">Phone</label>
              <input id="phoneNumber" type="text" value={phoneNumber!}
              onChange={(e)=>{setphoneNumber(e.target.value)}} 
              placeholder={userProfile?.phoneNumber? userProfile.phoneNumber:''} />
            </div>

            {
              verified? 
              <button id="change-btn" onClick={handleChanges}>Confirm changes</button>
              :
              <button id="change-btn" onClick={handleSave}>Save changes</button>
            }
          </div>
        }
    </>
  )
}

export default Profile;
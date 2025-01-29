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

  const [firstName, setfirstName] = useState(false);
  const [lastName, setlastName] = useState(false);
  const [email, setemail] = useState(false);
  const [phoneNumber, setphoneNumber] = useState(false);

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
      alert('Changes saved successfully')
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
              <input id="firstName" type="text" value={userProfile?.firstName} />
            </div>

            {
              verified? 
              <button onClick={handleChanges}>Confirm changes</button>
              :
              <button onClick={handleSave}>Save changes</button>
            }
          </div>
        }
    </>
  )
}

export default Profile;
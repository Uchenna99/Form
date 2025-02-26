import { useState } from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useGlobalState from "../../State";
import { DecodedUser, UserProfile } from "../FormObject";
import { base_users_url, otp_verify_url, verify_otp } from "../../URL";

export interface SubmitProp{
    email: string;
    otp: string;
}

interface Switch{
    switchUp: ()=>void;
}

const ProfileVerifyEmailOtp = ({switchUp}:Switch) => {
    const {setUserProfile, userProfile} = useGlobalState();
    const [otpInput, setOtpInput] = useState<string>('');
    
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
    
    const verifyData = {
        email: userProfile!.email,
        otp: otpInput
    }
    
    const handleVerify = async (data: SubmitProp)=>{
        if(otpInput.length !== 6){
            alert('Invalid OTP');
        }
        await axios.post(verify_otp, data)
        .then((response)=>{
            console.log(response.data);
            // alert(response.data.message);
            getUser();
            switchUp();
        })
        .catch(err=>console.log(err))
    }

  return (
    <>
                <p>
                    An OTP has been sent to your email, please check your inbox 
                </p>
                <div className="verify-input-wrap">
                    <input className='verify-inp' 
                    type="text" value={otpInput} 
                    style={{width:'170px', marginTop:'10px'}} 
                    onChange={(e)=>{
                        setOtpInput(e.target.value);}} />
                    {/* {inpError && <p>Numbers only</p>} */}
                </div>

                <button onClick={()=>handleVerify(verifyData)}
                    style={{width:'fit-content', marginTop:'20px'}}>
                        Verify
                    </button>

                <p style={{color:'red', fontSize:'13px'}}>
                    The OTP is valid for 10 minutes only
                </p>

    </>
  )
}

export default ProfileVerifyEmailOtp;
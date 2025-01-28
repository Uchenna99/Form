import { useState } from "react";
import useGlobalState from "../State";
import { otp_verify_url } from "../URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SubmitProp } from "./VerifyEmailOtp";

const VerifySmsOtp = () => {
    const {verifyEmail} = useGlobalState();
    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState('');

    const verifyData = {
        email: verifyEmail,
        otp: otpInput
    }

    const handleVerify = async (data: SubmitProp)=>{
        if(otpInput.length !== 6){
            alert('Invalid OTP');
        }
        await axios.post(otp_verify_url, data)
        .then((response)=>{
            // setActiveUser(response.data.user);
            console.log(response);
            alert(response.data.message)
            navigate('/login');
        })
    }

  return (
    <>
        <div className="verify-background">
            <div className="verify-display-box">
                <p>
                    An OTP has been sent to your phone number, please check your messages 
                </p>
                <div className="verify-input-wrap">
                    <input className='verify-inp' 
                    type="text" value={otpInput} 
                    style={{width:'170px'}} 
                    onChange={(e)=>{
                        setOtpInput(e.target.value);}} />
                    {/* {inpError && <p>Numbers only</p>} */}
                </div>

                <button onClick={()=>handleVerify(verifyData)}>Verify</button>

                <p style={{color:'red', fontSize:'13px'}}
                >The OTP is valid for 10 minutes only</p>

            </div>
        </div>
    </>
  )
}

export default VerifySmsOtp;
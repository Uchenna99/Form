import { useState } from "react"
import useGlobalState from "../State";
import axios from "axios";
import { otp_verify_url } from "../URL";
import { useNavigate } from "react-router-dom";

interface SubmitProp{
    email: string;
    otp: string;
}

const VerifyOtp = () => {
    const {verifyEmail, setloggedIn} = useGlobalState();
    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState<string>('');
    
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
            setloggedIn(true);
            console.log(response);
            navigate('/');
        })
    }

  return (
    <>
        <div className="verify-background">
            <div className="verify-display-box">
                <p>
                    An OTP has been sent to your email, please check your inbox 
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

export default VerifyOtp
import { useState } from "react"
import useGlobalState from "../State";
import { Navigate } from "react-router-dom";

interface SubmitProp{
    input: string;
    otp: string;
}

const VerifyOtp = () => {
    const {otp, setOtp} = useGlobalState();
    const [otpInput, setOtpInput] = useState<string>('');
    

    const handleVerify = async ({input, otp}: SubmitProp)=>{
        if (otp !== ''){
            if(otp === input){
                alert('Verification successful');
                setOtp('');
                <Navigate to={'/'}/>
            }else{
                alert('Incorrect code')
            }
        }else{
            alert('Unexpected error')
        }
    }

  return (
    <>
        <div className="verify-background">
            <div className="verify-display-box">
                <p>
                    A code has been sent to your email, please check your inbox 
                </p>
                <div className="verify-input-wrap">
                    <input className='verify-inp' 
                    type="text" value={otpInput} 
                    style={{width:'170px'}} 
                    onChange={(e)=>{
                        setOtpInput(e.target.value);}} />
                    {/* {inpError && <p>Numbers only</p>} */}
                </div>

                <button onClick={()=>handleVerify({otp: otp, input: otpInput})}>Verify</button>

                <p style={{color:'red', fontSize:'13px'}}
                >The code is valid for 10 minutes only</p>

            </div>
        </div>
    </>
  )
}

export default VerifyOtp
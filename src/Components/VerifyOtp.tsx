import { useState } from "react"
import useGlobalState from "../State";
import { Navigate } from "react-router-dom";

const VerifyOtp = () => {
    const {otp, setOtp} = useGlobalState();
    const [otpInput, setOtpInput] = useState<string | null>(null);
    const [inpError, setinpError] = useState(false);

    // const isChars = otpInput?.split("").filter((char) =>
    //     char.match(/[A-Za-z]/)).length === otpInput?.length;
    // if(!isChars){
    //     setinpError(true);
    // }else{setinpError(false)}
    

    const handleVerify = async (input: string|undefined, otp: number|null)=>{
        if (otp && input){
            if(otp.toString() === otpInput){
                alert('Verification successful');
                setOtp(0);
                <Navigate to={'/'}/>
            }else{
                alert('Incorrect code')
            }
        }else{
            // alert('Input a valid code')
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
                    <input className="input-error" type="text" style={{width:'170px'}} onChange={(e)=>{
                        setOtpInput(e.target.value);
                    }} />
                    {!inpError && <p>Numbers only</p>}
                </div>

                <button onClick={handleVerify}>Verify</button>

                <p style={{color:'red', fontSize:'13px'}}
                >The code is valid for 10 minutes only</p>

            </div>
        </div>
    </>
  )
}

export default VerifyOtp
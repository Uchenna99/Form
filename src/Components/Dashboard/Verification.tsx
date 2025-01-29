import { useState } from "react";
import useGlobalState from "../../State";
import VerifyEmailOtp from "../VerifyEmailOtp";
import axios from "axios";
import { send_otp } from "../../URL";

const VerificationPage = () => {
    const {userProfile} = useGlobalState();
    const [checked, setChecked] = useState('');
    const [stage, setStage] = useState('select');

    const otpData = {
        email: userProfile?.email,
        otpType: checked
    }

    const handleSelection = async ()=>{
        if(checked ==='email'){
            await axios.post(send_otp, otpData)
            .then((response)=>{
                console.log(response.data);
                setStage('emailOtp');
            })
        }else if(checked === 'sms'){
            setStage('smsOtp');
        }else{
            alert('Please select a verification method');
        }
    };

  return (
    <>
        {
            userProfile?.emailVerified? 
            <div className="verify-options">
                <h3>Verification Section</h3>

                <p>Your account has been <span style={{color:'green'}}>verified</span></p>
            </div>

            :

            <div className="wrap">
                {
                stage === 'select'?
                <div className="verify-options">
                    <h3>Verification Section</h3>
    
                    <p>Please select a method of Verification</p>
    
                    <div className="check-box-option">
                        <div className="verify-check-box"
                        onClick={()=>setChecked('email')}>
                            <div className="checked" style={{display: checked === 'email'? 'flex':'none'}}></div>
                        </div>
                        <p>Email</p>
                    </div>
    
                    <div className="check-box-option">
                        <div className="verify-check-box"
                        onClick={()=>setChecked('sms')}>
                            <div className="checked" style={{display: checked === 'sms'? 'flex':'none'}}></div>
                        </div>
                        <p>SMS</p>
                    </div>
    
                    <button id="verify-btn" onClick={handleSelection}>Verify</button>
                </div>
                :
                stage === 'emailOtp'?
                <div className="verify-options">
                    <h3>Verification Section</h3>
                    <VerifyEmailOtp switchUp={()=>setStage('success')}/>
                </div>
                :
                stage === 'smsOtp'?
                <div className="verify-options">
                    <h3>Verification Section</h3>
                    <p>Sorry, sms verification is not available right now.</p>
                    <button onClick={()=>setStage('select')}>Return</button>
                </div>
                :
                stage === 'success'?
                <div className="verify-options">
                    <h3>Verification Section</h3>
                    <p>Your Verification was <span style={{color:'green'}}>successful</span></p>
                </div>
                :
                <div className="verify-options"><p>Error, please refresh page</p></div>
                }
            </div>
        }
    </>
  )
}

export default VerificationPage;
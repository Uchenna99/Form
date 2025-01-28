import { useState } from "react";

const VerificationPage = () => {
    const [checked, setChecked] = useState('');

  return (
    <>
        <div className="verify-options">
            <h3>Verification</h3>
            <p>Please select a method of Verification</p>

            <div className="check-box-option">
                <div className="verify-check-box"
                onClick={()=>setChecked('email')}></div>
                <p>Email</p>
            </div>
        </div>
    </>
  )
}

export default VerificationPage;

const VerifyOtp = () => {
  return (
    <>
        <div className="verify-background">
            <div className="verify-display-box">
                <p>
                    A code has been sent to your email, please check your inbox 
                </p>

                <input type="text" style={{width:'170px'}} />

                <button>Verify</button>

                <p style={{color:'red', fontSize:'13px'}}
                >The code is valid for 10 minutes only</p>

            </div>
        </div>
    </>
  )
}

export default VerifyOtp
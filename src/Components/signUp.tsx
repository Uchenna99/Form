import axios from 'axios';
import { useState } from 'react'
import { FormData } from './FormObject';
import { create_user_url } from '../URL';
import { Link, Navigate } from 'react-router-dom';
import useGlobalState from '../State';

const SignUp = () => {
    const {setOtp} = useGlobalState();

    

    const [forminfo, setForminfo] = useState<FormData>(baseForm);
    

    const handleSubmit = async () => {        
        try {
          await axios.post(create_user_url, forminfo)
          .then(res => {
            console.log(res.data);
            setOtp(res.data.otp);
            // setForminfo(baseForm);
          })
          .then(()=>{alert('Account created successfully')})
          .then(()=>{<Navigate to={'/otp/verify'}/>})
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data);
          } else {
            console.error('Unexpected Error:', error);
          }
        }
      };

  return (
    <>
        <div className="page-wrap">
            <div className="add-user-section">
                <div className="form">
                    <input id="firstname-inp" type="text" placeholder="First Name"
                    value={forminfo.firstName} 
                    onChange={(e)=> setForminfo({...forminfo, firstName: e.target.value})}/>

                    <input id="lastname-inp" type="text" placeholder="Last Name"
                    value={forminfo.lastName} 
                    onChange={(e)=> setForminfo({...forminfo, lastName: e.target.value})}/>

                    <input id="email-inp" type="email" placeholder="E-mail"
                    value={forminfo.email} 
                    onChange={(e)=> setForminfo({...forminfo, email: e.target.value})}/>
                    
                    <input id="password-inp" type="password" placeholder="Password"
                    value={forminfo.password} 
                    onChange={(e)=> setForminfo({...forminfo, password: e.target.value})}/>

                    <button onClick={handleSubmit}>Create User/ Signup</button>

                    <p>Already have an account? <Link id='signin-link' to={'/login'}>Login</Link> </p>
                </div>                    
            </div>
        </div>
    </>
  )
}

export default SignUp;
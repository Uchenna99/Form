import { useState } from "react";
import { DecodedUser, GoogleAuthResponse, GoogleTokenPayload, LoginFormData } from "./FormObject";
import axios from "axios";
import { login_url } from "../URL";
import useGlobalState from "../State";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { Link, Navigate } from "react-router-dom";



const Login = () => {
    const {setTokens, tokens, setDecodedToken, setloggedIn} = useGlobalState();
    const baseForm: LoginFormData = { email:'', password:'' };
    const [forminfo, setForminfo] = useState<LoginFormData>(baseForm);
    


    const handleLogin = async ()=>{        
        try {
            await axios.post(login_url, forminfo)
            .then(res => {
                setTokens(res.data);
            })
            .then(()=>{
                if(tokens !== null){
                const decode: DecodedUser = jwtDecode(tokens.accessToken);
                setDecodedToken(decode)
                console.log(decode);}
            })
            .then(()=>{
                setloggedIn(true);
                <Navigate to={'/'}/>
            })
                
            
            
        } catch (error) {
            console.error('login failed:', error);
        }
        
    };
    
    
    
  return (
    <>
    <div className="page-wrap">
        <div className="add-user-section">
            <div className="form">

                <input id="email-inp" type="email" placeholder="E-mail"
                value={forminfo.email} 
                onChange={(e)=> { setForminfo({...forminfo, email: e.target.value})}}/>
                
                <input id="password-inp" type="password" placeholder="Password"
                value={forminfo.password} 
                onChange={(e)=> setForminfo({...forminfo, password: e.target.value})}/>

                <button onClick={handleLogin} >Login</button>

                <GoogleLogin onSuccess={async (res: any)=>{
                    alert('Login successful');
                    const user = jwtDecode(res.credential) as GoogleTokenPayload;
                    const userData = {
                        firstName: user.given_name,
                        lastName: user.family_name,
                        email: user.email
                    }
                    await axios.post('http://localhost:3010/api/v1/login/google', userData)
                    .then(response => setTokens(response.data))
                    .then(()=>{
                        setloggedIn(true);
                        <Navigate to={'/'}/>
                    });
                    }} 
                    text="signin_with"
                    onError={()=>{
                        alert('Login Failed, try again.')
                    }}
                />

                <p>Don't have an account? <Link id="signin-link" to={'/signup'}>Sign Up</Link> </p>

                {/* <button onClick={googleSign}>Google Login</button>

                <button onClick={logout}>Google Logout</button> */}

            </div>
        </div>
    </div>
    </>
  )
}

export default Login
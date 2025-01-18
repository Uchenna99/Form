import { useState } from "react";
import { DecodedUser, LoginFormData } from "./FormObject";
import axios from "axios";
import { login_url } from "../URL";
import useGlobalState from "../State";
import { jwtDecode } from "jwt-decode";

interface Props{
    show: ()=>void;
}


const Login = ({ show }:Props) => {
    const {setTokens, tokens, setDecodedToken} = useGlobalState();
    const baseForm: LoginFormData = { email:'', password:'' };
    const [forminfo, setForminfo] = useState<LoginFormData>(baseForm);


    const handleLogin = async ()=>{        
        try {
            await axios.post(login_url, forminfo)
            .then(res => {
                setTokens(res.data);
                tokens?.accessToken && setForminfo(baseForm);
            })
            if(tokens?.accessToken){
                const decode: DecodedUser = jwtDecode(tokens.accessToken);
                setDecodedToken(decode)
                console.log(decode);
                
            }
            
        } catch (error) {
            console.error('login failed:', error);
        }
        
    };
    
    
    
  return (
    <>
        <div className="form">

            <input id="email-inp" type="email" placeholder="E-mail"
            value={forminfo.email} 
            onChange={(e)=> { setForminfo({...forminfo, email: e.target.value})}}/>
            
            <input id="password-inp" type="password" placeholder="Password"
            value={forminfo.password} 
            onChange={(e)=> setForminfo({...forminfo, password: e.target.value})}/>

            <button onClick={handleLogin} >Login</button>

            <p>Don't have an account? <span onClick={show}>Signup</span> </p>
        </div>
    </>
  )
}

export default Login
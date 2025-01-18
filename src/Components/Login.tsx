import { useState } from "react";
import { LoginFormData } from "./FormObject";
import axios from "axios";
import { login_url } from "../URL";

interface Props{
    show: ()=>void;
}

interface Tokens{
    accessToken: string;
    refreshToken: string;
}

const Login = ({ show }:Props) => {
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const baseForm: LoginFormData = { email:'', password:'' };
    const [forminfo, setForminfo] = useState<LoginFormData>(baseForm);

    const handleLogin = async ()=>{        
        try {
            await axios.post(login_url, forminfo)
            .then(res => {setTokens(res.data)})
            
        } catch (error) {
            console.error('login failed:', error);
        }
        
    };
    
  return (
    <>
        <div className="form">

            <input type="email" placeholder="E-mail"
            value={forminfo.email} 
            onChange={(e)=> { setForminfo({...forminfo, email: e.target.value})}}/>
            
            <input type="password" placeholder="Password"
            value={forminfo.password} 
            onChange={(e)=> setForminfo({...forminfo, password: e.target.value})}/>

            <button onClick={handleLogin} >Login</button>

            <p>Don't have an account? <span onClick={show}>Signup</span> </p>
        </div>
    </>
  )
}

export default Login
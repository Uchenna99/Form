import { useState } from "react";
import { LoginFormData } from "./FormObject";

interface Props{
    show: ()=>void;
}

const Login = ({ show }:Props) => {
    const baseForm: LoginFormData = { email:'', password:'' }
    const [forminfo, setForminfo] = useState<LoginFormData>(baseForm);
    
  return (
    <>
        <div className="form">

            <input type="email" placeholder="E-mail"
            value={forminfo.email} 
            onChange={(e)=> setForminfo({...forminfo, email: e.target.value})}/>
            
            <input type="password" placeholder="Password"
            value={forminfo.password} 
            onChange={(e)=> setForminfo({...forminfo, password: e.target.value})}/>

            <button >Login</button>

            <p>Don't have an account? <span onClick={show}>Signup</span> </p>
        </div>
    </>
  )
}

export default Login
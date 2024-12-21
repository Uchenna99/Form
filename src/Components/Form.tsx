import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FormData, UserData } from "./FormObject";
import axios from "axios";



export const Form =()=>{
    const baseForm: FormData = {firstName:'', lastName:'', email:'', password:''}

    const [users, setUsers] = useState<UserData[]>([]);
    const [forminfo, setForminfo] = useState<FormData>(baseForm);

    useEffect(()=>{
        const getUsers = async ()=>{
            await axios.get<UserData[]>('http://localhost:3010/api/v1/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err)
            )
        };
        getUsers();
    },[]);

    const [visibility, setVisibility] = useState(false)

    const visibilityToggle =()=>{
        setVisibility(!visibility)
    }


    const handleSubmit = async () => {        
        try {
          const response = await axios.post('http://localhost:3010/api/v1/users', forminfo);
          console.log(response.data);
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
                        <input type="text" placeholder="First Name"
                        value={forminfo.firstName} 
                        onChange={(e)=> setForminfo({...forminfo, firstName: e.target.value})}/>

                        <input type="text" placeholder="Last Name"
                        value={forminfo.lastName} 
                        onChange={(e)=> setForminfo({...forminfo, lastName: e.target.value})}/>

                        <input type="email" placeholder="E-mail"
                        value={forminfo.email} 
                        onChange={(e)=> setForminfo({...forminfo, email: e.target.value})}/>
                        
                        <input type="password" placeholder="Password"
                        value={forminfo.password} 
                        onChange={(e)=> setForminfo({...forminfo, password: e.target.value})}/>

                        <button onClick={handleSubmit}>Create User</button>
                    </div>
                </div>

                <div className="users-display-section">
                    <div className="user-grid">
                        <div className="grid-header">
                            <h3>ID</h3>
                            <h3>FIRST NAME</h3>
                            <h3>LAST NAME</h3>
                            <h3>E-MAIL</h3>
                        </div>

                        {
                            users?
                            users.map((user)=>(
                                <div className="grid-header" key={user.email}>
                                    <p> {user.id} </p>
                                    <p> {user.firstName} </p>
                                    <p> {user.lastName} </p>
                                    <p> {user.email} </p>
                                </div>
                            ))
                            :
                            <h3> No user found. </h3>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
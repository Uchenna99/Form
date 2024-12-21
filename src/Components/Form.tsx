import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { FormData, UserData } from "./FormObject";
import axios from "axios";
import { base_users_url } from "../URL";



export const Form =()=>{
    const baseForm: FormData = {firstName:'', lastName:'', email:'', password:''}
    const baseUser: UserData = {id:1, firstName:'John', lastName:'Doe', email:'jd@test.com'}

    const [users, setUsers] = useState<UserData[]>([]);
    const [forminfo, setForminfo] = useState<FormData>(baseForm);
    const [refresh, setRefresh] = useState(false);
    const [selected, setSelected] = useState<UserData>(baseUser)

    useEffect(()=>{
        const getUsers = async ()=>{
            await axios.get<UserData[]>(base_users_url)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err)
            )
        };
        getUsers();
    },[refresh]);

    const [visibility, setVisibility] = useState(false)

    const visibilityToggle =()=>{
        setVisibility(!visibility)
    }


    const handleSubmit = async () => {        
        try {
          await axios.post(base_users_url, forminfo)
          .then(res => {
            console.log(res.data);
            setForminfo(baseForm);
            setRefresh(!refresh);
          })
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
                    {
                        users.length > 0 &&
                        <div className="user-grid">
                            <div className="grid-header">
                                <h3>ID</h3>
                                <h3>FIRST NAME</h3>
                                <h3>LAST NAME</h3>
                                <h3>E-MAIL</h3>
                            </div>

                        {
                            users.map((user)=>(
                                <div className="grid-header" key={user.email} onClick={()=>setSelected(user)}>
                                    <p> {user.id} </p>
                                    <p style={{overflow:'hidden'}}> {user.firstName} </p>
                                    <p style={{overflow:'hidden'}}> {user.lastName} </p>
                                    <p style={{overflow:'hidden'}}> {user.email} </p>

                                    <div className="pop-up">
                                        <div className="modal">
                                            <TfiClose id="modal-close" />

                                            <div className="modal-info">
                                                <p> Name: {selected?.firstName} {selected?.lastName} </p>
                                                
                                            </div>
                                            <div className="modal-info">
                                                <p> E-mail:  </p>
                                                <p>{selected?.email}</p>
                                            </div>
                                            
                                            <button id="delete">Delete User</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    }

                    {
                        users.length == 0 && 
                        <h3>No user found.</h3>
                    }
                    
                </div>
            </div>
        </>
    )
}
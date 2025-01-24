import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { TfiClose } from "react-icons/tfi";
import { FormData, UserData } from "./FormObject";
import axios from "axios";
import { base_users_url } from "../URL";
import Login from "./Login";
import useGlobalState from "../State";




export const Form =()=>{
    const { users, setUsers, tokens } = useGlobalState();
    const baseForm: FormData = {firstName:'', lastName:'', email:'', password:''}

    const [forminfo, setForminfo] = useState<FormData>(baseForm);
    const [selected, setSelected] = useState<UserData>();
    const [modal, setModal] = useState(false);

    const [visibility, setVisibility] = useState(false)

    const visibilityToggle =()=>{
        setVisibility(!visibility)
    }

    const usersAxios = axios.create({
        headers: {
            Authorization: `Bearer ${tokens?.accessToken}`
        }
    });
    
    const getUsers = async ()=>{
        await usersAxios.get<UserData[]>(base_users_url)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err)
        )
    };


    const handleSubmit = async () => {        
        try {
          await axios.post(base_users_url, forminfo)
          .then(res => {
            console.log(res.data);
            setForminfo(baseForm);
          })
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data);
          } else {
            console.error('Unexpected Error:', error);
          }
        }
      };

      const handleDelete = async (id: number)=>{
        await usersAxios.delete(`${base_users_url}/${id}`)
        .then(()=>getUsers());
        console.log("User deleted");
        
      };

      if(modal){
        document.body.style.overflow = "hidden";
      }else{
        document.body.style.overflow = "auto";
      }

    return (
        <>
            <div className="page-wrap">
                <div className="add-user-section">
                        <div className="form">
                            <h2 style={{textAlign:'center'}}> Welcome to your page {} </h2>
                        </div>
                </div>

                
                {/* <FindUser /> */}


                {/* <div className="users-display-section">
                    {
                        users.length > 0 &&
                        <div className="user-grid">
                            <div className="grid-header-main">
                                <h3>ID</h3>
                                <h3>FIRST NAME</h3>
                                <h3>LAST NAME</h3>
                                <h3>E-MAIL</h3>
                            </div>

                        {
                            users.map((user)=>(
                                <div className="grid-header" key={user.email} onClick={()=>{setSelected(user); setModal(true);}}>
                                    <p> {user.id} </p>
                                    <p style={{overflow:'hidden'}}> {user.firstName} </p>
                                    <p style={{overflow:'hidden'}}> {user.lastName} </p>
                                    <p style={{overflow:'hidden'}}> {user.email} </p>
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

                <div className="pop-up" style={{display: modal? 'flex':'none'}}>
                    <div className="modal">
                        <TfiClose id="modal-close" onClick={()=>setModal(false)}/>

                        <div className="modal-info">
                            <p> Name: {selected?.firstName} {selected?.lastName} </p>
                            
                        </div>
                        <div className="modal-info">
                            <p> E-mail: {selected?.email} </p>
                        </div>
                        
                        <button id="delete" onClick={()=>{handleDelete(selected!.id); setModal(false);}}>Delete User</button>
                    </div>
                </div> */}
            </div>
        </>
    )
}
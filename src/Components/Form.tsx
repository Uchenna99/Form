import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FormData, UserData } from "./FormObject";
import axios from "axios";



export const Form =()=>{
    const [users, setUsers] = useState<UserData[]>([]);
    const [forminfo, setForminfo] = useState<FormData>({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    });


    const [visibility, setVisibility] = useState(false)

    const visibilityToggle =()=>{
        setVisibility(!visibility)
    }


    const onSubmit = async () => {
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
                        <input type="text" placeholder="First Name"/>
                        <input type="text" placeholder="Last Name"/>
                        <input type="email" placeholder="E-mail"/>
                        <input type="password" placeholder="Password"/>

                        <button>Create User</button>
                    </div>
                </div>

                <div className="users-display-section">
                    <div className="user-grid">
                        <div className="grid-header"> <h3>ID</h3> </div>
                        <div className="grid-header"> <h3>FIRST NAME</h3> </div>
                        <div className="grid-header"> <h3>LAST NAME</h3> </div>
                        <div className="grid-header"> <h3>E-MAIL</h3> </div>

                       
                    </div>
                </div>
            </div>
        </>
    )
}
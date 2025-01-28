// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { TfiClose } from "react-icons/tfi";
// import axios from "axios";
// import { base_users_url } from "../URL";
import { useNavigate } from "react-router-dom";
import useGlobalState from "../State";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedUser } from "./FormObject";




export const Form =()=>{
    const { decodedToken, setDecodedToken, setloggedIn } = useGlobalState();
    const navigate = useNavigate();

    useEffect(()=>{
        const userToken = localStorage.getItem('token');
        if(userToken){
            const decode = jwtDecode(userToken);
            setDecodedToken(decode as DecodedUser);
        }
        console.log('Error getting token');
    },[]);

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', 'false');
        setloggedIn(false);
        navigate('/login');
    }

    // const [selected, setSelected] = useState<UserData>();
    // const [modal, setModal] = useState(false);

    // const usersAxios = axios.create({
    //     headers: {
    //         Authorization: `Bearer ${tokens?.accessToken}`
    //     }
    // });
    
    // const getUsers = async ()=>{
    //     await usersAxios.get<UserData[]>(base_users_url)
    //     .then(res => setUsers(res.data))
    //     .catch(err => console.log(err)
    //     )
    // };


    // const handleSubmit = async () => {        
    //     try {
    //       await axios.post(base_users_url, forminfo)
    //       .then(res => {
    //         console.log(res.data);
    //         setForminfo(baseForm);
    //       })
    //     } catch (error: any) {
    //       if (axios.isAxiosError(error)) {
    //         console.error('Axios Error:', error.response?.data);
    //       } else {
    //         console.error('Unexpected Error:', error);
    //       }
    //     }
    //   };

    //   const handleDelete = async (id: number)=>{
    //     await usersAxios.delete(`${base_users_url}/${id}`)
    //     .then(()=>getUsers());
    //     console.log("User deleted");
        
    //   };

    //   if(modal){
    //     document.body.style.overflow = "hidden";
    //   }else{
    //     document.body.style.overflow = "auto";
    //   }

    return (
        <>
            <div className="page-wrap">
                <button id="logout" onClick={logout}>Logout</button>
                <div className="add-user-section">
                        <div className="form">
                            <h2 style={{textAlign:'center'}}> Welcome to your page {decodedToken?.name} </h2>

                            <button onClick={()=>navigate('/dashboard')}>Dashboard</button>
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
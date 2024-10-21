import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";



export const Form =()=>{
    return (
        <>
            <div className="form-body">
                <form >
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="email" placeholder="Email" />
                    
                    <div className="input-wrap">
                        <input type="password" placeholder="Password" />
                        <FaRegEye id="eye"/>
                        <FaRegEyeSlash id="eye"/>
                    </div>

                    <button>Submit Form</button>
                </form>
            </div>
        </>
    )
}
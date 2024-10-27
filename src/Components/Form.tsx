import { FormEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { FormData } from "./FormObject";


export const Form =()=>{

    const [visibility, setVisibility] = useState(false)

    const visibilityToggle =()=>{
        setVisibility(!visibility)
    }


    const {register, handleSubmit, formState: {errors}} = useForm<FormData>(); 
     
      

    const onSubmit =(data: FieldValues)=>{
        console.log(data)
        
    }
    // const handleSubmit =(e: FormEvent)=>{
    //     e.preventDefault();
        
    // }

    return (
        <>
            <div className="form-body">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="input-wrap">
                    <input type="text" placeholder="First Name" {...register('firstName', {required: true, minLength: 3})} />
                    { errors.firstName?.type === 'required' && <p id="err-p">This input is required.</p> }
                    { errors.firstName?.type === 'minLength' && <p id="err-p">The name must be at least 3 characters long.</p> }
                    </div>
                    <input type="text" placeholder="Last Name" {...register('lastName')} />
                    <input type="email" placeholder="Email" {...register('email')} />
                    
                    <div className="input-wrap">
                        <input type={visibility == false? "password" : "text"} 
                        {...register('password')}
                        placeholder="Password" />
                        <FaRegEye id="eye" onClick={visibilityToggle} style={{display: visibility == true? 'none' : 'flex'}} />
                        <FaRegEyeSlash id="eye" onClick={visibilityToggle} style={{display: visibility == true? 'flex' : 'none'}} />
                    </div>

                    <button type="submit" >Submit Form</button>
                </form>
            </div>
        </>
    )
}
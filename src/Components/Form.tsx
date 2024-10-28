import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { FormData } from "./FormObject";


export const Form =()=>{

    const [visibility, setVisibility] = useState(false)

    const visibilityToggle =()=>{
        setVisibility(!visibility)
    }


    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormData>(); 
     
      

    const onSubmit =(data: FieldValues)=>{
        console.log(data)
    }

    return (
        <>
            <div className="form-body">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="input-wrap">
                        <input type="text" placeholder="First Name" {...register('firstName', {required: true, minLength: 3})} />
                        { errors.firstName?.type === 'required' && <p id="err-p">This input is required.</p> }
                        { errors.firstName?.type === 'minLength' && <p id="err-p">The name must be at least 3 characters long.</p> }
                    </div>
                    <div className="input-wrap">
                        <input type="text" placeholder="Last Name" {...register('lastName', {required: true, minLength: 3})} />
                        {errors.lastName?.type === 'required' && <p id="err-p">This input is required.</p> }
                        {errors.lastName?.type === 'minLength' && <p id="err-p">The name must be at least 3 characters long.</p>}
                    </div>
                    <div className="input-wrap">
                        <input type="email" placeholder="Email" {...register('email', {required: true, minLength: 6})} />
                        {errors.email?.type === 'required' && <p id="err-p">This input is required.</p> }
                    </div>
                    
                    <div className="input-wrap">
                        <div className="input-wrap">
                            <input type={visibility == false? "password" : "text"} 
                            {...register('password', {required: true, minLength: 8, maxLength: 25})}
                            placeholder="Password" />
                            {errors.password?.type === 'required' && <p id="err-p">This input is required.</p> }
                            {errors.password?.type === 'minLength' && <p id="err-p">The password must be at least 8 characters long.</p> }
                            {errors.password?.type === 'maxLength' && <p id="err-p">Password must not be longer than 25 characters.</p>}
                            <FaRegEye id="eye" onClick={visibilityToggle} style={{display: visibility == true? 'none' : 'flex'}} />
                            <FaRegEyeSlash id="eye" onClick={visibilityToggle} style={{display: visibility == true? 'flex' : 'none'}} />
                        </div>
                        
                        
                    </div>

                    <button disabled={!isValid} type="submit" >Submit Form</button>
                </form>
            </div>
        </>
    )
}
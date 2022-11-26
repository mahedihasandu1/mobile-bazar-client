import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import img from '../../assets/signup.png'
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';


const SignUp = () => {
    const [signupEmail,setSignupEmail]=useState('')
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUPError] = useState('')
    const { createUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from.pathname || '/'
    const [token]=useToken(signupEmail)

    const handleSignUp = (e) => {
        createUser(e.email, e.password)
            .then(result => {
                setSignUPError('')
                const user = result.user
                toast.success('User Created Successfully')
                console.log(user)
            })
            .catch(error => {
                setSignUPError(error.message)
            })

            const image = e.imgUser[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${'ee28b692a1eb777531ab826a6ef8cd93'}`
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(imgData => {
            if (imgData.success) {
                handleUpdateUser(e,imgData)
                saveUser(e.name, e.email, imgData.data.url, e.userOption)
                setSignupEmail(e.email)
            }
        })


   
   
        }
    const handleUpdateUser = (e,imgData) => {
        const userInfo = {
           displayName: e.name,
            photoURL: imgData.data.url

        }
        updateUser(userInfo)
            .then(() => {

            })
            .catch(error => { console.error(error) })
    }
    const saveUser = (name,
        email, photoURL, userType) => {
        const user = {
            name,
            email,
            photoURL,
            userType
        };
        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization:`bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                navigate(from, { replace: true })
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center ' style={{ background: `url(${img})` }}>

            <div className='w-96 p-7 shadow-lg rounded-lg' >
                <h1 className='text-xl text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: "Please enter your name" })} className="input input-bordered w-full max-w-xs" />
                        {errors.name &&
                            <p className='text-red-600' >{errors.name?.message}</p>}
                    </div>
                    
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Your Photo</span>
                        </label>
                        <input type="file" {...register("imgUser", { required: "Please Select Photo" })} className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                        {errors.imgUser &&
                            <p className='text-red-600' >{errors.imgUser?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email &&
                            <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: 'Password Required',
                            minLength: { value: 6, message: "Password must be 6 characters " },
                            pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: 'Password must be strong' }
                        })} className="input input-bordered w-full max-w-xs" />

                        {errors.password &&
                            <p className='text-red-600' >{errors.password?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs my-2">
                        <label className="label">
                            <span className="label-text">What do You want Buyer Or Seller ?</span>
                        </label>
                        <select defaultValue={'Buyer'} type="userOption" {...register("userOption", { required: "Require" })} className="select select-bordered w-full max-w-xs" >
                            <option value='Buyer' >Buyer</option>
                            <option>Seller</option>
                        </select>

                        {errors.userOption &&
                            <p className='text-red-600' >{errors.userOption?.message}</p>}
                    </div>
                    <div>
                        {
                            signUpError && <p className='text-red-600'>{signUpError}</p>
                        }
                    </div>
                    <input className='btn btn-accent w-full my-2' value={"Sign Up"} type="submit" />
                    <p>Already have an Account<Link className='text-secondary font-semibold' to='/login'>Please LogIn</Link></p>
                    <div className="divider"></div>

                </form>

            </div>
        </div>
    );
};

export default SignUp;
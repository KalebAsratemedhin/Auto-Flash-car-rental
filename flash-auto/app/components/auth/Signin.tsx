'use client'
import { useForm } from "react-hook-form"
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import CustomLoading from "../utils/CustomLoading";
import CustomError from "../utils/CustomError";
interface FormData{
    email: string;
    password: string;
}

const Signin = () => {
    const {formState: {errors}, register, handleSubmit} = useForm<FormData>({
        mode: 'onChange'
    });
    const [signinError, setSigninError] = useState('');

    const router = useRouter()

    const onSubmit = async(data: FormData) => {
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });
    
        if (result?.error) {
            console.error('err',result.error);
            setSigninError(result.error)
        }

        if(session.data){
            console.log(session.data, 'data')
        }
    }

    const session = useSession()

    useEffect(() => {
        if(session.status === "authenticated" && session.data.user.id){
            router.push(`/dashboard/${session.data.user.id}`)
        }

        

    }, [session.status, router])

    
  return (
    <div className=" border border-gray-200 rounded-md py-8 px-4 bg-white ">
        <h1 className="text-3xl text-center text-blue-950 font-semibold ">Welcome back to AutoFlash!</h1>
        
        <div className="  px-10 py-5">
            <div className="mt-4 py-3 w-full">
                <button onClick={() => signIn('google')} className="border p-2 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm"> <FcGoogle className="w-8 h-8" /> Sign in with Google</button>        
            </div>  
            <div className="flex justify-between items-center my-8  w-full">
                <p className="bg-gray-400 h-[1px] w-1/3"></p>
                <p>or</p>
                <p className="bg-gray-400 h-[1px] w-1/3"></p>
            </div>  

            {session.status === 'loading' && <CustomLoading />}
            {signinError && <CustomError error={signinError} /> }
            <form noValidate onSubmit={handleSubmit(onSubmit)} >
                <div className="my-3">
                    <label className="text-gray-500 text-base" htmlFor="email">Email</label>
                        <input className="block border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg h-12 px-2 w-full border" id="email" type="text" {...register('email', {
                            required: "Email is required"
                        })} />
                    
                    <p className="text-red-500 text-base mt-1">{errors.email?.message}</p>
                </div>
                <div className="my-3">
                    <label className="text-gray-500 text-base" htmlFor="password">Password</label>
                        <input className="block border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg h-12 px-2 w-full border" id="password" type="password" {...register('password', {
                            required: "Password is required",
                            
                        })} />
                        
                
                    <p className="text-red-500 text-base mt-1">{errors.password?.message}</p>
                </div>
                <button type="submit" className="w-full  bg-red-500 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signin</button> 
                
                <p className="text-gray-400 mt-8 text-start">Don't have an account? <Link className="text-red-400 hover:text-purple-800" href='/auth/signup'>Signup</Link> </p>
                <p className="text-gray-400 text-start">By clicking 'Signin' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>

            </form>
        </div>


    </div>
  )
}

export default Signin
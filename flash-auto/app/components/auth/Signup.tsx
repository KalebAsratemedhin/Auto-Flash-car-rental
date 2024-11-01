'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import TextField from "../utils/TextField";
import CustomError from "../utils/CustomError";
import { useSignupMutation } from "@/redux/api/authAPI";
import { useRouter } from "next/navigation";
import CustomLoading from "../utils/CustomLoading";
import { SignupCredential } from "@/types/User";


interface FormData {
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const Signup = () => {
  const { formState: { errors, isValid }, register, handleSubmit } = useForm<FormData>({
    mode: 'onChange'
  });

  const [signupUser, { isError, isLoading, isSuccess, error, data: signupData }] = useSignupMutation();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (isValid) {
      const result = await signupUser(data as SignupCredential);
      console.log('result signup', result);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/auth/signin');
    }
  }, [isSuccess]);

  if (isLoading) return <CustomLoading />;

  return (
    <div className="border shadow-lg bg-white h-full  p-4 flex flex-col justify-center items-center rounded-md">
      <h1 className="text-3xl text-blue-950 font-semibold mb-2">Welcome to AutoFlash!</h1>
      <p className="text-3xl text-red-400 font-semibold mt-5">Signup</p>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-10 ">
        <div className="py-5 w-full">
          <Link href={`/auth/google`} className="border p-4 sm:px-20 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm">
            <FcGoogle className="w-8 h-8" /> Sign up with Google
          </Link>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="bg-gray-400 h-[1px] w-1/3"></p>
          <p>or</p>
          <p className="bg-gray-400 h-[1px] w-1/3"></p>
        </div>
        {isError && <CustomError error={error} />}

        {/* <p>{process.env.BACKEND_URL}</p> */}


        <TextField
          label="Fullname"
          id="fullName"
          type="text"
          register={register}
          validation={{ required: "Fullname is required" }}
          error={errors.fullName?.message}
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          register={register}
          validation={{
            required: "Password is required",
            validate: (value: string) => {
              if (value.length < 6) return "Password should not be shorter than six characters.";
              return /[a-zA-Z]{1,}/.test(value) || 'Password must contain at least one letter';
            }
          }}
          error={errors.password?.message}
        />

        <TextField
          label="Email"
          id="email"
          type="email"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email should include letters and digits"
            }
          }}
          error={errors.email?.message}
        />

        <TextField
          label="Phone Number"
          id="phoneNumber"
          type="text"
          register={register}
          validation={{ required: "Phone Number is required" }}
          error={errors.phoneNumber?.message}
        />

        <button type="submit" className="w-full bg-red-500 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signup</button>
      </form>

      <p className="text-gray-400 mt-8 text-start">Have an account? <Link className="text-red-400 hover:text-purple-800" href='/auth/signin'>Signin</Link></p>
      <p className="text-gray-400 text-start">By clicking 'Signup' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>
    </div>
  );
};

export default Signup;
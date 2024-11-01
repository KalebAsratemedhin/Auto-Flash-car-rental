import Signup from '@/app/components/auth/Signup'

const page = () => {
  return (
    <div className="">
        <div className="min-h-screen w-full flex justify-center items-center bg-[url('/tucson.jpeg')] bg-cover md:p-12">
            <Signup />
        </div>
        
    </div>
  )
}

export default page
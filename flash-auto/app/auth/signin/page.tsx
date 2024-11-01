import Signin from '@/app/components/auth/Signin'

const page = () => {
  return (
    <div className="">
        <div className="min-h-screen  flex justify-center items-center bg-[url('/tucson.jpeg')] object-cover">
            <Signin />
        </div>
        
    </div>
  )
}

export default page
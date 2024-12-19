import Signup from '@/app/components/auth/Signup'

const page = () => {
  return (
    <div className="min-h-screen">
      <div
        className="min-h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center py-10"
        style={{
          backgroundImage: "url('/gold-supercar-with-word-supercar-front.jpg')",
        }}
      >
        <Signup />
      </div>
        
    </div>
  )
}

export default page
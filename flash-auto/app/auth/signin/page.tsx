import Signin from '@/app/components/auth/Signin'


const Page = () => {
  return (
    <div className="min-h-screen">
      <div
        className="min-h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center py-10"
        style={{
          backgroundImage: "url('/blue-jeep-photo-shooting-sunset.jpg')",
        }}
      >
        <Signin />
      </div>
    </div>
  );
};

export default Page
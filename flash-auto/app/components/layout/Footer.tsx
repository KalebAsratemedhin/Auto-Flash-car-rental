import Link from "next/link"

const Footer = () => {
  return (
    <div className='bg-gradient-to-b bg-gray-800 text-white  flex py-32 justify-center items-center gap-12'>
        <div className='logo'></div>

        <p className="w-96">&copy; AutoFlash. All rights reserved.</p>

        <div className='flex-grow  flex flex-col justify-center gap-4'>
            <Link className="hover:text-red-400" href='/about'>about us</Link>
            <Link className="hover:text-red-400" href='/contact-us'>contact us</Link>

        </div>

    </div>
  )
}

export default Footer
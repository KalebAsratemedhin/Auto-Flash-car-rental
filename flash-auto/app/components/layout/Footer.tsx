// import Link from "next/link"

// const Footer = () => {
//   return (
//     <div className='bg-gradient-to-b bg-gray-800 text-white  flex py-32 justify-center items-center gap-12'>
//         <div className='logo'></div>

//         <p className="w-96">&copy; AutoFlash. All rights reserved.</p>

//         <div className='flex-grow  flex flex-col justify-center gap-4'>
//             <Link className="hover:text-red-400" href='/about'>about us</Link>
//             <Link className="hover:text-red-400" href='/contact-us'>contact us</Link>

//         </div>

//     </div>
//   )
// }

// export default Footer


import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-8 md:px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 flex flex-col items-start">
         
          <div className="text-2xl font-bold mb-4 flex gap-2 items-center">  <img src="/logo-1.ico" alt="logo" className=" w-20" /> AutoFlash</div>
          <p className="text-gray-400">
            Your trusted partner for all car rental needs. We provide affordable, reliable, and comfortable vehicles for any journey.
          </p>
        </div>

        <div className="col-span-1">
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/about" className="hover:text-red-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-red-400">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-red-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-red-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Phone: +1 234 567 890</li>
            <li>Email: support@autoflash.com</li>
            <li>Address: 123 Car St, Auto City, CA 45678</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="hover:text-blue-500">
              <FaFacebookF size={24} />
            </Link>
            <Link href="https://twitter.com" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </Link>
            <Link href="https://instagram.com" className="hover:text-pink-500">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://linkedin.com" className="hover:text-blue-700">
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} AutoFlash. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

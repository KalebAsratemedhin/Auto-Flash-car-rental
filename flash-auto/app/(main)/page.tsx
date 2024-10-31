'use client'
import Link from "next/link";
import ImageSlider from "../components/utils/ImageSlider";

function Landing() {
  return (
    <div className="flex flex-col bg-red-400">
 
      <header className="bg-[url('/car-inside-view.jpeg')] bg-no-repeat bg-cover py-8 flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-6xl font-bold">Welcome to AutoFlash Car Rentals</h1>
        <h2 className="text-4xl font-bold">Take Control</h2>

        <p className="text-lg my-3">Rent a car, whenever and wherever you need it.</p>
        <div className="flex gap-3 mt-5">
          <Link href="/signup" className="px-5 py-2 bg-red-400 text-white rounded-md">Get Started</Link>
        </div>
      </header>

      <section className="flex flex-col min-h-96 flex-wrap pt-5 bg-white items-center ">
        <h2 className="text-4xl text-orange-600 mb-5 underline underline-offset-8  font-semibold text-center">Our Services</h2>
        <div className="p-6 text-3xl">
          <div className="flex gap-4 mb-4">
            <p className=" bg-orange-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">1</span></p>
            <div className="bg-white   p-4 ">
              <h3 className="text-gray-800 font-semibold mb-3">24/7 Customer Support</h3>
              <p className="text-gray-600 text-base">We provide round-the-clock support for all your rental needs.</p>
            </div>
          </div>
          <div className="flex gap-4 mb-4 ml-16">
            <p className=" bg-orange-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">2</span></p>
            <div className="bg-white  p-4 ">
              <h3 className="text-gray-800 font-semibold mb-3">Flexible Rental Periods</h3>
              <p className="text-gray-600 text-base">Rent for a day, a week, or even a month with flexible options.</p>
            </div>
          </div>
          <div className="flex gap-4 mb-4 ml-32">
            <p className=" bg-orange-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">3</span></p>
            <div className="bg-white  p-4 ">
              <h3 className="text-gray-800 font-semibold mb-3">Wide Range of Vehicles</h3>
              <p className="text-gray-600 text-base">Choose from economy cars, SUVs, luxury vehicles, and more.</p>
            </div>
          </div>
          <div className="flex gap-4 mb-4 ml-48">
            <p className=" bg-orange-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">4</span></p>
            <div className="bg-white  p-4 ">
              <h3 className="text-gray-800 font-semibold mb-3">Affordable Rates</h3>
              <p className="text-gray-600 text-base">Enjoy competitive pricing with no hidden fees.</p>
            </div>
          </div>
        </div>
        
      </section>



      <section className="flex flex-wrap p-5 text-center bg-gray-100">
        {/* <CarsList /> */}
        <ImageSlider />
      </section> 
    </div>
  );
}

export default Landing;

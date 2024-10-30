import Link from "next/link";

function Landing() {
  return (
    <div className="flex flex-col bg-red-400">
 
      <header className="bg-[url('/car-inside-view.jpeg')] bg-repeat-x py-8 flex flex-col items-center justify-center h-96 text-white">
        <h1 className="text-6xl font-bold">Welcome to Shir Shir Car Rentals</h1>
        <h2 className="text-4xl font-bold">Take Control</h2>

        <p className="text-lg my-3">Rent a car, whenever and wherever you need it.</p>
        <div className="flex gap-3 mt-5">
          <Link href="/signup" className="px-5 py-2 bg-red-400 text-white rounded-md">Get Started</Link>
        </div>
      </header>

      <section className="flex flex-col flex-wrap p-5 bg-white">
        <h2 className="text-2xl text-gray-800 mb-5 font-semibold text-center">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md w-44 text-center">
            <h3 className="text-gray-800 font-semibold mb-3">24/7 Customer Support</h3>
            <p className="text-gray-600 text-sm">We provide round-the-clock support for all your rental needs.</p>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md w-44 text-center">
            <h3 className="text-gray-800 font-semibold mb-3">Flexible Rental Periods</h3>
            <p className="text-gray-600 text-sm">Rent for a day, a week, or even a month with flexible options.</p>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md w-44 text-center">
            <h3 className="text-gray-800 font-semibold mb-3">Wide Range of Vehicles</h3>
            <p className="text-gray-600 text-sm">Choose from economy cars, SUVs, luxury vehicles, and more.</p>
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md w-44 text-center">
            <h3 className="text-gray-800 font-semibold mb-3">Affordable Rates</h3>
            <p className="text-gray-600 text-sm">Enjoy competitive pricing with no hidden fees.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap p-5 text-center bg-gray-100">
        {/* <CarsList /> */}
      </section> 
    </div>
  );
}

export default Landing;

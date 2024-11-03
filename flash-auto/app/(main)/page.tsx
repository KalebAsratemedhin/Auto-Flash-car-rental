// 'use client'
// import Link from "next/link";
// import ImageSlider from "../components/utils/ImageSlider";

// function Landing() {
//   return (
//     <div className="flex flex-col bg-red-400">
 
//       <header className="bg-[url('/car-inside-view.jpeg')] bg-no-repeat bg-cover py-8 flex flex-col items-center justify-center h-screen text-white">
//         <h1 className="text-6xl font-bold">Welcome to AutoFlash Car Rentals</h1>
//         <h2 className="text-4xl font-bold">Take Control</h2>

//         <p className="text-lg my-3">Rent a car, whenever and wherever you need it.</p>
//         <div className="flex gap-3 mt-5">
//           <Link href="/auth/signup" className="px-5 py-2 bg-red-400 text-white rounded-md">Get Started</Link>
//         </div>
//       </header>

//       <section className="flex flex-col min-h-96 flex-wrap pt-5 bg-white items-center ">
//         <h2 className="text-4xl text-red-600 mb-5 underline underline-offset-8  font-semibold text-center">Our Services</h2>
//         <div className="p-6 text-3xl">
//           <div className="flex gap-4 mb-4">
//             <p className=" bg-red-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">1</span></p>
//             <div className="bg-white   p-4 ">
//               <h3 className="text-gray-800 font-semibold mb-3">24/7 Customer Support</h3>
//               <p className="text-gray-600 text-base">We provide round-the-clock support for all your rental needs.</p>
//             </div>
//           </div>
//           <div className="flex gap-4 mb-4 ml-16">
//             <p className=" bg-red-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">2</span></p>
//             <div className="bg-white  p-4 ">
//               <h3 className="text-gray-800 font-semibold mb-3">Flexible Rental Periods</h3>
//               <p className="text-gray-600 text-base">Rent for a day, a week, or even a month with flexible options.</p>
//             </div>
//           </div>
//           <div className="flex gap-4 mb-4 ml-32">
//             <p className=" bg-red-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">3</span></p>
//             <div className="bg-white  p-4 ">
//               <h3 className="text-gray-800 font-semibold mb-3">Wide Range of Vehicles</h3>
//               <p className="text-gray-600 text-base">Choose from economy cars, SUVs, luxury vehicles, and more.</p>
//             </div>
//           </div>
//           <div className="flex gap-4 mb-4 ml-48">
//             <p className=" bg-red-600 w-32 h-32 rounded-full flex justify-center items-center"><span className="bg-white w-28 h-28 flex justify-center items-center rounded-full">4</span></p>
//             <div className="bg-white  p-4 ">
//               <h3 className="text-gray-800 font-semibold mb-3">Affordable Rates</h3>
//               <p className="text-gray-600 text-base">Enjoy competitive pricing with no hidden fees.</p>
//             </div>
//           </div>
//         </div>
        
//       </section>



//       <section className="flex flex-wrap p-5 text-center bg-gray-100">
//         {/* <CarsList /> */}
//         <ImageSlider />
//       </section> 
//     </div>
//   );
// }

// export default Landing;



'use client'
import Link from "next/link";
import ImageSlider from "../components/utils/ImageSlider";

function Landing() {

  const services = [
    { id: 1, title: '24/7 Customer Support', description: 'Round-the-clock support for all your rental needs.' },
    { id: 2, title: 'Flexible Rental Periods', description: 'Rent for a day, a week, or a month with flexible options.' },
    { id: 3, title: 'Wide Range of Vehicles', description: 'Choose from economy cars, SUVs, luxury vehicles, and more.' },
    { id: 4, title: 'Affordable Rates', description: 'Competitive pricing with no hidden fees.' }
  ]
  return (
    <div className="flex flex-col bg-gray-100">
      <header className="bg-[url('/car-inside-view.jpeg')] bg-no-repeat bg-cover py-8 flex flex-col items-center justify-center h-screen text-white text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to AutoFlash Car Rentals</h1>
        <h2 className="text-4xl font-bold mb-2">Take Control</h2>
        <p className="text-lg mb-6">Rent a car, whenever and wherever you need it.</p>
        <Link href="/auth/signup" className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">Get Started</Link>
      </header>

      <section className="flex flex-col items-center py-20 px-8 bg-white">
        <h2 className="text-4xl font-semibold text-red-600 mb-6 underline">About Us</h2>
        <p className="text-lg max-w-3xl text-center text-gray-700">
          At AutoFlash, we’re committed to providing quality vehicles and exceptional service to make your journey safe, convenient, and enjoyable. Our fleet includes a wide range of options from economy cars to luxury vehicles, catering to all types of travelers.
        </p>
      </section>



      <section className="flex flex-col items-center py-20  bg-gray-50">
        <h2 className="text-4xl font-semibold text-red-600 mb-10 underline">Our Services</h2>

        <div className="space-y-8">
          {services.map((service, index) => (
            <div className={`ml-${(index) * 8} `}>
              <div key={service.id} className={`flex items-center space-x-6 ml-24 transition duration-300 ease-in-out`}>
                <div className="relative flex justify-center items-center w-20 h-20">
                  <div className="absolute w-20 h-20 border-4 border-red-600 rounded-full transform rotate-[15deg] border-t-transparent "></div>
                  <span className="z-10 text-2xl font-bold text-red-600">{service.id}</span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center py-20 px-8 bg-white">
        <h2 className="text-4xl font-semibold text-red-600 mb-6 underline">Popular Cars</h2>
        <ImageSlider />
        <p className="text-lg mt-6 text-gray-700 max-w-2xl text-center">
          Explore our popular cars, trusted by thousands of customers. From compact city cars to spacious SUVs, we have something for everyone!
        </p>
      </section>

      <section className="flex flex-col items-center py-20 px-8 bg-gray-50">
        <h2 className="text-4xl font-semibold text-red-600 mb-6 underline">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {[
            { name: 'Sarah M.', feedback: 'Fantastic service! The car was in excellent condition and the staff was friendly.' },
            { name: 'John D.', feedback: 'Great prices and a wide range of vehicles to choose from. Highly recommend!' },
            { name: 'Emily R.', feedback: 'Easy booking process and the car was exactly as described. Will rent again!' }
          ].map((testimonial, index) => (
            <div key={index} className="p-6 border rounded-lg bg-white shadow-md text-center">
              <p className="text-lg text-gray-700 italic">"{testimonial.feedback}"</p>
              <p className="text-sm font-semibold mt-4 text-red-600">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center py-16 px-8 bg-red-600 text-white text-center">
        <h2 className="text-4xl font-semibold mb-4">Ready to Hit the Road?</h2>
        <p className="text-lg mb-6 max-w-2xl">Sign up today and experience the freedom of renting a car with AutoFlash. No matter where you’re headed, we’ve got the perfect vehicle for your journey.</p>
        <Link href="/auth/signup" className="px-6 py-3 bg-white text-red-600 rounded-md font-semibold hover:bg-gray-100 transition duration-300">Get Started Now</Link>
      </section>
    </div>
  );
}

export default Landing;





      // <section className="flex flex-col items-center py-20 px-8 bg-gray-50">
      //   <h2 className="text-4xl font-semibold text-red-600 mb-6 underline">Our Services</h2>
      //   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
      //     {[
      //       { id: 1, title: '24/7 Customer Support', description: 'Round-the-clock support for all your rental needs.' },
      //       { id: 2, title: 'Flexible Rental Periods', description: 'Rent for a day, a week, or a month with flexible options.' },
      //       { id: 3, title: 'Wide Range of Vehicles', description: 'Choose from economy cars, SUVs, luxury vehicles, and more.' },
      //       { id: 4, title: 'Affordable Rates', description: 'Competitive pricing with no hidden fees.' }
      //     ].map(service => (
      //       <div key={service.id} className="flex flex-col items-center text-center p-6 border rounded-lg bg-white shadow-md">
      //         <div className="bg-red-600 w-20 h-20 rounded-full flex justify-center items-center text-white text-2xl font-bold">{service.id}</div>
      //         <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{service.title}</h3>
      //         <p className="text-gray-600">{service.description}</p>
      //       </div>
      //     ))}
      //   </div>
      // </section> 
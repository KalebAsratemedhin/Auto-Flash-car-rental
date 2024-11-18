'use client'
import Link from "next/link";
import ImageSlider from "../components/utils/ImageSlider";
import { useEffect, useRef } from "react";


const Landing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    { title: "24/7 Customer Support", description: "Round-the-clock support for all your rental needs." },
    { title: "Flexible Rental Periods", description: "Rent for a day, a week, or a month with flexible options." },
    { title: "Wide Range of Vehicles", description: "Choose from economy cars, SUVs, luxury vehicles, and more." },
    { title: "Affordable Rates", description: "Competitive pricing with no hidden fees." },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-swoopIn");
          } else {
            entry.target.classList.remove("animate-swoopIn");
          }
        });
      },
      { threshold: 0.5 } 
    );

    const section = sectionRef.current;
    const items = section?.querySelectorAll(".swoop-item");
    items?.forEach((item: Element) => observer.observe(item));

    return () => {
      items?.forEach((item: Element) => observer.unobserve(item));
    };
  }, []);

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


    <section ref={sectionRef} className="flex flex-col items-center py-20 bg-gray-50">
          <h2 className="text-4xl font-semibold text-red-600 mb-10 underline">Our Services</h2>
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`swoop-item flex items-center space-x-6 ml-24 transform translate-x-16 opacity-0 transition-opacity duration-300 ease-out`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative flex justify-center items-center w-20 h-20">
                  <div className="absolute w-20 h-20 border-4 border-red-600 rounded-full transform rotate-[15deg] border-t-transparent"></div>
                  <span className="z-10 text-2xl font-bold text-red-600">{index + 1}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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

      <section className="flex flex-col items-center py-16 px-8 bg-red-600 text-white text-center">
        <h2 className="text-4xl font-semibold mb-4">Ready to Hit the Road?</h2>
        <p className="text-lg mb-6 max-w-2xl">Sign up today and experience the freedom of renting a car with AutoFlash. No matter where you’re headed, we’ve got the perfect vehicle for your journey.</p>
        <Link href="/auth/signup" className="px-6 py-3 bg-white text-red-600 rounded-md font-semibold hover:bg-gray-100 transition duration-300">Get Started Now</Link>
      </section>
    </div>
    
  );
};

export default Landing;


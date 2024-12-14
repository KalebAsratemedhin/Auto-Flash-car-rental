'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const cars = [
  { brand: "Toyota", model: "Corolla", logo: "/toyota.png" },
  { brand: "Ford", model: "Mustang", logo: "/ford.png" },
  { brand: "Honda", model: "Civic", logo: "/honda.png" },
  { brand: "Suzuki", model: "Camaro", logo: "/suzuki.jpeg" },
  { brand: "Kia", model: "3 Series", logo: "/kia.png" },
  { brand: "Nissan", model: "3 Series", logo: "/nissan.png" },

];

const CarSlider = () => (
  <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto py-8 text-center">
    <h2 className="text-2xl font-semibold mb-4">Popular Car Models</h2>
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Navigation, Pagination, Autoplay]}
    >
      {cars.map((car, index) => (
        <SwiperSlide key={index}>
          <div className="p-6 flex flex-col items-center justify-center">
            <img src={car.logo} alt={`${car.brand} logo`} className="w-auto max-h-52 mb-4 " />
            <h3 className="text-lg font-medium">{car.brand}</h3>
            <p className="text-gray-600">{car.model}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default CarSlider;



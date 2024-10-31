// // // components/ImageSlider.jsx

// // import { Carousel } from 'react-responsive-carousel';
// // import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

// // export default function ImageSlider() {
// //   const images = [
// //     {
// //       src: '/images/car1.jpg', // Update with your image paths
// //       alt: 'Car Model 1',
// //     },
// //     {
// //       src: '/images/car2.jpg',
// //       alt: 'Car Model 2',
// //     },
// //     {
// //       src: '/images/car3.jpg',
// //       alt: 'Car Model 3',
// //     },
// //     // Add more images as needed
// //   ];

// //   return (
// //     <div className="my-4">
// //       <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000} showThumbs={false}>
// //         {images.map((image, index) => (
// //           <div key={index} className="flex justify-center items-center h-64">
// //             <img src={image.src} alt={image.alt} className="object-cover w-full h-full rounded-lg shadow-md" />
// //           </div>
// //         ))}
// //       </Carousel>
// //     </div>
// //   );
// // }


// // Example using Swiper

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const cars = [
//   { brand: "Toyota", model: "Corolla", logo: "/images/toyota.png" },
//   { brand: "Ford", model: "Mustang", logo: "/images/ford.png" },
//   { brand: "Honda", model: "Civic", logo: "/images/honda.png" },
//   { brand: "Chevrolet", model: "Camaro", logo: "/images/chevrolet.png" },
//   { brand: "BMW", model: "3 Series", logo: "/images/bmw.png" },
// ];

// const CarSlider = () => (
//   <div className="max-w-4xl mx-auto py-8 text-center">
//     <h2 className="text-2xl font-semibold mb-4">Popular Car Models</h2>
//     <Swiper spaceBetween={20} slidesPerView={3}>
//       {cars.map((car, index) => (
//         <SwiperSlide key={index}>
//           <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
//             <img src={car.logo} alt={`${car.brand} logo`} className="w-20 h-auto mb-4" />
//             <h3 className="text-lg font-medium">{car.brand}</h3>
//             <p className="text-gray-600">{car.model}</p>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>
// );

// export default CarSlider;


// components/CarSlider.jsx

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
  <div className="lg:max-w-6xl mx-auto py-8 text-center">
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



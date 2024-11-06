// 'use client'
// import CarList from "@/app/components/post/CarList";
// import CustomError from "@/app/components/utils/CustomError";
// import CustomLoading from "@/app/components/utils/CustomLoading";
// import Pagination from "@/app/components/utils/Pagination";
// import { useGetAllPostsQuery } from "@/redux/api/postAPI";
// import { useState } from "react";

// const page = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("");
//   const limit = 10;

//   const { isLoading, isError, isSuccess, data, error } = useGetAllPostsQuery({
//     page: currentPage,
//     limit
//   });

//   if (isLoading) return <CustomLoading />;
//   if (isError) return <CustomError error={error} />;

//   if (isSuccess) {
//     const cars = data.data;
//     const totalPages = data.totalPages;

//     return (
//       <div className="p-4 max-w-4xl mx-auto">
//         <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
//           <input
//             type="text"
//             placeholder="Search by model, brand, etc."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg w-full md:w-1/2"
//           />
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg w-full md:w-1/4"
//           >
//             <option value="">All</option>
//             <option value="sedan">Sedan</option>
//             <option value="suv">SUV</option>
//             <option value="truck">Truck</option>
//           </select>
//         </div>

//         <div >
//           <CarList cars={cars} />
//           {cars.length > 0 ? (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={(page) => setCurrentPage(page)}
//             />
//           ) : (
//             <h1 className="text-xl text-gray-500 text-center mt-6">
//               No cars found.
//             </h1>
//           )}
//         </div>
//       </div>
//     );
//   }
// };

// export default page;


'use client'
import CarList from "@/app/components/post/CarList";
import CustomError from "@/app/components/utils/CustomError";
import CustomLoading from "@/app/components/utils/CustomLoading";
import Pagination from "@/app/components/utils/Pagination";
import { useGetAllPostsQuery } from "@/redux/api/postAPI";
import { Post } from "@/types/Post";
import { useState, useEffect } from "react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredCars, setFilteredCars] = useState<Post[]>([]);

  // Fetch cars based on server-side filters
  const { isLoading, isError, isSuccess, data, error } = useGetAllPostsQuery({
    page: currentPage,
    limit: 10,
    filter, 
  });

  // Handle local search on fetched data
  useEffect(() => {
    if (data?.data) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = data.data.filter(
        (car) =>
          car.model.toLowerCase().includes(lowerSearchTerm) ||
          car.make.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredCars(filtered);
    }
  }, [searchTerm, data]);

  if (isLoading) return <CustomLoading />;
  if (isError) return <CustomError error={error} />;

  if (isSuccess) {
    const totalPages = data.totalPages;

    return (
      <div className="p-4 max-w-4xl mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search by model, brand, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full md:w-1/2"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full md:w-1/4"
          >
            <option value="all">All</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="Toyota">Toyota</option>

          </select>
        </div>

        <div >
          <CarList cars={filteredCars!} />
          {filteredCars.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          ) : (
            <h1 className="text-xl text-gray-500 text-center mt-6">
              No cars found.
            </h1>
          )}
        </div>
      </div>
    );
  }
};

export default Page;

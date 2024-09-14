import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
  // Function to fetch brands
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  // Fetch data using react-query
  const { data, isError, isLoading } = useQuery({
    queryKey: "AllBrands",
    queryFn: getAllBrands,
  });

  // Handle errors and loading states
  if (isError) {
    return (
      <h1 className="text-center text-red-600">There was an error fetching brands.</h1>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-blue-300 flex justify-center items-center">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-center py-10">Our Brands</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-10 px-10 md:px-20 py-10">
        {data.data.data.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300"
          >
            
              <img
                className="rounded-t-lg h-40 w-full object-contain p-3"
                src={item.image}
                alt={item.name}
              />
            
            <div className="p-5 text-center">
              <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

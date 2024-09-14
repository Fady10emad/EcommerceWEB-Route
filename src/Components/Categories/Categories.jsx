import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import useAllCategories from "../../CustomHooks/useAllCategories";

export default function Categories() {
  const { data, isError, isFetching, isLoading } = useAllCategories();

  if (isError) {
    return (
      <h1 className="text-center text-red-600">There was an error fetching categories.</h1>
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
      <h1 className="text-4xl font-semibold text-center py-10">Our Categories</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-10 px-10 md:px-20 py-10">
        {data.data.data.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300"
          >
            
              <img
                className="rounded-t-lg h-80 object-contain w-full"
                src={item.image}
                alt={item.name}
              />
            
            <div className="p-5">
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                {item.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

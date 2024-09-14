import axios from 'axios';
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
      
  const [likedProducts, setLikedProducts] = useState(false);



    const {id} = useParams()

    function ProductDetailsFunc(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

 const {data,isError,isLoading} =  useQuery({
        queryKey:['PrductDetails' , id],
        queryFn:ProductDetailsFunc
    })


    if (isError) {
        return (
          <div className="h-screen bg-red-100 flex justify-center items-center">
            <h1 className="text-red-500 text-2xl">Error loading product details</h1>
          </div>
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

      const product = data.data.data;

      return (
        <div className="container mx-auto py-10">
          <div className="flex flex-col items-center md:flex-row bg-white rounded-lg shadow-lg p-5 shadow-green-500/50">
            <div className="md:w-1/2 p-5">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-6/12 mx-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-5">
              <h1 className="text-3xl font-bold mb-5">{product.title}</h1>
              <h2 className="text-xl text-gray-700 mb-5">{product.category.name}</h2>
              <p className="text-gray-600 mb-5">{product.description}</p>
              <p className="text-2xl font-semibold mb-5">
                {product.priceAfterDiscount ? (
                  <>
                    <span className="line-through text-red-700">{product.price} EGP</span>
                    <span className="ml-3 text-green-600">{product.priceAfterDiscount} EGP</span>
                  </>
                ) : (
                  <span>{product.price} EGP</span>
                )}
              </p>
              <p className="text-yellow-500 mb-5">
                <i className="fa-solid fa-star"></i> {product.ratingsAverage} Rating
              </p>
              <div className="flex justify-between items-center">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-200"
                  >
                    Add to cart
                    <svg
                      className="w-4 h-4 ml-2 rtl:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 14 10"
                    >
                      <path d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                  <i
                    className={`fa-${
                      likedProducts ? "solid" : "regular"
                    } fa-heart text-3xl cursor-pointer transition-colors duration-300 hover:text-red-500 ${
                      likedProducts
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                    onClick={()=>setLikedProducts(!likedProducts)}
                    aria-hidden="true"
                  ></i>
                </div>
            </div>
          </div>
        </div>
      );
}

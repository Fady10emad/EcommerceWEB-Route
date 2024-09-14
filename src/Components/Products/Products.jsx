import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContextProvider";
import { WishListContext } from "../../context/WishListProvider";
import HomeSlider from "../HomeSlider/HomeSlider";

export default function Products() {
  const { AddToWishList, DeleteFromWishList, WishListData, setWishListData } =
    useContext(WishListContext);

  const [loading, setLoading] = useState(false); // Global loading state

  async function handlePostInWishList(id) {
    setLoading(true);
    if (likedProducts.includes(id)) {
      const success = await DeleteFromWishList(id);
      if (success) {
        toast.success("❌ Product removed from your wishlist.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLikedProducts((prevLikedProducts) =>
          prevLikedProducts.filter((productId) => productId !== id)
        );
      } else {
        toast.error(
          "❌ Failed to remove product from your wishlist. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      const success = await AddToWishList(id);
      if (success) {
        toast.success("🎉 Product added to your wishlist successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLikedProducts((prevLikedProducts) => [...prevLikedProducts, id]);
      } else {
        toast.error(
          "❌ Failed to add product to your wishlist. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
    setLoading(false);
  }

  const { token, setToken } = useContext(AuthContext);
  const { AddPorductToCart } = useContext(CartContext);

  function GetAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: GetAllProducts,
  });

  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    if (WishListData) {
      const wishlistedProductIds = WishListData.map((product) => product._id);
      setLikedProducts(wishlistedProductIds);
    }
  }, [WishListData]);

  async function handlePostInCart(id) {
    setLoading(true);
    const resFlag = await AddPorductToCart(id);
    if (resFlag) {
      toast.success("🛒 Product added to cart successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("❌ Failed to add product to cart.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  }

  if (isError) {
    return <h1>There was an error fetching products.</h1>;
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
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="loading"
          />
        </div>
      )}
      <HomeSlider />
      <h1 className="text-4xl font-semibold text-center py-10">Our Products</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-10 px-10 md:px-20 py-10 ">
        {data.data.data.map((item) => (
          <article
            key={item._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300"
          >
            <Link to={`/ProductDetails/${item._id}`}>
              <img
                className="rounded-t-lg h-80 object-contain w-full"
                src={item.imageCover}
                alt={item.title}
              />
            </Link>

            <div className="p-5">
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                {item.category.name}
              </h5>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-400 mb-4">
                {item.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 mb-3">
                {item.description.split(" ").slice(0, 10).join(" ") +
                  (item.description.split(" ").length > 10 ? "..." : "")}
              </p>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  <span>{item.price}</span> EGP
                </h2>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-400 mr-1">
                    {item.ratingsAverage}
                  </span>
                  <i className="fa-solid fa-star text-yellow-400"></i>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handlePostInCart(item._id)}
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
                </button>
                <button onClick={() => handlePostInWishList(item._id)}>
                  <i
                    className={`fa-${
                      likedProducts.includes(item._id) ? "solid" : "regular"
                    } fa-heart text-3xl cursor-pointer transition-colors duration-300 hover:text-red-500 ${
                      likedProducts.includes(item._id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

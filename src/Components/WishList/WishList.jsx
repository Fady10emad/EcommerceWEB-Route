import React, { useContext, useState } from "react";
import { WishListContext } from "../../context/WishListProvider";
import { CartContext } from "../../context/CartContextProvider";
import { toast } from "react-toastify";
import { FallingLines } from "react-loader-spinner";

export default function WishList() {
  const { WishListData, DeleteFromWishList } = useContext(WishListContext);
  const { AddPorductToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false); // Global loading state

  async function handleAddToCart(id) {
    setLoading(true); // Start full-screen loading
    const resFlag = await AddPorductToCart(id);
    if (resFlag) {
      toast.success("🛒 Product added to cart successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error("❌ Failed to add product to cart.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    setLoading(false); // Stop full-screen loading
  }

  async function handleRemoveFromWishlist(id) {
    setLoading(true); // Start full-screen loading
    const resFlag = await DeleteFromWishList(id);
    if (resFlag) {
      toast.success("🗑️ Product removed from wishlist.", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error("❌ Failed to remove product from wishlist.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    setLoading(false); // Stop full-screen loading
  }

  return (
    <div className="relative"> {/* Parent div for relative positioning */}
      {loading && ( // Full-screen loading overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FallingLines color="#fff" width="100" visible={true} />
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {(!WishListData || WishListData.length === 0) ? (
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
          ) : (
            <ul>
              {WishListData.map((item) => (
                <li key={item.id} className="flex items-center border-b py-4">
                  <img
                    src={item.imageCover}
                    alt={item.name}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-green-500 my-5">{item.price} EGP</p>

                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                      <i className="fa-solid fa-trash me-2"></i>
                      Remove from Wishlist
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner"; // Assuming this is a spinner component

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    AllProductsCart,
    TotalPrice,
    AllNumberOfItems,
    updateCount,
    deleteProduct,
    handleClearAll,
  } = useContext(CartContext);

  function handleUpdate(id, Count) {
    updateCount(id, Count);
  }

  async function handleClearing() {
    setLoading(true);
    const res = await handleClearAll();
    if (res && res.status === 200) {
      toast.success("🛒 Cart cleared successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/products");
    } else {
      toast.error("❌ Failed to clear the cart.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    setLoading(true);
    const res = await deleteProduct(id);
    if (res) {
      toast.success("🛒 Product removed from cart successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("❌ Failed to remove product from cart.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoading(false);
  }

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FallingLines color="#fff" width="100" visible={true} />
        </div>
      )}
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg w-10/12 my-10 mx-auto">
        <div className="flex justify-center gap-5 mb-5">
          <h1 className="bg-green-500 text-center text-white w-fit p-3 rounded-lg">
            Total Price: {TotalPrice} EGP
          </h1>
          <h1 className="bg-green-500 text-center text-white w-fit p-3 rounded-lg">
            Total Items: {AllNumberOfItems}
          </h1>
          <button
            onClick={handleClearing}
            className="bg-red-800 text-center text-white w-fit p-3 rounded-lg"
          >
            Clear All
          </button>

         <Link to='/Payment'> Check Out</Link>

        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {AllProductsCart?.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <Link to={`/ProductDetails/${product.product._id}`}>
                    <img
                      src={product.product.imageCover}
                      className="w-20 mx-auto rounded-lg"
                      alt={product.name}
                    />
                  </Link>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                      type="button"
                      onClick={() => handleUpdate(product.id, product.quantity - 1)}
                    >
                      <span className="sr-only">Decrease Quantity</span>
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={product.quantity}
                      readOnly
                      className="bg-gray-50 mx-3 w-12 border border-gray-300 text-center text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                      type="button"
                      onClick={() => handleUpdate(product.id, product.quantity + 1)}
                    >
                      <span className="sr-only">Increase Quantity</span>
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => handleDelete(product.product._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

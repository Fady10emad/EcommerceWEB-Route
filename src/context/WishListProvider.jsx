import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const WishListContext = createContext();

export default function WishListProvider({ children }) {
  const [WishListData, setWishListData] = useState(null);

  // Fetch Wishlist data when the component is mounted
  useEffect(() => {
    getWishListData();
  }, []);

  async function AddToWishList(id) {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      await getWishListData();  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function getWishListData() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setWishListData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch wishlist data: ", error);
    }
  }

  async function DeleteFromWishList(id) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      });
      await getWishListData(); // Update the wishlist after deletion
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <WishListContext.Provider
      value={{ AddToWishList, WishListData, DeleteFromWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
}

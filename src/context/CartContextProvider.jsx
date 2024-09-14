import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [AllProductsCart, setAllProductsCart] = useState(null);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [AllNumberOfItems, setAllNumberOfItems] = useState(0);


  async function handleClearAll() {
    try {
      const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem("tkn")
        }
      });
      setAllNumberOfItems(0);
      setAllProductsCart(null);
      setTotalPrice(0);
      return res; 
    } catch (error) {
      console.log(error);
      return null; 
    }
  }
  



  async function AddPorductToCart(ProductIDforCart) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: ProductIDforCart,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        // console.log(res.data.numOfCartItems);
        setAllNumberOfItems(res.data.numOfCartItems);
        // setAllProductsCart(res.data.data.products);
        // setTotalPrice(res.data.data.totalCartPrice);
        getUserCart();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        
        setAllNumberOfItems(res.data.numOfCartItems);
        setAllProductsCart(res.data.data.products);
        setTotalPrice(res.data.data.totalCartPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateCount(ProductId, newCount) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        setAllNumberOfItems(res.data.numOfCartItems);
        setAllProductsCart(res.data.data.products);
        setTotalPrice(res.data.data.totalCartPrice);
      })
      .catch((error) => {});
  }

 async function deleteProduct(pId) {
   return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setAllNumberOfItems(res.data.numOfCartItems);
        setAllProductsCart(res.data.data.products);
        setTotalPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        AddPorductToCart,
        getUserCart,
        AllProductsCart,
        TotalPrice,
        AllNumberOfItems,
        updateCount,
        deleteProduct,
        handleClearAll
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

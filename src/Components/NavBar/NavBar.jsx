import { Button, Navbar, NavbarLink } from "flowbite-react";
import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import CartContextProvider, { CartContext } from "../../context/CartContextProvider";

export default function NavBar() {
  const { token, setToken } = useContext(AuthContext);
  const { AllNumberOfItems } = useContext(CartContext);
  const navigate = useNavigate();



  function handleLogout() {
  
    setToken(null);
    localStorage.removeItem('tkn');
    navigate('/Login');
  }



  return (
    <div>
      <Navbar className="bg-slate-400 p-5">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          <i className="fa-solid fa-cart-shopping mx-2 text-3xl text-green-600"></i>
          fresh cart
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <>
            {token  ? <>
              <button onClick={handleLogout} className="text-xl">
                Logout
              </button>
            </> : <>
              <NavLink to='Login' className='mx-6 text-xl'>
                Login
              </NavLink>
              <NavLink to='register' className='text-xl'>
                Register
              </NavLink>
            </> }
          </>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink to='/Cart' className='text-xl flex items-center relative'>
            <i className="fa-solid fa-cart-shopping mx-2"></i>
            Cart
            {AllNumberOfItems > 0 && (
              <span className="absolute -bottom-2 -left-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                {AllNumberOfItems}
              </span>
            )}
            
          </NavLink>
          <NavLink to='/WishList' className='text-xl flex items-center relative'>
            Wish list          
          </NavLink>
          <NavLink to='/Products' className='text-xl'>
            Products
          </NavLink>
          <NavLink to='/Categories' className='text-xl'>
            Categories
          </NavLink>
          <NavLink to='/brands' className='text-xl'>
            Brands
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

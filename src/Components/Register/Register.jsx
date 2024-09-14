import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import React, { useState } from "react";
import { InfinitySpin, Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


export default function Register() {

  const nagivate = useNavigate();
  const [ErrorMes, setErrorMes] = useState(null);
  const [isSucsses, setisSucsses] = useState(null);
  const [isClicked, setisClicked] = useState(false);


  const user = {
    name: "",
    phone: "",
    password: "",
    rePassword: "",
    email: "",
  };

  function submitFunction(values) {
    // console.log(values)
    setisClicked(true)
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(function (x) {
        console.log(x.data.message);
        setisSucsses(x.data.message);
        setErrorMes(null);
        setisClicked(false);
        setTimeout(() => {
          nagivate("/login");
        }, 3000);

      })
      .catch(function (x) {
        console.log(x.response.data.message);
        setisSucsses(null);
        setErrorMes(x.response.data.message);
        setisClicked(false);
        setTimeout(() => {
          setErrorMes(null);
        }, 2000);
      });
  }

  const resgisterForm = useFormik({
    initialValues: user,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is Required")
        .min(3, "min must be 3 chars")
        .max(12, "max must be 12 chars"),
      email: yup.string().email("invalid Email"),
      phone: yup
        .string()
        .required("phone req")
        .matches(/^(20)?01[0125][0-9]{8}$/),
      password: yup.string().min(6).max(12).required(),
      rePassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "must match"),
    }) ,  
    onSubmit: submitFunction,
  });

  return (
    <>
    <form
      onSubmit={resgisterForm.handleSubmit}
      className="max-w-md mx-auto my-20 "
    >
      {ErrorMes != null ? (
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">{ErrorMes}</span>
        </div>
      ) : (
        " "
      )}
      {isSucsses != null ? (
        <div
          class="p-4 mb-4 text-sm text-white rounded-lg bg-green-500 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">{isSucsses}</span>
        </div>
      ) : (
        " "
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          value={resgisterForm.values.name}
          onBlur={resgisterForm.handleBlur}
          onChange={resgisterForm.handleChange}
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>

        {resgisterForm.errors.name && resgisterForm.touched.name ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{resgisterForm.errors.name}</span> Change
            a few things up and try submitting again.
          </div>
        ) : (
          " "
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          value={resgisterForm.values.email}
          onBlur={resgisterForm.handleBlur}
          onChange={resgisterForm.handleChange}
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
        {resgisterForm.errors.email && resgisterForm.touched.email ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{resgisterForm.errors.email}</span>{" "}
            Change a few things up and try submitting again.
          </div>
        ) : (
          " "
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          value={resgisterForm.values.phone}
          onBlur={resgisterForm.handleBlur}
          onChange={resgisterForm.handleChange}
          name="phone"
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
        {resgisterForm.errors.phone && resgisterForm.touched.phone ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{resgisterForm.errors.phone}</span>{" "}
            Change a few things up and try submitting again.
          </div>
        ) : (
          " "
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          value={resgisterForm.values.password}
          onBlur={resgisterForm.handleBlur}
          onChange={resgisterForm.handleChange}
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
        {resgisterForm.errors.password && resgisterForm.touched.password ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{resgisterForm.errors.password}</span>{" "}
            Change a few things up and try submitting again.
          </div>
        ) : (
          " "
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          value={resgisterForm.values.rePassword}
          onBlur={resgisterForm.handleBlur}
          onChange={resgisterForm.handleChange}
          name="rePassword"
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label
          htmlFor="rePassword"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          rePassword
        </label>
        {resgisterForm.errors.rePassword &&
        resgisterForm.touched.rePassword ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{resgisterForm.errors.rePassword}</span>{" "}
            Change a few things up and try submitting again.
          </div>
        ) : (
          " "
        )}
      </div>

      <button 
        type="submit"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {!isClicked ? 'Submit' :   <Oval
          visible={true}
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> }
      
      </button>
    </form>
    </>
  );
}

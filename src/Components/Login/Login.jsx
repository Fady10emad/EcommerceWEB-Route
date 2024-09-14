import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from './../../context/AuthContextProvider';

export default function Login() {
  const navigate = useNavigate();
  const [errorMes, setErrorMes] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  
  const {token,setToken}=useContext(AuthContext)

  const user = {
    email: "",
    password: "",
  };

  async function loginFormUser(values) {
    setIsClicked(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      console.log(response.data.token);
      setToken(response.data.token)
      localStorage.setItem('tkn',response.data.token)
      setIsSuccess(response.data.message);
      setErrorMes(null);
      setTimeout(() => {
        navigate("/Products");
      }, 3000);

    } catch (error) {
      setIsSuccess(null);
      setErrorMes(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setErrorMes(null);
      }, 2000);
    } finally {
      setIsClicked(false);
    }
  }

  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: loginFormUser,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password can't be more than 12 characters")
        .required("Password is required"),
    }),
  });

  return (
    <form
      onSubmit={loginFormik.handleSubmit}
      className="max-w-md mx-auto my-20"
    >
      {errorMes && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{errorMes}</span>
        </div>
      )}
      {isSuccess && (
        <div
          className="p-4 mb-4 text-sm text-white rounded-lg bg-green-500 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{isSuccess}</span>
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          value={loginFormik.values.email}
          onBlur={loginFormik.handleBlur}
          onChange={loginFormik.handleChange}
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
        {loginFormik.errors.email && loginFormik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{loginFormik.errors.email}</span> Change a few things up and try submitting again.
          </div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          value={loginFormik.values.password}
          onBlur={loginFormik.handleBlur}
          onChange={loginFormik.handleChange}
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
        {loginFormik.errors.password && loginFormik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{loginFormik.errors.password}</span> Change a few things up and try submitting again.
          </div>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {!isClicked ? "Submit" : (
          <Oval
            visible={true}
            height={20}
            width={20}
            color="#ffffff"
            ariaLabel="oval-loading"
          />
        )}
      </button>
    </form>
  );
}

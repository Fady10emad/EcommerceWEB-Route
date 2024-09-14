import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContextProvider'

export default function Payment() {

    const { cartId, clearUI } = useContext(CartContext)
    const [isOnline, setIsOnline] = useState(true)
    const [loading, setLoading] = useState(false)

    function detectAndCall(values) {
        setLoading(true)
        if (isOnline) {
            createOnlineOrder(values)
        } else {
            createCashOrder(values)
        }
    }

    function createCashOrder(values) {
        const backendBody = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, backendBody, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        })
        .then((res) => {
            console.log(res);
            clearUI()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false)
        })
    }

    function createOnlineOrder(values) {
        const backendBody = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, backendBody, {
            headers: {
                token: localStorage.getItem('tkn')
            },
            params: {
                url: 'http://localhost:5173'
            }
        })
        .then((res) => {
            window.open(res.data.session.url, '_self')
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const paymentFormik = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: '',
        },
        onSubmit: detectAndCall,
    })

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="text-center text-white">Loading...</div>
                </div>
            )}
            <div className="md:min-h-[74%] min-h-[75.2%] flex items-center">
                <form className="mx-auto py-9 w-[60%]" onSubmit={paymentFormik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={paymentFormik.values.details}
                            onBlur={paymentFormik.handleBlur}
                            onChange={paymentFormik.handleChange}
                            name="details"
                            id="details"
                            className="block w-full px-0 py-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="details"
                            className="absolute text-sm text-gray-500 transform -translate-y-8 scale-75 top-3 left-0 peer-focus:text-blue-600 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Details
                        </label>
                        {paymentFormik.errors.details && paymentFormik.touched.details && (
                            <div className="p-2 mt-2 text-sm text-red-600 bg-red-100">{paymentFormik.errors.details}</div>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            value={paymentFormik.values.phone}
                            onBlur={paymentFormik.handleBlur}
                            onChange={paymentFormik.handleChange}
                            name="phone"
                            id="phone"
                            className="block w-full px-0 py-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="phone"
                            className="absolute text-sm text-gray-500 transform -translate-y-8 scale-75 top-3 left-0 peer-focus:text-blue-600 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Phone
                        </label>
                        {paymentFormik.errors.phone && paymentFormik.touched.phone && (
                            <div className="p-2 mt-2 text-sm text-red-600 bg-red-100">{paymentFormik.errors.phone}</div>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={paymentFormik.values.city}
                            onBlur={paymentFormik.handleBlur}
                            onChange={paymentFormik.handleChange}
                            name="city"
                            id="city"
                            className="block w-full px-0 py-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="city"
                            className="absolute text-sm text-gray-500 transform -translate-y-8 scale-75 top-3 left-0 peer-focus:text-blue-600 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            City
                        </label>
                        {paymentFormik.errors.city && paymentFormik.touched.city && (
                            <div className="p-2 mt-2 text-sm text-red-600 bg-red-100">{paymentFormik.errors.city}</div>
                        )}
                    </div>

                    <div className="flex justify-center mt-12 space-x-4">
                        <button
                            onClick={() => setIsOnline(false)}
                            type="submit"
                            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Cash Order
                        </button>
                        <button
                            onClick={() => setIsOnline(true)}
                            type="submit"
                            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Online Order
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

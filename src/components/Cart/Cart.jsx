import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import { Link } from 'react-router-dom'

export default function Cart() {
    const [isLoading, setIsLoading] = useState(false)

    // Static cart data
    const staticCart = {
        data: {
            products: [
                {
                    product: {
                        id: "1",
                        title: "Running Shoes Pro",
                        imageCover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
                    },
                    price: 129.99,
                    count: 1
                },
                {
                    product: {
                        id: "3",
                        title: "Yoga Leggings Premium",
                        imageCover: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop"
                    },
                    price: 59.99,
                    count: 2
                }
            ]
        }
    };

    const [cart, setCart] = useState(staticCart);

    useEffect(() => {
        document.title = 'Cart - Sportswear Store'
    }, [])

    // Calculate cart totals
    const subtotal = cart?.data?.products?.reduce((total, item) => total + (item.price * item.count), 0) || 0
    const shipping = subtotal > 0 ? 15 : 0
    const total = subtotal + shipping
    const hasItems = cart && cart.data.products.length > 0

    const updateQuantity = async (productId, newCount) => {
        setIsLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setCart(prevCart => ({
            ...prevCart,
            data: {
                ...prevCart.data,
                products: prevCart.data.products.map(item =>
                    item.product.id === productId
                        ? { ...item, count: newCount }
                        : item
                )
            }
        }));
        setIsLoading(false)
    }

    const removeItem = async (productId) => {
        setIsLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setCart(prevCart => ({
            ...prevCart,
            data: {
                ...prevCart.data,
                products: prevCart.data.products.filter(item => item.product.id !== productId)
            }
        }));
        setIsLoading(false)
    }

    const handleClearCart = async () => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setCart({
            data: {
                products: []
            }
        });
        setIsLoading(false);
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-blue-50/30 to-teal-50/30 py-8 px-4 sm:px-6 lg:px-20">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                        <span>Updating cart...</span>
                    </div>
                </div>
            )}

            {/* Title Section */}
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-400 w-5 h-10 rounded-md"></div>
                    <h1 className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-semibold text-2xl">Shopping Cart</h1>
                </div>
                <p className="text-gray-600 mb-8 ml-8">Review your sportswear items and proceed to checkout</p>

                {/* Cart Container */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        {/* Desktop Headers */}
                        <div className="hidden md:grid grid-cols-12 gap-4 bg-white rounded-xl shadow-sm p-6 mb-4 text-gray-500 font-medium text-sm uppercase tracking-wide">
                            <div className="col-span-5">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Subtotal</div>
                        </div>

                        {/* Cart Items */}
                        {hasItems ? (
                            <div className="space-y-4">
                                {cart.data.products.map((item) => (
                                    <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        {/* Product Info */}
                                        <div className="md:col-span-5 flex items-center gap-4">
                                            <img
                                                src={item.product.imageCover}
                                                className="w-20 h-20 object-contain rounded-lg border border-gray-100"
                                                alt={item.product.title}
                                            />
                                            <div>
                                                <h3 className="font-medium text-gray-900 line-clamp-2">{item.product.title}</h3>
                                                <p className="text-gray-500 text-sm mt-1">SKU: {item.product.id.slice(0, 8)}</p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="md:col-span-2 flex justify-start md:justify-center">
                                            <span className="text-gray-900 font-medium md:hidden mr-2">Price: </span>
                                            <p className="text-gray-700 font-semibold">${item.price}</p>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="md:col-span-3 flex items-center justify-start md:justify-center">
                                            <span className="text-gray-900 font-medium md:hidden mr-2">Qty: </span>
                                            <div className="flex items-center border border-gray-200 rounded-lg w-28 h-10 justify-between">
                                                <button
                                                    onClick={() => item.count > 1 ? updateQuantity(item.product.id, item.count - 1) : removeItem(item.product.id)}
                                                    className="px-3 text-gray-500 cursor-pointer hover:text-blue-500 transition h-full flex items-center"
                                                    disabled={isLoading}
                                                >
                                                    -
                                                </button>
                                                <span className="font-medium text-gray-800">{item.count}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.count + 1)}
                                                    className="px-3 cursor-pointer text-gray-500 hover:text-blue-500 transition h-full flex items-center"
                                                    disabled={isLoading}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="md:col-span-2 flex items-center justify-between">
                                            <div>
                                                <span className="text-gray-900 font-medium md:hidden">Subtotal: </span>
                                                <p className="text-gray-900 font-semibold">${(item.price * item.count).toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-gray-400 cursor-pointer hover:text-blue-500 transition p-2"
                                                disabled={isLoading}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 mb-6">Looks like you haven't added any sportswear items to your cart yet.</p>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-teal-600 transition"
                                >
                                    Browse Sportswear
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    {hasItems && (
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-100">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        to="/checkout"
                                        className="block w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-teal-600 transition"
                                    >
                                        Proceed to Checkout
                                    </Link>

                                    <button
                                        onClick={handleClearCart}
                                        className="block w-full border border-gray-300 text-gray-700 text-center font-medium py-3 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Clear Cart
                                    </button>

                                    <Link
                                        to="/products"
                                        className="flex items-center justify-center text-blue-500 font-medium py-2 hover:text-blue-600 transition"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import HomeCategory from '../HomeCategory/HomeCategory';
import HomeSlider from '../HomeSlider/HomeSlider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';

export default function Home() {
    // Static sportswear products data
    const staticProducts = [
        {
            _id: "1",
            title: "Running Shoes Pro",
            imageCover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
            category: { name: "Running Shoes" },
            price: 129.99,
            ratingsAverage: 4.8
        },
        {
            _id: "2",
            title: "Basketball Jersey Elite",
            imageCover: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
            category: { name: "Basketball" },
            price: 79.99,
            ratingsAverage: 4.6
        },
        {
            _id: "3",
            title: "Yoga Leggings Premium",
            imageCover: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
            category: { name: "Yoga Wear" },
            price: 59.99,
            ratingsAverage: 4.9
        },
        {
            _id: "4",
            title: "Training Shorts",
            imageCover: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
            category: { name: "Training" },
            price: 45.99,
            ratingsAverage: 4.5
        },
        {
            _id: "5",
            title: "Football Cleats Pro",
            imageCover: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=500&fit=crop",
            category: { name: "Football" },
            price: 149.99,
            ratingsAverage: 4.7
        },
        {
            _id: "6",
            title: "Tennis Skirt Performance",
            imageCover: "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=500&h=500&fit=crop",
            category: { name: "Tennis" },
            price: 65.99,
            ratingsAverage: 4.8
        },
        {
            _id: "7",
            title: "Hoodie Sportswear",
            imageCover: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
            category: { name: "Casual Wear" },
            price: 89.99,
            ratingsAverage: 4.4
        },
        {
            _id: "8",
            title: "Cycling Jersey Aero",
            imageCover: "https://images.unsplash.com/photo-1586351012965-8616a6d382aa?w=500&h=500&fit=crop",
            category: { name: "Cycling" },
            price: 95.99,
            ratingsAverage: 4.6
        }
    ];

    // Static categories data
    const staticCategories = [
        {
            _id: "1",
            name: "Running Shoes",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
        },
        {
            _id: "2",
            name: "Basketball",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop"
        },
        {
            _id: "3",
            name: "Yoga Wear",
            image: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=200&h=200&fit=crop"
        },
        {
            _id: "4",
            name: "Training Gear",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop"
        },
        {
            _id: "5",
            name: "Football",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop"
        },
        {
            _id: "6",
            name: "Tennis",
            image: "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=200&h=200&fit=crop"
        }
    ];

    const [addedItems, setAddedItems] = useState([]);
    const [wishItems, setWishItems] = useState([]);
    const navigate = useNavigate();

    const handleAddToCart = (productId) => {
        let token = localStorage.getItem('userToken');

        if (!token) {
            toast.error("You must sign in first to add to cart");
            navigate("/login");
            return;
        }
        setAddedItems((prev) => [...prev, productId]);
        toast.success("Product added to cart!");
    }

    const handleWishlistAction = (productId) => {
        let token = localStorage.getItem('userToken');

        if (!token) {
            toast.error("You must sign in first to add to wishlist");
            navigate("/login");
            return;
        }

        if (wishItems.includes(productId)) {
            setWishItems(wishItems.filter(id => id !== productId));
            toast.success("Product removed from wishlist!");
        } else {
            setWishItems([...wishItems, productId]);
            toast.success("Product added to wishlist!");
        }
    }

    useEffect(() => {
        document.title = 'Home - Sportswear Store';
    }, []);

    return (
        <>
            <header className='flex flex-col lg:flex-row justify-center gap-6 lg:gap-0 px-5 lg:px-30 py-6 relative'>
                <div className='w-full text-center md:text-left lg:w-3/12 mb-2 lg:mb-0'>
                    <HomeCategory />
                </div>

                <div className='hidden lg:block bg-gradient-to-b from-blue-100 to-teal-100 h-85 w-0.5 me-15 absolute top-0 left-1/4'></div>

                <div className='w-full lg:w-9/12'>
                    <HomeSlider />
                </div>
            </header>

            {/* Products section */}
            <section className='my-10 px-4 sm:px-6 lg:px-30'>
                {/* title */}
                <div className='px-2 sm:px-0'>
                    <div className='flex items-center gap-5'>
                        <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                        <h1 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Products</h1>
                    </div>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mt-5 sm:mt-7 mb-6 sm:mb-10 text-gray-800'>Explore Our Sportswear</h1>
                </div>

                {/* Products */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {staticProducts.map((product) => (
                        <div key={product._id} className=''>
                            {/* card */}
                            <div className='cursor-pointer product bg-white p-3 sm:p-4 rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full border border-gray-100 hover:-translate-y-2'>
                                {/* Product Image */}
                                <Link to={`/productdetails/${product._id}`}>
                                    <div className="overflow-hidden rounded-lg lg:rounded-xl">
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-full h-40 sm:h-48 lg:h-52 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="mt-3 sm:mt-4 space-y-1">
                                        <span className="inline-block text-xs font-medium text-gray-400 uppercase tracking-widest">
                                            {product.category.name}
                                        </span>
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug line-clamp-2">
                                            {product.title}
                                        </h3>

                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-blue-600 font-bold text-xs sm:text-sm">${product.price}</span>
                                            <div className="flex items-center text-amber-500 text-xs sm:text-sm">
                                                <i className="fas fa-star mr-1"></i>
                                                {product.ratingsAverage}
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Action Buttons */}
                                <div className="mt-3 sm:mt-5 flex justify-between items-center gap-2 sm:gap-3">
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        disabled={addedItems.includes(product._id)}
                                        className={`cursor-pointer flex-1 py-1 sm:py-2 rounded-lg lg:rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium 
                                                ${addedItems.includes(product._id) ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 hover:shadow-lg"}`}
                                    >
                                        {addedItems.includes(product._id) ? "Added" : "Add to Cart"}
                                    </button>

                                    <button
                                        onClick={() => handleWishlistAction(product._id)}
                                        className={`cursor-pointer p-1 sm:p-2 rounded-full border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 ${wishItems.includes(product._id)
                                            ? "bg-gradient-to-r from-pink-50 to-rose-50 border-rose-400 text-rose-500 focus:ring-rose-300"
                                            : "border-gray-300 text-gray-500 hover:text-rose-500 hover:border-rose-400 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 focus:ring-rose-300"
                                            }`}
                                        title={wishItems.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                                    >
                                        <i className={`fa-solid fa-heart text-sm sm:text-lg transition-all duration-300 ${wishItems.includes(product._id)
                                            ? "animate-pulse"
                                            : "hover:scale-110"
                                            }`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mt-8 lg:mt-10'>
                    <Link to={'/products'}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-[15%] py-3 px-4 text-center border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                    >
                        View All Products
                    </Link>
                </div>
            </section>

            {/* category section */}
            <section className='px-5 lg:px-30 py-16 bg-gradient-to-b from-blue-50/30 via-white to-gray-50/30'>
                {/* title */}
                <div className='px-2 sm:px-0 mb-12'>
                    <div className='flex items-center gap-5 mb-4'>
                        <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                        <h1 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Categories</h1>
                    </div>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-800'>Browse Sportswear Categories</h1>
                    <p className='text-gray-600 text-base lg:text-lg'>Discover our premium sportswear collections</p>
                </div>

                {/* main section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                    {staticCategories.map((categories) => (
                        <div
                            key={categories._id}
                            className='group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100'
                        >
                            {/* Background gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                            {/* Content container */}
                            <div className='relative p-6 lg:p-8 flex flex-col items-center text-center'>
                                {/* Image container with modern styling */}
                                <div className='relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 p-4 group-hover:from-blue-100 group-hover:to-teal-100 transition-all duration-300'>
                                    <img
                                        src={categories.image}
                                        className='w-16 h-16 lg:w-20 lg:h-20 object-cover object-center mx-auto group-hover:scale-110 transition-all duration-300'
                                        alt={categories.name}
                                    />
                                    {/* Decorative circle */}
                                    <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                </div>

                                {/* Category name */}
                                <h3 className='font-semibold text-lg lg:text-xl text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300'>
                                    {categories.name}
                                </h3>

                                {/* Subtle description */}
                                <p className='text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                                    Explore collection
                                </p>
                            </div>

                            {/* Bottom border accent */}
                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mt-8 lg:mt-10'>
                    <Link to={'/category'}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-[15%] py-3 px-4 text-center border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                    >
                        View All Categories
                    </Link>
                </div>
            </section>

            {/* Features section */}
            <section className='py-20 px-5 lg:px-30 bg-gradient-to-br from-blue-50/30 via-white to-teal-50/30 relative overflow-hidden'>
                {/* Background decorative elements */}
                <div className='absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-xl'></div>
                <div className='absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-300/10 to-teal-300/10 rounded-full blur-2xl'></div>

                {/* Section header */}
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center gap-3 mb-4'>
                        <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                        <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Why Choose Us</h2>
                    </div>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800'>Premium Sportswear Experience</h1>
                    <p className='text-gray-600 text-base lg:text-lg max-w-2xl mx-auto'>We're committed to providing exceptional service and support at every step of your fitness journey</p>
                </div>

                {/* Features grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto'>
                    {/* First card - Free Delivery */}
                    <div className='group relative'>
                        {/* Card */}
                        <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 relative overflow-hidden'>
                            {/* Hover gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                            {/* Icon container */}
                            <div className='relative mb-6 flex justify-center'>
                                <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                    <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center'>
                                        <svg width="32" height="32" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover:scale-110 transition-transform duration-300'>
                                            <g clipPath="url(#clip0_913_502)">
                                                <path d="M12.1667 32.1667C14.0077 32.1667 15.5 30.6743 15.5 28.8333C15.5 26.9924 14.0077 25.5 12.1667 25.5C10.3258 25.5 8.83337 26.9924 8.83337 28.8333C8.83337 30.6743 10.3258 32.1667 12.1667 32.1667Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M28.8333 32.1667C30.6743 32.1667 32.1667 30.6743 32.1667 28.8333C32.1667 26.9924 30.6743 25.5 28.8333 25.5C26.9924 25.5 25.5 26.9924 25.5 28.8333C25.5 30.6743 26.9924 32.1667 28.8333 32.1667Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.83325 28.8335H7.49992C6.39535 28.8335 5.49992 27.9381 5.49992 26.8335V22.1668M3.83325 8.8335H20.1666C21.2712 8.8335 22.1666 9.72893 22.1666 10.8335V28.8335M15.4999 28.8335H25.4999M32.1666 28.8335H33.4999C34.6045 28.8335 35.4999 27.9381 35.4999 26.8335V18.8335M35.4999 18.8335H22.1666M35.4999 18.8335L31.0825 11.4712C30.7211 10.8688 30.0701 10.5002 29.3675 10.5002H22.1666" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                {/* Floating effect indicator */}
                                <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse'></div>
                            </div>

                            {/* Content */}
                            <div className='relative text-center'>
                                <h3 className='font-semibold text-xl text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300'>
                                    FREE AND FAST DELIVERY
                                </h3>
                                <p className='text-gray-600 text-sm leading-relaxed'>
                                    Free delivery for all orders over $140
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center'></div>
                        </div>
                    </div>

                    {/* Second card - Customer Service */}
                    <div className='group relative'>
                        <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 relative overflow-hidden'>
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                            <div className='relative mb-6 flex justify-center'>
                                <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                    <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center'>
                                        <svg width="32" height="32" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover:scale-110 transition-transform duration-300'>
                                            <g clipPath="url(#clip0_913_519)">
                                                <path d="M13.3334 25.5001C13.3334 23.6591 11.841 22.1667 10.0001 22.1667C8.15913 22.1667 6.66675 23.6591 6.66675 25.5001V28.8334C6.66675 30.6744 8.15913 32.1667 10.0001 32.1667C11.841 32.1667 13.3334 30.6744 13.3334 28.8334V25.5001Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M33.3334 25.5001C33.3334 23.6591 31.841 22.1667 30.0001 22.1667C28.1591 22.1667 26.6667 23.6591 26.6667 25.5001V28.8334C26.6667 30.6744 28.1591 32.1667 30.0001 32.1667C31.841 32.1667 33.3334 30.6744 33.3334 28.8334V25.5001Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.66675 25.5001V20.5001C6.66675 16.9639 8.07151 13.5725 10.572 11.072C13.0725 8.57151 16.4639 7.16675 20.0001 7.16675C23.5363 7.16675 26.9277 8.57151 29.4282 11.072C31.9287 13.5725 33.3334 16.9639 33.3334 20.5001V25.5001" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse'></div>
                            </div>

                            <div className='relative text-center'>
                                <h3 className='font-semibold text-xl text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300'>
                                    24/7 CUSTOMER SERVICE
                                </h3>
                                <p className='text-gray-600 text-sm leading-relaxed'>
                                    Friendly 24/7 customer support
                                </p>
                            </div>

                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center'></div>
                        </div>
                    </div>

                    {/* Third card - Money Back Guarantee */}
                    <div className='group relative md:col-span-2 lg:col-span-1 md:mx-auto lg:mx-0 md:max-w-sm lg:max-w-none'>
                        <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 relative overflow-hidden'>
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                            <div className='relative mb-6 flex justify-center'>
                                <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                    <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center'>
                                        <svg width="32" height="32" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover:scale-110 transition-transform duration-300'>
                                            <path d="M19.9832 3.0874C21.0047 3.0874 22.0041 3.23663 22.7576 3.51807L31.075 6.63525H31.0759C33.2954 7.46202 35.0505 10.0076 35.0505 12.3667V24.7495C35.0505 25.8367 34.7063 27.0895 34.1238 28.2485C33.5778 29.3348 32.8404 30.3024 32.031 30.9556L31.8679 31.0825L24.7009 36.4321L24.6951 36.437C23.4124 37.4261 21.7238 37.9331 19.9998 37.9331C18.277 37.933 16.5847 37.4263 15.2644 36.4478H15.2634L8.09937 31.0991C7.22666 30.4484 6.42532 29.4208 5.84253 28.2593C5.25969 27.0976 4.91675 25.8447 4.91675 24.7661V12.3667C4.91675 10.0075 6.67169 7.46189 8.89136 6.63525H8.89233L17.2087 3.51807C17.9622 3.23655 18.9615 3.08743 19.9832 3.0874ZM20.0007 4.58545C19.2021 4.58763 18.3752 4.69487 17.7419 4.93115L17.741 4.93213L9.42456 8.04834H9.42358C8.59608 8.35993 7.85485 9.02245 7.32397 9.79053C6.7929 10.5589 6.43335 11.4898 6.43335 12.3833V24.7661C6.43335 25.6606 6.74393 26.6893 7.20093 27.6011C7.65781 28.5126 8.29317 29.3726 9.00073 29.9009L16.1677 35.2505C17.2296 36.0444 18.6282 36.4252 20.0017 36.4253C21.3756 36.4253 22.7779 36.0442 23.8474 35.2515L23.8494 35.2505L31.0154 29.9009L31.0164 29.8999C31.7311 29.3638 32.3667 28.5049 32.822 27.5942C33.2774 26.6836 33.5837 25.6596 33.5837 24.7661V12.3667C33.5837 11.4807 33.2233 10.5539 32.6931 9.78662C32.1626 9.01907 31.4221 8.35386 30.5974 8.03369L30.5925 8.03174L22.2751 4.91455L22.2664 4.91162C21.6282 4.68643 20.8001 4.58327 20.0007 4.58545Z" fill="#3B82F6" stroke="#3B82F6" />
                                            <path d="M24.4038 15.27C24.6919 14.9822 25.1754 14.982 25.4634 15.27C25.7513 15.558 25.7511 16.0415 25.4634 16.3296L18.2964 23.4966C18.1451 23.6478 17.9573 23.7163 17.7661 23.7163C17.5751 23.7162 17.388 23.6477 17.2368 23.4966L14.5532 20.813C14.2654 20.5249 14.2652 20.0414 14.5532 19.7534C14.8412 19.4654 15.3247 19.4655 15.6128 19.7534L17.7661 21.9067L18.1206 21.5532L24.4038 15.27Z" fill="#3B82F6" stroke="#3B82F6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse'></div>
                            </div>

                            <div className='relative text-center'>
                                <h3 className='font-semibold text-xl text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300'>
                                    MONEY BACK GUARANTEE
                                </h3>
                                <p className='text-gray-600 text-sm leading-relaxed'>
                                    We return money within 30 days
                                </p>
                            </div>

                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center'></div>
                        </div>
                    </div>
                </div>

                {/* Optional: Additional trust indicators */}
                <div className='mt-16 text-center'>
                    <div className='inline-flex items-center gap-6 text-gray-500 text-sm'>
                        <div className='flex items-center gap-2'>
                            <i className="fas fa-shield-alt bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"></i>
                            <span>Secure Payment</span>
                        </div>
                        <div className='w-px h-4 bg-gradient-to-b from-blue-200 to-teal-200'></div>
                        <div className='flex items-center gap-2'>
                            <i className="fas fa-users bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"></i>
                            <span>10k+ Happy Customers</span>
                        </div>
                        <div className='w-px h-4 bg-gradient-to-b from-blue-200 to-teal-200'></div>
                        <div className='flex items-center gap-2'>
                            <i className="fas fa-award bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"></i>
                            <span>Premium Quality</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
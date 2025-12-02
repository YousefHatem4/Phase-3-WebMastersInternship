import React, { useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

export default function Wishlist() {
    const navigate = useNavigate();
    const [addedItems, setAddedItems] = useState([]);
    const [wishItems, setWishItems] = useState([]);

    // Static wishlist data
    const staticWishlist = [
        {
            _id: "1",
            title: "Running Shoes Pro",
            imageCover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
            category: { name: "Running Shoes" },
            price: 129.99,
            ratingsAverage: 4.8
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
            _id: "5",
            title: "Football Cleats Pro",
            imageCover: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=500&fit=crop",
            category: { name: "Football" },
            price: 149.99,
            ratingsAverage: 4.7
        }
    ];

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

    const handleRemoveFromWishlist = (productId) => {
        setWishItems(wishItems.filter(id => id !== productId));
        toast.success("Product removed from wishlist!");
    }

    useEffect(() => {
        document.title = 'Wishlist - Sportswear Store';
        window.scrollTo(0, 0);
        // Initialize wishlist with static data
        setWishItems(staticWishlist.map(item => item._id));
    }, []);

    return <>
        {/* Products section */}
        <section className='my-10 px-4 sm:px-6 lg:px-30'>
            {/* title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='px-2 mb-10 sm:px-0'
            >
                <div className='flex items-center gap-5'>
                    <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg shadow-md'></div>
                    <h1 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-extrabold text-lg sm:text-xl tracking-wide'>My Wishlist</h1>
                </div>

            </motion.div>

            {/* Products */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
            >
                {staticWishlist.map((product) => (
                    <motion.div
                        key={product._id}
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* card */}
                        <div className='cursor-pointer product bg-white p-3 sm:p-4 rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full border border-gray-100'>
                            {/* Product Image */}
                            <Link to={`/productdetails/${product._id}`}>
                                <div className="overflow-hidden rounded-lg lg:rounded-xl relative">
                                    <img
                                        src={product.imageCover}
                                        alt={product.title}
                                        className="w-full h-40 sm:h-48 lg:h-52 object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                                    />
                                    {/* Subtle gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                </div>

                                {/* Product Info */}
                                <div className="mt-3 sm:mt-4 space-y-1">
                                    <span className="inline-block text-xs font-medium text-gray-400 uppercase tracking-widest">
                                        {product.category.name}
                                    </span>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug line-clamp-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
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
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAddToCart(product._id)}
                                    disabled={addedItems.includes(product._id)}
                                    className={`cursor-pointer flex-1 py-2 rounded-lg lg:rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold shadow 
                                        ${addedItems.includes(product._id)
                                            ? "bg-gray-400 text-white cursor-not-allowed shadow-none"
                                            : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 hover:shadow-md"}`}
                                >
                                    {addedItems.includes(product._id) ? "Added" : "Add to Cart"}
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => handleRemoveFromWishlist(product._id)}
                                    className="cursor-pointer p-2 rounded-full border border-rose-400 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-500 hover:scale-110 transition-colors duration-300 shadow-sm hover:shadow-md"
                                >
                                    <i className="fa-solid fa-heart text-sm sm:text-lg"></i>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty state */}
            {staticWishlist.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                        <i className="fa-regular fa-heart text-8xl"></i>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Start adding your favorite sportswear items to your wishlist!</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-teal-600 transition-colors duration-300"
                    >
                        Browse Products
                    </Link>
                </motion.div>
            )}
        </section>
    </>
}
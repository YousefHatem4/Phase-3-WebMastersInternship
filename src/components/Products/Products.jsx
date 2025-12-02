import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Products() {
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
        },
        {
            _id: "9",
            title: "Swimwear Pro",
            imageCover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop",
            category: { name: "Swimwear" },
            price: 75.99,
            ratingsAverage: 4.7
        },
        {
            _id: "10",
            title: "Hiking Boots",
            imageCover: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=500&h=500&fit=crop",
            category: { name: "Outdoor" },
            price: 159.99,
            ratingsAverage: 4.9
        },
        {
            _id: "11",
            title: "Gym Gloves",
            imageCover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
            category: { name: "Training" },
            price: 29.99,
            ratingsAverage: 4.3
        },
        {
            _id: "12",
            title: "Basketball Shorts",
            imageCover: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
            category: { name: "Basketball" },
            price: 49.99,
            ratingsAverage: 4.5
        }
    ];

    const navigate = useNavigate();
    const [addedItems, setAddedItems] = useState([]);
    const [wishItems, setWishItems] = useState([]);

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
        document.title = 'Products - Sportswear Store';
        window.scrollTo(0, 0);
    }, []);

    return <>
        {/* Products section */}
        <section className='my-10 px-4 sm:px-6 lg:px-30'>
            {/* title */}
            <div className='px-2 mb-10 sm:px-0'>
                <div className='flex items-center gap-5'>
                    <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                    <h1 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Products</h1>
                </div>
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
                                    className={`cursor-pointer flex-1 py-2 sm:py-2.5 rounded-lg lg:rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium 
                                            ${addedItems.includes(product._id) ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 hover:shadow-lg"}`}
                                >
                                    {addedItems.includes(product._id) ? "Added" : "Add to Cart"}
                                </button>

                                <button
                                    onClick={() => handleWishlistAction(product._id)}
                                    className={`cursor-pointer p-2 sm:p-2.5 rounded-full border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 ${wishItems.includes(product._id)
                                        ? "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-400 text-rose-500 focus:ring-rose-300"
                                        : "border-gray-300 text-gray-500 hover:text-rose-500 hover:border-rose-400 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 focus:ring-rose-300"
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
        </section>
    </>
}
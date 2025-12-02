import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from 'react-hot-toast';

export default function ProductDetails() {
    let { id } = useParams();
    const navigate = useNavigate();

    // Static sportswear products data with detailed information
    const staticProducts = {
        "1": {
            _id: "1",
            title: "Running Shoes Pro",
            description: "Premium running shoes designed for maximum comfort and performance. Featuring advanced cushioning technology and breathable mesh upper for optimal airflow during your runs.",
            imageCover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
                "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop"
            ],
            category: { name: "Running Shoes", _id: "running" },
            price: 129.99,
            ratingsAverage: 4.8
        },
        "2": {
            _id: "2",
            title: "Basketball Jersey Elite",
            description: "High-performance basketball jersey made with moisture-wicking fabric to keep you dry and comfortable during intense games. Features team-inspired design and breathable mesh panels.",
            imageCover: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
                "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop"
            ],
            category: { name: "Basketball", _id: "basketball" },
            price: 79.99,
            ratingsAverage: 4.6
        },
        "3": {
            _id: "3",
            title: "Yoga Leggings Premium",
            description: "Buttery-soft yoga leggings with four-way stretch for maximum flexibility. High-waisted design provides support during yoga sessions and daily activities.",
            imageCover: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=800&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=800&h=800&fit=crop",
                "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=800&h=800&fit=crop"
            ],
            category: { name: "Yoga Wear", _id: "yoga" },
            price: 59.99,
            ratingsAverage: 4.9
        },
        "4": {
            _id: "4",
            title: "Training Shorts",
            description: "Lightweight training shorts with built-in compression liner. Perfect for gym workouts, running, and various athletic activities with maximum mobility.",
            imageCover: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop"
            ],
            category: { name: "Training", _id: "training" },
            price: 45.99,
            ratingsAverage: 4.5
        },
        "5": {
            _id: "5",
            title: "Football Cleats Pro",
            description: "Professional-grade football cleats with advanced traction technology. Designed for optimal performance on grass and turf with superior ankle support.",
            imageCover: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop"
            ],
            category: { name: "Football", _id: "football" },
            price: 149.99,
            ratingsAverage: 4.7
        },
        "6": {
            _id: "6",
            title: "Tennis Skirt Performance",
            description: "Elegant tennis skirt with built-in shorts for comfort and freedom of movement. Moisture-wicking fabric keeps you cool during intense matches.",
            imageCover: "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=800&h=800&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=800&h=800&fit=crop"
            ],
            category: { name: "Tennis", _id: "tennis" },
            price: 65.99,
            ratingsAverage: 4.8
        }
    };

    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState('');
    const sliderRef = useRef(null);
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
            setWishItems(wishItems.filter(itemId => itemId !== productId));
            toast.success("Product removed from wishlist!");
        } else {
            setWishItems([...wishItems, productId]);
            toast.success("Product added to wishlist!");
        }
    }

    useEffect(() => {
        // Set product based on ID from static data
        if (staticProducts[id]) {
            setProduct(staticProducts[id]);
            setMainImage(staticProducts[id].imageCover);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    useEffect(() => {
        document.title = product.title ? `${product.title} - Sportswear Store` : 'Product Details';
    }, [product]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        arrows: false
    };

    return <>
        {!product._id ? (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Product not found</p>
            </div>
        ) : (
            <section className='py-5 md:py-20 px-4 sm:px-8 md:px-30 md:ms-10'>
                <div className='flex flex-col lg:flex-row gap-6 md:gap-10'>
                    {/* Thumbnail Images - Vertical on large screens, horizontal on small */}
                    <div className='flex flex-row justify-center lg:flex-col gap-2 md:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0'>
                        {product.images?.slice(0, 4).map((image, index) => (
                            <div
                                key={index}
                                onClick={() => sliderRef.current.slickGoTo(index)}
                                className='rounded-sm flex-shrink-0 flex items-center justify-center'
                            >
                                <img
                                    className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[170px] lg:h-[138px] object-cover cursor-pointer border border-gray-200 hover:border-blue-400 transition-colors duration-300'
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Image Slider */}
                    <div className='w-full lg:w-[500px] h-auto lg:h-[600px] order-1 lg:order-2'>
                        <Slider {...sliderSettings} ref={sliderRef}>
                            {product.images?.map((image, index) => (
                                <div key={index} className='rounded-sm flex items-center justify-center'>
                                    <img
                                        className='object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px] rounded-lg'
                                        src={image}
                                        alt={`Slide ${index}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Product Info */}
                    <div className='ms-0 lg:ms-7 order-3 w-full lg:w-auto'>
                        <h1 className='text-xl md:text-2xl text-gray-900 font-bold'>{product.title}</h1>
                        <p className='text-gray-600 mt-1'>{product.category?.name}</p>
                        <div className='flex items-center mt-3 md:mt-4'>
                            <i className="fa-solid fa-star text-amber-500"></i>
                            <p className='text-gray-600 text-sm ms-2'>({product.ratingsAverage})</p>
                            <span className='text-gray-400 text-sm ms-2'>|</span>
                            <span className='text-green-500 text-sm ms-2 font-medium'>In Stock</span>
                        </div>
                        <h1 className='text-blue-600 text-xl md:text-2xl mt-3 md:mt-4 font-bold'>${product.price}</h1>
                        <p className='text-sm text-gray-700 w-full lg:w-[373px] mt-3 md:mt-5 leading-relaxed'>{product.description}</p>
                        <div className='bg-gradient-to-r from-blue-400 to-teal-400 w-full lg:w-[400px] h-[1px] mt-3 md:mt-5'></div>

                        {/* Action Buttons */}
                        <div className='mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6'>
                            <button
                                onClick={() => handleAddToCart(product._id)}
                                disabled={addedItems.includes(product._id)}
                                className={`cursor-pointer flex-1 py-3 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium 
                                        ${addedItems.includes(product._id) ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 hover:shadow-lg"}`}
                            >
                                {addedItems.includes(product._id) ? "Added to Cart" : "Add to Cart"}
                            </button>

                            <button
                                onClick={() => handleWishlistAction(product._id)}
                                className={`cursor-pointer p-3 sm:p-3 rounded-full border transition-all duration-300 hover:scale-110
                                    ${wishItems.includes(product._id)
                                        ? "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-400 text-rose-500"
                                        : "border-gray-300 text-gray-500 hover:text-rose-500 hover:border-rose-400 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50"
                                    }`}
                            >
                                <i className="fa-solid fa-heart text-lg"></i>
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className='mt-6 md:mt-10 border border-gray-300 rounded-lg w-full lg:w-[400px] shadow-sm'>
                            <div className='flex items-center p-3 md:p-4 border-b border-gray-300'>
                                <i className="fa-solid fa-truck-fast text-lg md:text-xl text-blue-500 me-2 md:me-3"></i>
                                <div>
                                    <h2 className='text-sm font-semibold text-gray-900'>Free Delivery</h2>
                                    <p className='text-xs text-gray-600 underline cursor-pointer hover:text-blue-500 transition-colors duration-300'>
                                        Free delivery on orders over $100
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center p-3 md:p-4'>
                                <i className="fa-solid fa-rotate-left text-lg md:text-xl text-blue-500 me-2 md:me-3"></i>
                                <div>
                                    <h2 className='text-sm font-semibold text-gray-900'>Return Delivery</h2>
                                    <p className='text-xs text-gray-600'>
                                        Free 30 Days Delivery Returns. <span className='underline cursor-pointer hover:text-blue-500 transition-colors duration-300'>Details</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}
    </>
}
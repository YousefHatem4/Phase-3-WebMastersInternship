import React from 'react'

export default function Category() {
    // Static sportswear categories data
    const staticCategories = [
        {
            _id: "1",
            name: "Running Shoes",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
        },
        {
            _id: "2",
            name: "Basketball Gear",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop"
        },
        {
            _id: "3",
            name: "Yoga Wear",
            image: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=300&h=300&fit=crop"
        },
        {
            _id: "4",
            name: "Training Equipment",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop"
        },
        {
            _id: "5",
            name: "Football Gear",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop"
        },
        {
            _id: "6",
            name: "Tennis Wear",
            image: "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=300&h=300&fit=crop"
        },
        {
            _id: "7",
            name: "Swimwear",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop"
        },
        {
            _id: "8",
            name: "Outdoor Sports",
            image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=300&h=300&fit=crop"
        },
        {
            _id: "9",
            name: "Gym Accessories",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
        }
    ];

    React.useEffect(() => {
        document.title = 'Categories - Sportswear Store';
    }, []);

    return <>
        {/* category section */}
        <section className='px-5 lg:px-30 py-16 bg-gradient-to-b from-blue-50/30 via-white to-teal-50/30'>
            {/* title */}
            <div className='px-2 sm:px-0 mb-12'>
                <div className='flex items-center gap-5 mb-4'>
                    <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                    <h1 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Sportswear Categories</h1>
                </div>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-800'>Browse Our Collections</h1>
                <p className='text-gray-600 text-base lg:text-lg'>Discover premium sportswear for every activity and lifestyle</p>
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
                            <div className='relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 p-4 group-hover:bg-white transition-colors duration-300'>
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
        </section>
    </>
}
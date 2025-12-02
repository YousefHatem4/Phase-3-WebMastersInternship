import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'

export default function Brands() {
    // Static sportswear brands data
    const staticBrands = [
        {
            _id: "1",
            name: "Nike",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
        },
        {
            _id: "2",
            name: "Adidas",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop"
        },
        {
            _id: "3",
            name: "Under Armour",
            image: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=300&h=300&fit=crop"
        },
        {
            _id: "4",
            name: "Puma",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop"
        },
        {
            _id: "5",
            name: "Reebok",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop"
        },
        {
            _id: "6",
            name: "New Balance",
            image: "https://images.unsplash.com/photo-1585156930249-f8c59c3e046f?w=300&h=300&fit=crop"
        },
        {
            _id: "7",
            name: "ASICS",
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop"
        },
        {
            _id: "8",
            name: "Lululemon",
            image: "https://images.unsplash.com/photo-1586351012965-8616a6d382aa?w=300&h=300&fit=crop"
        },
        {
            _id: "9",
            name: "The North Face",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop"
        },
        {
            _id: "10",
            name: "Columbia",
            image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=300&h=300&fit=crop"
        },
        {
            _id: "11",
            name: "Patagonia",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
        },
        {
            _id: "12",
            name: "Fila",
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=300&fit=crop"
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState(staticBrands);

    useEffect(() => {
        document.title = 'Brands - Sportswear Store';
    }, []);

    useEffect(() => {
        const filtered = staticBrands.filter(brand =>
            brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBrands(filtered);
    }, [searchTerm]);

    return (
        <>
            {/* Hero Section */}
            <section className='relative py-20 px-5 lg:px-30 bg-gradient-to-br from-blue-50/30 via-white to-teal-50/30 overflow-hidden'>
                {/* Background decorative elements */}
                <div className='absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse'></div>
                <div className='absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-300/10 to-teal-300/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl'></div>

                {/* Content */}
                <div className='relative text-center max-w-4xl mx-auto'>
                    <div className='inline-flex items-center gap-3 mb-6'>
                        <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                        <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Partners</h2>
                    </div>

                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                        Premium <span className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>Sportswear Brands</span>
                    </h1>

                    <p className='text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                        Discover premium sportswear from world-renowned brands that define quality, innovation, and athletic excellence
                    </p>

                    {/* Search Bar */}
                    <div className='relative max-w-md mx-auto mb-12'>
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input
                            type="text"
                            placeholder="Search sportswear brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700 bg-white/80 backdrop-blur-sm'
                        />
                    </div>

                    {/* Stats */}
                    <div className='flex justify-center items-center gap-8 text-center'>
                        <div>
                            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>{staticBrands.length}+</div>
                            <div className='text-sm text-gray-600'>Premium Brands</div>
                        </div>
                        <div className='w-px h-12 bg-gray-300'></div>
                        <div>
                            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>100%</div>
                            <div className='text-sm text-gray-600'>Authentic</div>
                        </div>
                        <div className='w-px h-12 bg-gray-300'></div>
                        <div>
                            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>24/7</div>
                            <div className='text-sm text-gray-600'>Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Grid Section */}
            <section className='py-16 px-5 lg:px-30 bg-white'>
                {/* Results Info */}
                <div className='flex justify-between items-center mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                        {searchTerm ? `Found ${filteredBrands.length} results for "${searchTerm}"` : 'All Sportswear Brands'}
                    </h3>
                    <div className='text-sm text-gray-500'>
                        Showing {filteredBrands.length} of {staticBrands.length} brands
                    </div>
                </div>

                {/* Brands Grid */}
                {filteredBrands.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8'>
                        {filteredBrands.map((brand, index) => (
                            <div
                                key={brand._id}
                                className='group relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 cursor-pointer overflow-hidden'
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Hover gradient overlay */}
                                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                                {/* Brand Image Container */}
                                <div className='relative aspect-square flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 group-hover:bg-white transition-colors duration-300'>
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className='w-full h-full object-contain p-2 filter group-hover:brightness-110 group-hover:contrast-110 transition-all duration-500 group-hover:scale-110'
                                        loading="lazy"
                                    />

                                    {/* Shimmer effect on hover */}
                                    <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                                </div>

                                {/* Brand Name */}
                                <div className='relative text-center'>
                                    <h4 className='font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300 text-sm lg:text-base truncate'>
                                        {brand.name}
                                    </h4>

                                    {/* Hover reveal text */}
                                    <p className='text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                                        Explore products
                                    </p>
                                </div>

                                {/* Bottom accent line */}
                                <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center'></div>

                                {/* Corner decoration */}
                                <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100'></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // No results state
                    <div className='text-center py-20'>
                        <div className='w-32 h-32 mx-auto mb-6 opacity-20'>
                            <i className="fas fa-search text-8xl text-gray-400"></i>
                        </div>
                        <h3 className='text-2xl font-semibold text-gray-800 mb-2'>No brands found</h3>
                        <p className='text-gray-600 mb-6'>Try adjusting your search terms or browse all sportswear brands</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className='px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:from-blue-600 hover:to-teal-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20'
                        >
                            View All Brands
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}
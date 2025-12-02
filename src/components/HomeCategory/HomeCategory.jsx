import React from 'react';

export default function HomeCategory() {
    // Static sportswear categories data
    const staticCategories = [
        { _id: "1", name: "Running Shoes" },
        { _id: "2", name: "Basketball Gear" },
        { _id: "3", name: "Yoga Wear" },
        { _id: "4", name: "Training Equipment" },
        { _id: "5", name: "Football Gear" },
        { _id: "6", name: "Tennis Wear" },
        { _id: "7", name: "Swimwear" },
        { _id: "8", name: "Outdoor Sports" }
    ];

    return (
        <div>
            <h3 className='font-semibold text-lg mb-4 text-gray-800'>Sportswear Categories</h3>
            <ul className='space-y-2'>
                {staticCategories.map((categories) => (
                    <li key={categories._id} className='my-2 text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer'>
                        {categories.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
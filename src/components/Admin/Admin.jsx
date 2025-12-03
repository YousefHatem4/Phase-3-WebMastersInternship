import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaBox, FaChartLine, FaSignOutAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);

    // Static demo data
    const demoProducts = [
        {
            id: '1',
            title: 'Running Shoes Pro',
            description: 'Premium running shoes with advanced cushioning technology for maximum comfort.',
            price: 129.99,
            category: 'Shoes',
            stock: 50,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            createdAt: '2024-01-15',
            sales: 120
        },
        {
            id: '2',
            title: 'Basketball Jersey Elite',
            description: 'High-performance basketball jersey with moisture-wicking fabric.',
            price: 79.99,
            category: 'Clothing',
            stock: 75,
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
            createdAt: '2024-01-20',
            sales: 85
        },
        {
            id: '3',
            title: 'Yoga Leggings Premium',
            description: 'Buttery-soft yoga leggings with four-way stretch for maximum flexibility.',
            price: 59.99,
            category: 'Clothing',
            stock: 60,
            image: 'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=300&h=300&fit=crop',
            createdAt: '2024-01-25',
            sales: 95
        },
        {
            id: '4',
            title: 'Training Shorts',
            description: 'Lightweight training shorts with built-in compression liner.',
            price: 45.99,
            category: 'Clothing',
            stock: 40,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop',
            createdAt: '2024-01-28',
            sales: 70
        },
        {
            id: '5',
            title: 'Football Cleats Pro',
            description: 'Professional-grade football cleats with advanced traction technology.',
            price: 149.99,
            category: 'Shoes',
            stock: 30,
            image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop',
            createdAt: '2024-01-30',
            sales: 45
        },
        {
            id: '6',
            title: 'Cycling Jersey Aero',
            description: 'Aerodynamic cycling jersey with breathable mesh panels.',
            price: 95.99,
            category: 'Clothing',
            stock: 55,
            image: 'https://images.unsplash.com/photo-1586351012965-8616a6d382aa?w=300&h=300&fit=crop',
            createdAt: '2024-02-01',
            sales: 38
        }
    ];

    // Calculate dashboard stats
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
    const totalRevenue = products.reduce((sum, product) => sum + (product.sales * product.price), 0);

    useEffect(() => {
        // Load demo data
        setProducts(demoProducts);
        document.title = 'Admin Panel - Sportswear Store';
    }, []);

    const handleLogout = () => {
        toast.success('Logged out successfully');
        // In a real app, this would redirect to login page
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (editingProduct) {
                // Update existing product
                setProducts(products.map(p =>
                    p.id === editingProduct.id
                        ? { ...productForm, id: editingProduct.id, createdAt: editingProduct.createdAt, sales: editingProduct.sales }
                        : p
                ));
                toast.success('Product updated successfully');
            } else {
                // Add new product
                const newProduct = {
                    ...productForm,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString().split('T')[0],
                    sales: 0
                };
                setProducts([...products, newProduct]);
                toast.success('Product added successfully');
            }

            setProductForm({
                title: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                image: ''
            });
            setEditingProduct(null);
            setShowProductModal(false);
            setIsLoading(false);
        }, 1000);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image: product.image
        });
        setShowProductModal(true);
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== productId));
            toast.success('Product deleted successfully');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const stats = [
        {
            title: 'Total Products',
            value: totalProducts,
            icon: <FaBox className="text-2xl" />,
            color: 'bg-gradient-to-r from-blue-500 to-blue-600',
            description: 'Active products in store'
        },
        {
            title: 'Total Stock',
            value: totalStock,
            icon: <FaBox className="text-2xl" />,
            color: 'bg-gradient-to-r from-green-500 to-green-600',
            description: 'Units available'
        },
        {
            title: 'Total Sales',
            value: totalSales,
            icon: <FaChartLine className="text-2xl" />,
            color: 'bg-gradient-to-r from-purple-500 to-purple-600',
            description: 'Units sold'
        },
        {
            title: 'Total Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: <FaChartLine className="text-2xl" />,
            color: 'bg-gradient-to-r from-orange-500 to-orange-600',
            description: 'Revenue generated'
        }
    ];

    const categories = ['Shoes', 'Clothing', 'Accessories', 'Equipment'];

    const renderDashboard = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome back, Admin!</h2>
                        <p className="text-gray-600 mt-1">Here's what's happening with your store today.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Last updated</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="opacity-80">
                                {stat.icon}
                            </div>
                            <div className="text-right">
                                <p className="text-sm opacity-90">{stat.title}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                        </div>
                        <p className="text-sm opacity-80">{stat.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Top Selling Products */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Top Selling Products</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Product</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Sales</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products
                                .sort((a, b) => b.sales - a.sales)
                                .slice(0, 5)
                                .map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                                <span className="font-medium text-gray-800">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                                        <td className="py-3 px-4 text-sm text-gray-600">${product.price}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 20 ? 'bg-green-100 text-green-800' :
                                                    product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-gray-800">{product.sales}</td>
                                        <td className="py-3 px-4 text-sm font-medium text-green-600">
                                            ${(product.sales * product.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-800 mb-3">Quick Actions</h4>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setProductForm({
                                    title: '',
                                    description: '',
                                    price: '',
                                    category: '',
                                    stock: '',
                                    image: ''
                                });
                                setShowProductModal(true);
                                setActiveTab('products');
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                        >
                            <FaPlus /> Add New Product
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className="w-full px-4 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            View All Products
                        </button>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="font-bold text-gray-800 mb-3">Low Stock Alert</h4>
                    <div className="space-y-3">
                        {products
                            .filter(p => p.stock <= 10)
                            .slice(0, 3)
                            .map(product => (
                                <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <div>
                                        <p className="font-medium text-gray-800">{product.title}</p>
                                        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                                    </div>
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition-colors"
                                    >
                                        Restock
                                    </button>
                                </div>
                            ))}
                        {products.filter(p => p.stock <= 10).length === 0 && (
                            <p className="text-gray-500 text-center py-2">All products have sufficient stock</p>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                    <h4 className="font-bold text-gray-800 mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaPlus className="text-blue-500" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">New product added</p>
                                <p className="text-sm text-gray-600">Running Shoes Pro</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <FaEdit className="text-green-500" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Product updated</p>
                                <p className="text-sm text-gray-600">Basketball Jersey</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderProducts = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Header with Stats and Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Product Management</h3>
                    <p className="text-gray-600">Manage all your products in one place</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setProductForm({
                            title: '',
                            description: '',
                            price: '',
                            category: '',
                            stock: '',
                            image: ''
                        });
                        setShowProductModal(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <FaPlus /> Add New Product
                </button>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                    <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
                        <FaBox className="text-6xl" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products yet</h3>
                    <p className="text-gray-600 mb-6">Start by adding your first product</p>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setProductForm({
                                title: '',
                                description: '',
                                price: '',
                                category: '',
                                stock: '',
                                image: ''
                            });
                            setShowProductModal(true);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                    >
                        Add Your First Product
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow hover:scale-110"
                                        title="Edit Product"
                                    >
                                        <FaEdit className="text-blue-500 text-sm" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow hover:scale-110"
                                        title="Delete Product"
                                    >
                                        <FaTrash className="text-red-500 text-sm" />
                                    </button>
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 20 ? 'bg-green-100 text-green-800' :
                                            product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {product.stock} in stock
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-lg text-gray-800 truncate">{product.title}</h4>
                                    <span className="text-blue-600 font-bold text-lg">${product.price}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <div>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500">Sales</p>
                                        <p className="font-bold text-gray-800">{product.sales} units</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500">Added: {product.createdAt}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <FaBox className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Sportswear Admin</h1>
                                <p className="text-sm opacity-90">Product Management Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64">
                        <div className="bg-white rounded-2xl shadow-lg p-4">
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'dashboard'
                                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <FaChartLine />
                                    <span className="font-medium">Dashboard</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'products'
                                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <FaBox />
                                    <span className="font-medium">Products</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'products' && renderProducts()}
                    </main>
                </div>
            </div>

            {/* Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <button
                                    onClick={() => setShowProductModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleProductSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={productForm.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter product name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={productForm.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price ($) *
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={productForm.price}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Stock Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={productForm.stock}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image URL *
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={productForm.image}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {productForm.image && (
                                            <div className="mt-2">
                                                <img
                                                    src={productForm.image}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-cover rounded-lg border"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={productForm.description}
                                            onChange={handleInputChange}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter product description"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowProductModal(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`px-6 py-3 rounded-lg transition-all duration-300 ${isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
                                            } text-white`}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                {editingProduct ? 'Updating...' : 'Adding...'}
                                            </span>
                                        ) : editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
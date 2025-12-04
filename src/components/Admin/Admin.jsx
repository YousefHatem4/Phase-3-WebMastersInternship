import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine, FaCog, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
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
            description: 'Premium running shoes with advanced cushioning',
            price: 129.99,
            category: 'Shoes',
            stock: 50,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            createdAt: '2024-01-15',
            sales: 120
        },
        {
            id: '2',
            title: 'Basketball Jersey',
            description: 'High-performance basketball jersey',
            price: 79.99,
            category: 'Clothing',
            stock: 75,
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
            createdAt: '2024-01-20',
            sales: 85
        },
        {
            id: '3',
            title: 'Yoga Leggings',
            description: 'Buttery-soft yoga leggings with four-way stretch',
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
            description: 'Lightweight training shorts with compression liner',
            price: 45.99,
            category: 'Clothing',
            stock: 40,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop',
            createdAt: '2024-01-28',
            sales: 70
        }
    ];

    const demoOrders = [
        { id: 'ORD001', customer: 'John Doe', date: '2024-01-30', amount: 249.98, status: 'Delivered' },
        { id: 'ORD002', customer: 'Jane Smith', date: '2024-01-29', amount: 159.99, status: 'Processing' },
        { id: 'ORD003', customer: 'Bob Johnson', date: '2024-01-28', amount: 89.99, status: 'Pending' },
        { id: 'ORD004', customer: 'Alice Brown', date: '2024-01-27', amount: 329.97, status: 'Delivered' },
    ];

    const demoUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', joined: '2024-01-15', orders: 5 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', joined: '2024-01-20', orders: 3 },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', joined: '2024-01-25', orders: 8 },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', joined: '2024-01-28', orders: 2 },
    ];

    useEffect(() => {
        // Load demo data
        setProducts(demoProducts);
        setOrders(demoOrders);
        setUsers(demoUsers);
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
        { title: 'Total Products', value: products.length, icon: <FaBox />, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
        { title: 'Total Orders', value: orders.length, icon: <FaShoppingCart />, color: 'bg-gradient-to-r from-green-500 to-green-600' },
        { title: 'Total Users', value: users.length, icon: <FaUsers />, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
        { title: 'Revenue', value: `$${orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}`, icon: <FaChartLine />, color: 'bg-gradient-to-r from-orange-500 to-orange-600' }
    ];

    const categories = ['Shoes', 'Clothing', 'Accessories', 'Equipment'];

    const renderDashboard = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
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
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className="text-3xl opacity-80">
                                {stat.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">{order.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{order.customer}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">${order.amount}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            {/* Header with Add Button */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Product Management</h3>
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
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                >
                    <FaPlus /> Add Product
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <FaEdit className="text-blue-500" />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <FaTrash className="text-red-500" />
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-lg text-gray-800 truncate">{product.title}</h4>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <p className="text-blue-600 font-bold">${product.price}</p>
                                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                    <p className="text-xs text-gray-400">Sales: {product.sales}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    const renderOrders = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h3 className="text-xl font-bold text-gray-800">Order Management</h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-teal-50">
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Order ID</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Customer</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Amount</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{order.id}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{order.customer}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{order.date}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">${order.amount}</td>
                                    <td className="py-4 px-6">
                                        <select
                                            defaultValue={order.status}
                                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                <FaEye />
                                            </button>
                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                                                <FaEdit />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );

    const renderUsers = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h3 className="text-xl font-bold text-gray-800">User Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{user.name}</h4>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Joined</p>
                                <p className="font-medium">{user.joined}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Orders</p>
                                <p className="font-medium">{user.orders}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                View
                            </button>
                            <button className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                Block
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderSettings = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h3 className="text-xl font-bold text-gray-800">Settings</h3>
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Store Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Store Name"
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue="Sportswear Store"
                            />
                            <input
                                type="email"
                                placeholder="Contact Email"
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue="admin@sportswear.com"
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Payment Settings</h4>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3">
                                <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                                <span>Enable Credit Card Payments</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                                <span>Enable PayPal</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                                <span>Enable Cash on Delivery</span>
                            </label>
                        </div>
                    </div>

                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300">
                        Save Settings
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64">
                        <div className="bg-white rounded-2xl shadow-lg p-4">
                            <nav className="space-y-2">
                                {[
                                    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
                                    { id: 'products', label: 'Products', icon: <FaBox /> },
                                    { id: 'orders', label: 'Orders', icon: <FaShoppingCart /> },
                                    { id: 'users', label: 'Users', icon: <FaUsers /> },
                                    { id: 'settings', label: 'Settings', icon: <FaCog /> },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                            ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'products' && renderProducts()}
                        {activeTab === 'orders' && renderOrders()}
                        {activeTab === 'users' && renderUsers()}
                        {activeTab === 'settings' && renderSettings()}
                    </main>
                </div>
            </div>

            {/* Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <button
                                    onClick={() => setShowProductModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter product description"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowProductModal(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`px-6 py-2 rounded-lg transition-all duration-300 ${isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
                                            } text-white`}
                                    >
                                        {isLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
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
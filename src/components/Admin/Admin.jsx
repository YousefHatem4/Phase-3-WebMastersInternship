// Admin.jsx - COMPLETE CODE WITH MULTIPLE IMAGES SUPPORT
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    FaBox, FaUsers, FaShoppingCart, FaChartLine, FaCog,
    FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye,
    FaSpinner, FaCheck, FaTimes, FaTags, FaTag,
    FaImage, FaTimesCircle, FaShoppingBag
} from 'react-icons/fa';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
    });

    // Form states for products
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        stock: '',
        image_url: '', // Main image URL
        additionalImages: [] // Array for additional images
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);

    // Form states for categories
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        description: '',
        image_url: '',
        is_active: true
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const navigate = useNavigate();

    // Check admin authentication
    useEffect(() => {
        checkAdminAccess();
        loadInitialData();
    }, []);

    const checkAdminAccess = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                toast.error('Please login to access admin panel');
                navigate('/login');
                return;
            }

            const { data: adminRole, error } = await supabase
                .from('admin_roles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();

            if (error) {
                console.error('Admin check error:', error);
            }

            if (!adminRole) {
                toast.error('Unauthorized access. Admin privileges required.');
                navigate('/');
                return;
            }

        } catch (error) {
            console.error('Admin access check error:', error);
        }
    };

    const loadInitialData = async () => {
        try {
            setIsInitializing(true);

            // Load all data in parallel
            const [productsData, categoriesData, ordersData, usersData] = await Promise.all([
                fetchProductsWithImages(),
                fetchCategories(),
                fetchOrders(),
                fetchUsers()
            ]);

            setProducts(productsData);
            setCategories(categoriesData);
            setOrders(ordersData);
            setUsers(usersData);

            calculateStats(productsData, categoriesData, ordersData, usersData);

        } catch (error) {
            console.error('Error loading initial data:', error);
            toast.error('Failed to load data');
        } finally {
            setIsInitializing(false);
        }
    };

    const fetchProductsWithImages = async () => {
        try {
            // First get products
            const { data: products, error: productsError } = await supabase
                .from('products')
                .select(`
                    *,
                    categories (
                        id,
                        name
                    )
                `)
                .order('created_at', { ascending: false });

            if (productsError) throw productsError;

            // Then get images for each product
            const productsWithImages = await Promise.all(
                products.map(async (product) => {
                    const { data: images, error: imagesError } = await supabase
                        .from('product_images')
                        .select('*')
                        .eq('product_id', product.id)
                        .order('display_order', { ascending: true });

                    if (imagesError) throw imagesError;

                    return {
                        ...product,
                        images: images || []
                    };
                })
            );

            return productsWithImages || [];
        } catch (error) {
            console.error('Error fetching products with images:', error);
            toast.error('Failed to load products');
            return [];
        }
    };

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
            return [];
        }
    };

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    order_items (
                        id,
                        product_title,
                        quantity,
                        price
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
            return [];
        }
    };

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
            return [];
        }
    };

    const calculateStats = (productsData, categoriesData, ordersData, usersData) => {
        const totalRevenue = ordersData.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);

        setStats({
            totalProducts: productsData.length,
            totalCategories: categoriesData.length,
            totalOrders: ordersData.length,
            totalUsers: usersData.length,
            totalRevenue: totalRevenue,
        });
    };

    // PRODUCT FUNCTIONS WITH MULTIPLE IMAGES SUPPORT
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();

            const productData = {
                title: productForm.title,
                description: productForm.description,
                price: parseFloat(productForm.price),
                category_id: productForm.category_id || null,
                stock: parseInt(productForm.stock),
                image_url: productForm.image_url,
                updated_at: new Date().toISOString(),
            };

            let savedProduct;

            if (editingProduct) {
                const { data, error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editingProduct.id)
                    .select(`
                        *,
                        categories (
                            id,
                            name
                        )
                    `)
                    .single();

                if (error) throw error;
                savedProduct = data;

                // Handle additional images for existing product
                await handleProductImages(editingProduct.id);
            } else {
                productData.created_by = session.user.id;

                const { data, error } = await supabase
                    .from('products')
                    .insert([productData])
                    .select(`
                        *,
                        categories (
                            id,
                            name
                        )
                    `)
                    .single();

                if (error) throw error;
                savedProduct = data;

                // Handle additional images for new product
                await handleProductImages(savedProduct.id);
            }

            // Refresh product with images
            const updatedProduct = await fetchProductWithImages(savedProduct.id);
            
            if (editingProduct) {
                setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
            } else {
                setProducts([updatedProduct, ...products]);
            }

            toast.success('Product saved successfully');
            resetProductForm();
            setShowProductModal(false);

        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(error.message || 'Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductImages = async (productId) => {
        try {
            // First, delete existing additional images (keep main image if it exists)
            const { error: deleteError } = await supabase
                .from('product_images')
                .delete()
                .eq('product_id', productId)
                .neq('image_url', productForm.image_url); // Don't delete main image if it's in product_images

            if (deleteError) throw deleteError;

            // Then, add new additional images
            if (productForm.additionalImages.length > 0) {
                const imagesToInsert = productForm.additionalImages.map((imageUrl, index) => ({
                    product_id: productId,
                    image_url: imageUrl,
                    display_order: index + 1, // Start from 1 (0 is for main image)
                    alt_text: productForm.title
                }));

                const { error: insertError } = await supabase
                    .from('product_images')
                    .insert(imagesToInsert);

                if (insertError) throw insertError;
            }

            // Also ensure main image is in product_images table
            if (productForm.image_url) {
                const { error: upsertError } = await supabase
                    .from('product_images')
                    .upsert({
                        product_id: productId,
                        image_url: productForm.image_url,
                        display_order: 0,
                        alt_text: productForm.title
                    }, {
                        onConflict: 'product_id,image_url'
                    });

                if (upsertError) throw upsertError;
            }
        } catch (error) {
            console.error('Error handling product images:', error);
            throw error;
        }
    };

    const fetchProductWithImages = async (productId) => {
        try {
            // Get product
            const { data: product, error: productError } = await supabase
                .from('products')
                .select(`
                    *,
                    categories (
                        id,
                        name
                    )
                `)
                .eq('id', productId)
                .single();

            if (productError) throw productError;

            // Get images
            const { data: images, error: imagesError } = await supabase
                .from('product_images')
                .select('*')
                .eq('product_id', productId)
                .order('display_order', { ascending: true });

            if (imagesError) throw imagesError;

            return {
                ...product,
                images: images || []
            };
        } catch (error) {
            console.error('Error fetching product with images:', error);
            throw error;
        }
    };

    const handleEditProduct = async (product) => {
        try {
            setEditingProduct(product);
            
            // Get product images
            const { data: images, error } = await supabase
                .from('product_images')
                .select('*')
                .eq('product_id', product.id)
                .order('display_order', { ascending: true });

            if (error) throw error;

            // Separate main image (display_order = 0) from additional images
            const mainImage = images?.find(img => img.display_order === 0);
            const additionalImages = images?.filter(img => img.display_order > 0).map(img => img.image_url) || [];

            setProductForm({
                title: product.title,
                description: product.description,
                price: product.price,
                category_id: product.category_id || '',
                stock: product.stock,
                image_url: mainImage?.image_url || product.image_url,
                additionalImages: additionalImages
            });
            
            setShowProductModal(true);
        } catch (error) {
            console.error('Error loading product for edit:', error);
            toast.error('Failed to load product data');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product? All associated images will also be deleted.')) return;

        try {
            // Delete associated images first
            const { error: imagesError } = await supabase
                .from('product_images')
                .delete()
                .eq('product_id', productId);

            if (imagesError) throw imagesError;

            // Delete product
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            setProducts(products.filter(p => p.id !== productId));
            calculateStats(products.filter(p => p.id !== productId), categories, orders, users);
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    // CATEGORY FUNCTIONS
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();

            const categoryData = {
                name: categoryForm.name,
                description: categoryForm.description,
                image_url: categoryForm.image_url,
                is_active: categoryForm.is_active,
                updated_at: new Date().toISOString(),
            };

            if (editingCategory) {
                const { data, error } = await supabase
                    .from('categories')
                    .update(categoryData)
                    .eq('id', editingCategory.id)
                    .select()
                    .single();

                if (error) throw error;

                setCategories(categories.map(c => c.id === editingCategory.id ? data : c));
                toast.success('Category updated successfully');
            } else {
                categoryData.created_by = session.user.id;

                const { data, error } = await supabase
                    .from('categories')
                    .insert([categoryData])
                    .select()
                    .single();

                if (error) throw error;

                setCategories([data, ...categories]);
                toast.success('Category added successfully');
            }

            resetCategoryForm();
            setShowCategoryModal(false);

        } catch (error) {
            console.error('Error saving category:', error);
            toast.error(error.message || 'Failed to save category');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setCategoryForm({
            name: category.name,
            description: category.description || '',
            image_url: category.image_url || '',
            is_active: category.is_active
        });
        setShowCategoryModal(true);
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm('Are you sure you want to delete this category? Products using this category will have their category set to null.')) return;

        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', categoryId);

            if (error) throw error;

            setCategories(categories.filter(c => c.id !== categoryId));

            // Update products that were using this category
            setProducts(products.map(p =>
                p.category_id === categoryId ? { ...p, category_id: null, categories: null } : p
            ));

            calculateStats(products, categories.filter(c => c.id !== categoryId), orders, users);
            toast.success('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category');
        }
    };

    const resetProductForm = () => {
        setProductForm({
            title: '',
            description: '',
            price: '',
            category_id: '',
            stock: '',
            image_url: '',
            additionalImages: []
        });
        setEditingProduct(null);
    };

    const resetCategoryForm = () => {
        setCategoryForm({
            name: '',
            description: '',
            image_url: '',
            is_active: true
        });
        setEditingCategory(null);
    };

    // IMAGE HANDLING FUNCTIONS
    const addAdditionalImage = () => {
        const newImage = prompt('Enter image URL:');
        if (newImage && newImage.trim() !== '') {
            setProductForm({
                ...productForm,
                additionalImages: [...productForm.additionalImages, newImage.trim()]
            });
        }
    };

    const removeAdditionalImage = (index) => {
        const newImages = [...productForm.additionalImages];
        newImages.splice(index, 1);
        setProductForm({
            ...productForm,
            additionalImages: newImages
        });
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;

            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));

            toast.success('Order status updated');
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order status');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // RENDER FUNCTIONS
    const renderDashboard = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                    { title: 'Total Products', value: stats.totalProducts, icon: <FaBox />, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
                    { title: 'Categories', value: stats.totalCategories, icon: <FaTags />, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
                    { title: 'Total Orders', value: stats.totalOrders, icon: <FaShoppingCart />, color: 'bg-gradient-to-r from-green-500 to-green-600' },
                    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'bg-gradient-to-r from-pink-500 to-pink-600' },
                    { title: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: <FaChartLine />, color: 'bg-gradient-to-r from-orange-500 to-orange-600' }
                ].map((stat, index) => (
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
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Order Number</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">{order.order_number}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{order.customer_name}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{formatDate(order.created_at)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">${parseFloat(order.total_amount).toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Processing' || order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
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
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Product Management</h3>
                <button
                    onClick={() => {
                        resetProductForm();
                        setShowProductModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                >
                    <FaPlus /> Add Product
                </button>
            </div>

            {isInitializing ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            ) : (
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
                                    src={product.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'}
                                    alt={product.title}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop';
                                    }}
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
                                {product.images?.length > 0 && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                                            <FaImage /> {product.images.length}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-lg text-gray-800 truncate">{product.title}</h4>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <p className="text-blue-600 font-bold">${parseFloat(product.price).toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{product.categories?.name || 'Uncategorized'}</p>
                                        <p className="text-xs text-gray-400">Sales: {product.sales || 0}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Created: {formatDate(product.created_at)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );

    const renderCategories = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Category Management</h3>
                <button
                    onClick={() => {
                        resetCategoryForm();
                        setShowCategoryModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                    <FaTag /> Add Category
                </button>
            </div>

            {isInitializing ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={category.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'}
                                    alt={category.name}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                        onClick={() => handleEditCategory(category)}
                                        className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <FaEdit className="text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(category.id)}
                                        className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <FaTrash className="text-red-500" />
                                    </button>
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {category.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-lg text-gray-800 truncate">{category.name}</h4>
                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{category.description}</p>
                                <div className="mt-4">
                                    <p className="text-xs text-gray-400">
                                        Created: {formatDate(category.created_at)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
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
            {isInitializing ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-50 to-teal-50">
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Order Number</th>
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
                                        <td className="py-4 px-6 text-sm font-medium text-gray-800">{order.order_number}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            <div>{order.customer_name}</div>
                                            <div className="text-xs text-gray-500">{order.customer_email}</div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">{formatDate(order.created_at)}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">${parseFloat(order.total_amount).toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
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
                                                <button
                                                    onClick={() => navigate(`/order/${order.id}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                >
                                                    <FaEye />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
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
            {isInitializing ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{user.full_name || 'No Name'}</h4>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                    {user.phone && <p className="text-xs text-gray-500">{user.phone}</p>}
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Joined</p>
                                    <p className="font-medium">{formatDate(user.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-medium">{user.phone || 'Not set'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );

    const renderSettings = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h3 className="text-xl font-bold text-gray-800">Admin Settings</h3>
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Admin Actions</h4>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={loadInitialData}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <FaSpinner className={isInitializing ? 'animate-spin' : ''} /> Refresh Data
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">System Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500">Products</p>
                                <p className="font-bold text-lg">{stats.totalProducts}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500">Categories</p>
                                <p className="font-bold text-lg">{stats.totalCategories}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500">Users</p>
                                <p className="font-bold text-lg">{stats.totalUsers}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-500">Orders</p>
                                <p className="font-bold text-lg">{stats.totalOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderProductModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button
                            onClick={() => {
                                setShowProductModal(false);
                                resetProductForm();
                            }}
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
                                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category_id"
                                    value={productForm.category_id}
                                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
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
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
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
                                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Main Image URL *
                                </label>
                                <input
                                    type="url"
                                    name="image_url"
                                    value={productForm.image_url}
                                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/main-image.jpg"
                                />
                                {productForm.image_url && (
                                    <div className="mt-2">
                                        <img 
                                            src={productForm.image_url} 
                                            alt="Main image preview" 
                                            className="w-32 h-32 object-cover rounded-lg border"
                                            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Images
                                </label>
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        onClick={addAdditionalImage}
                                        className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
                                    >
                                        <FaPlus /> Add Image URL
                                    </button>
                                    
                                    {productForm.additionalImages.map((imageUrl, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <input
                                                    type="url"
                                                    value={imageUrl}
                                                    onChange={(e) => {
                                                        const newImages = [...productForm.additionalImages];
                                                        newImages[index] = e.target.value;
                                                        setProductForm({ ...productForm, additionalImages: newImages });
                                                    }}
                                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeAdditionalImage(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {productForm.additionalImages.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                                            {productForm.additionalImages.map((imageUrl, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Additional image ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg border"
                                                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAdditionalImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
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
                                onClick={() => {
                                    setShowProductModal(false);
                                    resetProductForm();
                                }}
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
                                    } text-white flex items-center gap-2`}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Saving...
                                    </>
                                ) : editingProduct ? (
                                    <>
                                        <FaCheck />
                                        Update Product
                                    </>
                                ) : (
                                    <>
                                        <FaPlus />
                                        Add Product
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );

    const renderCategoryModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h3>
                        <button
                            onClick={() => {
                                setShowCategoryModal(false);
                                resetCategoryForm();
                            }}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleCategorySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={categoryForm.name}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter category name"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={categoryForm.description}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter category description"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    name="image_url"
                                    value={categoryForm.image_url}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/category-image.jpg"
                                />
                                {categoryForm.image_url && (
                                    <div className="mt-2">
                                        <img 
                                            src={categoryForm.image_url} 
                                            alt="Category image preview" 
                                            className="w-32 h-32 object-cover rounded-lg border"
                                            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={categoryForm.is_active}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked })}
                                        className="rounded text-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Active Category</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCategoryModal(false);
                                    resetCategoryForm();
                                }}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-6 py-2 rounded-lg transition-all duration-300 ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                    } text-white flex items-center gap-2`}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Saving...
                                    </>
                                ) : editingCategory ? (
                                    <>
                                        <FaCheck />
                                        Update Category
                                    </>
                                ) : (
                                    <>
                                        <FaTag />
                                        Add Category
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );

    if (isInitializing && activeTab === 'dashboard') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64">
                        <div className="bg-white rounded-2xl shadow-lg p-4">
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl">
                                <h2 className="text-xl font-bold">Admin Panel</h2>
                                <p className="text-sm opacity-90 mt-1">Sportswear Store</p>
                            </div>
                            <nav className="space-y-2">
                                {[
                                    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
                                    { id: 'products', label: 'Products', icon: <FaBox /> },
                                    { id: 'categories', label: 'Categories', icon: <FaTags /> },
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
                        {activeTab === 'categories' && renderCategories()}
                        {activeTab === 'orders' && renderOrders()}
                        {activeTab === 'users' && renderUsers()}
                        {activeTab === 'settings' && renderSettings()}
                    </main>
                </div>
            </div>

            {/* Product Modal */}
            {showProductModal && renderProductModal()}

            {/* Category Modal */}
            {showCategoryModal && renderCategoryModal()}
        </div>
    );
}
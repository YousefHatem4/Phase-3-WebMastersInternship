import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import {
    FaArrowLeft,
    FaPrint,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCreditCard,
    FaTruck,
    FaCalendar,
    FaIdCard,
    FaShoppingBag,
    FaDollarSign,
    FaBox,
    FaCheckCircle,
    FaExclamationTriangle,
    FaTimesCircle,
    FaShippingFast,
    FaCheck,
    FaUser
} from 'react-icons/fa'

export default function OrderDetails() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [orderItems, setOrderItems] = useState([])
    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updatingStatus, setUpdatingStatus] = useState(false)

    useEffect(() => {
        document.title = 'Order Details - Admin Panel'
        fetchOrderDetails()
    }, [orderId])

    const fetchOrderDetails = async () => {
        try {
            setLoading(true)

            // Fetch order details
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single()

            if (orderError) throw orderError

            // Fetch customer information from profiles if user_id exists
            let customerData = null
            if (orderData.user_id) {
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', orderData.user_id)
                    .single()

                if (!profileError) {
                    customerData = profileData
                }
            }

            // Fetch order items
            const { data: itemsData, error: itemsError } = await supabase
                .from('order_items')
                .select(`
          *,
          products (
            id,
            title,
            image_url,
            category
          )
        `)
                .eq('order_id', orderId)

            if (itemsError) throw itemsError

            setOrder(orderData)
            setCustomer(customerData)
            setOrderItems(itemsData || [])

        } catch (error) {
            console.error('Error fetching order details:', error)
            toast.error('Failed to load order details')
            navigate('/admin')
        } finally {
            setLoading(false)
        }
    }

    const updateOrderStatus = async (newStatus) => {
        try {
            setUpdatingStatus(true)

            const { error } = await supabase
                .from('orders')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', orderId)

            if (error) throw error

            setOrder({ ...order, status: newStatus })
            toast.success(`Order status updated to ${newStatus}`)
        } catch (error) {
            console.error('Error updating order status:', error)
            toast.error('Failed to update order status')
        } finally {
            setUpdatingStatus(false)
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'Processing':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'Shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200'
            case 'Delivered':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'Cancelled':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <FaExclamationTriangle className="text-yellow-500" />
            case 'Processing':
                return <FaCheck className="text-blue-500" />
            case 'Shipped':
                return <FaShippingFast className="text-purple-500" />
            case 'Delivered':
                return <FaCheckCircle className="text-green-500" />
            case 'Cancelled':
                return <FaTimesCircle className="text-red-500" />
            default:
                return <FaCheck className="text-gray-500" />
        }
    }

    const calculateOrderTotals = () => {
        const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const shipping = order?.shipping_cost || 0
        const tax = order?.tax_amount || 0
        const total = order?.total_amount || 0

        return { subtotal, shipping, tax, total }
    }

    const handlePrint = () => {
        window.print()
    }

    const handleGoBack = () => {
        navigate('/admin?tab=orders')
    }

    const { subtotal, shipping, tax, total } = calculateOrderTotals()

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30 flex items-center justify-center">
                <div className="text-center">
                    <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Not Found</h3>
                    <p className="text-gray-500 mb-6">The order you're looking for doesn't exist.</p>
                    <button
                        onClick={handleGoBack}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-teal-600 transition"
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-teal-50/30 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                >
                    <div>
                        <button
                            onClick={handleGoBack}
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4"
                        >
                            <FaArrowLeft /> Back to Orders
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                        <p className="text-gray-600">Order #{order.order_number}</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            <FaPrint /> Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition">
                            <FaDownload /> Export
                        </button>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Overview */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order Status Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Order Status</h2>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)} flex items-center gap-2`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            Last updated: {formatDate(order.updated_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(e.target.value)}
                                        disabled={updatingStatus}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    {updatingStatus && (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                    )}
                                </div>
                            </div>

                            {/* Status Timeline */}
                            <div className="relative">
                                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200"></div>
                                {[
                                    { status: 'Pending', icon: <FaExclamationTriangle /> },
                                    { status: 'Processing', icon: <FaCheck /> },
                                    { status: 'Shipped', icon: <FaShippingFast /> },
                                    { status: 'Delivered', icon: <FaCheckCircle /> }
                                ].map((step, index) => {
                                    const isActive = (() => {
                                        const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered']
                                        const currentIndex = statusOrder.indexOf(order.status)
                                        const stepIndex = statusOrder.indexOf(step.status)
                                        return stepIndex <= currentIndex
                                    })()

                                    return (
                                        <div key={step.status} className="relative pl-8 pb-8 last:pb-0">
                                            <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                {step.icon}
                                            </div>
                                            <div>
                                                <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.status}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {step.status === 'Pending' && 'Order received'}
                                                    {step.status === 'Processing' && 'Preparing order'}
                                                    {step.status === 'Shipped' && 'Shipped to customer'}
                                                    {step.status === 'Delivered' && 'Delivered successfully'}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Order Items */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                                <p className="text-gray-600 text-sm">{orderItems.length} items</p>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {orderItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={item.products?.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'}
                                                alt={item.product_title}
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{item.product_title}</h4>
                                                <p className="text-sm text-gray-500">{item.products?.category || 'Uncategorized'}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-gray-600">Qty: {item.quantity}</span>
                                                    <span className="text-gray-600">Price: EGP {item.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">EGP {(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">Subtotal</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>EGP {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>EGP {shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>EGP {tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>EGP {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Customer & Order Info */}
                    <div className="space-y-8">
                        {/* Customer Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {order.customer_name?.charAt(0) || customer?.full_name?.charAt(0) || 'C'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{order.customer_name}</h3>
                                        <p className="text-gray-600 text-sm">{order.customer_email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <FaEnvelope className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{order.customer_email}</p>
                                        </div>
                                    </div>

                                    {order.shipping_phone && (
                                        <div className="flex items-center gap-3">
                                            <FaPhone className="text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">Phone (Shipping)</p>
                                                <p className="font-medium">{order.shipping_phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {customer?.phone && (
                                        <div className="flex items-center gap-3">
                                            <FaPhone className="text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">Phone (Account)</p>
                                                <p className="font-medium">{customer.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {customer?.full_name && (
                                        <div className="flex items-center gap-3">
                                            <FaUser className="text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium">{customer.full_name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {order.user_id && (
                                        <div className="flex items-center gap-3">
                                            <FaIdCard className="text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">Customer ID</p>
                                                <p className="font-medium">{order.user_id.substring(0, 8)}...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Shipping Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-gray-400 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Shipping Address</p>
                                        <p className="text-gray-600 mt-1">{order.shipping_address}</p>
                                        <p className="text-gray-600">{order.shipping_city}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <FaTruck className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Shipping Method</p>
                                            <p className="font-medium">Standard Shipping</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaDollarSign className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Shipping Cost</p>
                                            <p className="font-medium">EGP {(order.shipping_cost || 0).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaDollarSign className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Tax Amount</p>
                                            <p className="font-medium">EGP {(order.tax_amount || 0).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Information</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <FaIdCard className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Order Number</p>
                                            <p className="font-medium">{order.order_number}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <FaCalendar className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Order Date</p>
                                            <p className="font-medium">{formatDate(order.created_at)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaCreditCard className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-medium capitalize">{order.payment_method}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaShoppingBag className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Items</p>
                                            <p className="font-medium">{orderItems.length} products</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaBox className="text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Order Source</p>
                                            <p className="font-medium">{order.user_id ? 'Registered User' : 'Guest Checkout'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white"
                        >
                            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition">
                                    <FaEnvelope /> Send Invoice
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition">
                                    <FaPhone /> Contact Customer
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition">
                                    <FaTruck /> Track Shipment
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Notes Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-white rounded-2xl shadow-lg p-6"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Notes</h2>
                    <textarea
                        placeholder="Add notes about this order..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        defaultValue={order.notes || ''}
                        onChange={(e) => {
                            // You can implement saving notes functionality here
                        }}
                    />
                    <div className="flex justify-end mt-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            Save Notes
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Print Styles */}
            <style>
                {`
          @media print {
            .no-print {
              display: none !important;
            }
            
            body {
              background: white !important;
            }
            
            .bg-gradient-to-br {
              background: white !important;
            }
            
            .shadow-lg {
              box-shadow: none !important;
            }
            
            .rounded-2xl {
              border-radius: 0 !important;
            }
            
            button, select {
              display: none !important;
            }
            
            .border {
              border: 1px solid #e5e7eb !important;
            }
          }
        `}
            </style>
        </div>
    )
}
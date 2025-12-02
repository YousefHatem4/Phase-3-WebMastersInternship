import React, { useState } from 'react'
import style from './Contact.module.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
        }, 2000);
    };

    const contactInfo = [
        {
            icon: "fas fa-map-marker-alt",
            title: "Visit Us",
            details: ["Egypt"],
            color: "text-blue-500"
        },
        {
            icon: "fas fa-envelope",
            title: "Email Us",
            details: ["yousef.hatem.developer@gmail.com"],
            color: "text-blue-400"
        },
        {
            icon: "fas fa-phone",
            title: "Call Us",
            details: ["+021140821819"],
            color: "text-teal-400"
        }
    ];

    const inquiryTypes = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Customer Support' },
        { value: 'sales', label: 'Sales & Partnerships' },
        { value: 'feedback', label: 'Feedback & Suggestions' },
        { value: 'press', label: 'Press & Media' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className='relative py-20 lg:py-32 px-5 lg:px-30 bg-gradient-to-br from-blue-50/30 via-white to-teal-50/30 overflow-hidden'>
                {/* Background decorative elements */}
                <div className='absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-blue-300/10 to-teal-300/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl'></div>

                {/* Content */}
                <div className='relative max-w-4xl mx-auto text-center'>
                    <div className='inline-flex items-center gap-3 mb-6'>
                        <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                        <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Get In Touch</h2>
                    </div>

                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                        Let's Start a <span className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>Conversation</span>
                    </h1>

                    <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12'>
                        We're here to help! Whether you have questions, feedback, or need support, our team is ready to assist you every step of the way.
                    </p>

                    {/* Quick Stats */}
                    <div className='flex justify-center items-center gap-8 text-center mb-8'>
                        <div>
                            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>&lt;1hr</div>
                            <div className='text-sm text-gray-600'>Response Time</div>
                        </div>
                        <div className='w-px h-12 bg-gray-300'></div>
                        <div>
                            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>24/7</div>
                            <div className='text-sm text-gray-600'>Support</div>
                        </div>
                        <div className='w-px h-12 bg-gray-300'></div>
                        <div>
                            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>98%</div>
                            <div className='text-sm text-gray-600'>Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className='py-16 px-5 lg:px-30 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
                        {contactInfo.map((info, index) => (
                            <div key={index} className='group'>
                                <div className='bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100'>
                                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <i className={`${info.icon} ${info.color} text-2xl`}></i>
                                    </div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-4'>{info.title}</h3>
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className='text-gray-600 leading-relaxed'>
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className='py-16 px-5 lg:px-30 bg-gradient-to-br from-blue-50/30 to-teal-50/30'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <div className='inline-flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                            <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Send Message</h2>
                        </div>
                        <h3 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>Drop Us a Line</h3>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            Fill out the form below and we'll get back to you as soon as possible
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className='bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100'>
                        {submitted ? (
                            // Success Message
                            <div className='text-center py-12'>
                                <div className='w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6'>
                                    <i className="fas fa-check text-green-500 text-3xl"></i>
                                </div>
                                <h3 className='text-2xl font-bold text-gray-900 mb-4'>Message Sent Successfully!</h3>
                                <p className='text-gray-600 mb-8'>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className='px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:from-blue-600 hover:to-teal-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 font-medium'
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='space-y-6'>
                                {/* Inquiry Type */}
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-3'>
                                        What can we help you with?
                                    </label>
                                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
                                        {inquiryTypes.map((type) => (
                                            <label key={type.value} className='relative cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name="inquiryType"
                                                    value={type.value}
                                                    checked={formData.inquiryType === type.value}
                                                    onChange={handleInputChange}
                                                    className='sr-only'
                                                />
                                                <div className={`p-3 rounded-xl border-2 text-center text-sm font-medium transition-all duration-300 hover:scale-105 ${formData.inquiryType === type.value
                                                    ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                                                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                                                    }`}>
                                                    {type.label}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Name and Email Row */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div>
                                        <label htmlFor="name" className='block text-sm font-semibold text-gray-700 mb-2'>
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700'
                                            placeholder='Enter your full name'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-2'>
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700'
                                            placeholder='your.email@example.com'
                                        />
                                    </div>
                                </div>

                                {/* Phone and Subject Row */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div>
                                        <label htmlFor="phone" className='block text-sm font-semibold text-gray-700 mb-2'>
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700'
                                            placeholder='+1 (555) 123-4567'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className='block text-sm font-semibold text-gray-700 mb-2'>
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700'
                                            placeholder='Brief subject of your message'
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700 resize-none'
                                        placeholder='Tell us more about your inquiry...'
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className='flex flex-col sm:flex-row gap-4 pt-6'>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`flex-1 py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${isSubmitting
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 hover:scale-105'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane mr-2"></i>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className='px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20 font-medium text-lg'
                                    >
                                        <i className="fas fa-phone mr-2"></i>
                                        Call Instead
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='py-16 px-5 lg:px-30 bg-white'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <div className='inline-flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                            <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Quick Help</h2>
                        </div>
                        <h3 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>Frequently Asked Questions</h3>
                    </div>

                    <div className='space-y-4'>
                        {[
                            {
                                question: "What are your customer support hours?",
                                answer: "We provide 24/7 customer support through email and live chat. Phone support is available Monday-Friday, 9 AM - 6 PM EST."
                            },
                            {
                                question: "How quickly will I receive a response?",
                                answer: "We typically respond to all inquiries within 1 hour during business hours and within 24 hours on weekends and holidays."
                            },
                            {
                                question: "Do you offer live chat support?",
                                answer: "Yes! Our live chat is available 24/7 on our website. Just click the chat bubble in the bottom right corner."
                            },
                            {
                                question: "Can I schedule a call with your team?",
                                answer: "Absolutely! Contact us through the form above or call us directly to schedule a convenient time for a detailed conversation."
                            }
                        ].map((faq, index) => (
                            <div key={index} className='bg-gradient-to-r from-blue-50/50 to-teal-50/50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300'>
                                <h4 className='text-lg font-semibold text-gray-900 mb-3'>{faq.question}</h4>
                                <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media & Alternative Contact */}
            <section className='py-16 px-5 lg:px-30 bg-gradient-to-r from-blue-500 to-teal-500 text-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-3xl lg:text-4xl font-bold mb-6'>
                        Connect With Us
                    </h2>
                    <p className='text-xl mb-10 opacity-90'>
                        Follow us on social media for the latest updates, tips, and exclusive offers
                    </p>

                    <div className='flex justify-center gap-6 mb-12'>
                        <a
                            href="#"
                            className='w-16 h-16 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group'
                        >
                            <i className="fab fa-facebook-f text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                        </a>
                        <a
                            href="#"
                            className='w-16 h-16 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group'
                        >
                            <i className="fab fa-twitter text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                        </a>
                        <a
                            href="#"
                            className='w-16 h-16 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group'
                        >
                            <i className="fab fa-instagram text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                        </a>
                        <a
                            href="#"
                            className='w-16 h-16 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group'
                        >
                            <i className="fab fa-linkedin text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                        </a>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6'>
                            <i className="fas fa-envelope text-3xl mb-4"></i>
                            <h3 className='text-xl font-bold mb-2'>Email Us Directly</h3>
                            <p className='opacity-90 mb-4'>For detailed inquiries</p>
                            <a
                                href="mailto:yousef.hatem.developer@gmail.com"
                                className='inline-block px-6 py-3 bg-white text-blue-500 rounded-xl hover:bg-gray-100 transition-colors duration-300 font-medium'
                            >
                                Send Email
                            </a>
                        </div>
                        <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6'>
                            <i className="fas fa-phone text-3xl mb-4"></i>
                            <h3 className='text-xl font-bold mb-2'>Call Us Now</h3>
                            <p className='opacity-90 mb-4'>For immediate assistance</p>
                            <a
                                href="tel:+021140821819"
                                className='inline-block px-6 py-3 bg-white text-blue-500 rounded-xl hover:bg-gray-100 transition-colors duration-300 font-medium'
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
import React from 'react'
import style from './About.module.css'
import { Link } from 'react-router-dom';

export default function About() {
    const teamMembers = [
        {
            id: 1,
            name: "David Kim",
            role: "VP of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            bio: "Operations expert ensuring seamless customer experiences."
        },
        {
            id: 2,
            name: "David Kim",
            role: "VP of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            bio: "Operations expert ensuring seamless customer experiences."
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Head of Design",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            bio: "Creative force behind our beautiful, user-centric experiences."
        },
        {
            id: 4,
            name: "David Kim",
            role: "VP of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            bio: "Operations expert ensuring seamless customer experiences."
        }
    ];

    const stats = [
        { number: "50K+", label: "Happy Customers" },
        { number: "1M+", label: "Orders Delivered" },
        { number: "500+", label: "Premium Brands" },
        { number: "99%", label: "Satisfaction Rate" }
    ];

    const values = [
        {
            icon: "fas fa-heart",
            title: "Customer First",
            description: "Every decision we make is guided by what's best for our customers."
        },
        {
            icon: "fas fa-shield-alt",
            title: "Trust & Security",
            description: "We prioritize security and transparency in all our interactions."
        },
        {
            icon: "fas fa-rocket",
            title: "Innovation",
            description: "We continuously evolve to bring you the latest in e-commerce."
        },
        {
            icon: "fas fa-globe",
            title: "Sustainability",
            description: "Building a better future through responsible business practices."
        }
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
                <div className='relative max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <div className='inline-flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                            <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Story</h2>
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight'>
                            Redefining <span className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>E-Commerce</span>
                        </h1>

                        <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12'>
                            We're on a mission to transform how people shop online by creating meaningful connections between customers and premium brands through innovative technology and exceptional service.
                        </p>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>

                            <Link to={'/contact'} className='px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20 font-medium text-lg'>
                                <i className="fas fa-envelope mr-2"></i>
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
                        {stats.map((stat, index) => (
                            <div key={index} className='text-center group'>
                                <div className='bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100'>
                                    <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300'>
                                        {stat.number}
                                    </div>
                                    <div className='text-gray-600 font-medium'>
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className='py-20 px-5 lg:px-30 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20'>
                        {/* Mission */}
                        <div className='group'>
                            <div className='bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 lg:p-12 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'>
                                <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300'>
                                    <i className="fas fa-bullseye text-white text-2xl"></i>
                                </div>
                                <h3 className='text-3xl font-bold text-gray-900 mb-6'>Our Mission</h3>
                                <p className='text-gray-700 text-lg leading-relaxed'>
                                    To democratize access to premium products by connecting customers worldwide with trusted brands through a seamless, secure, and delightful shopping experience that exceeds expectations at every touchpoint.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className='group'>
                            <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'>
                                <div className='w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300'>
                                    <i className="fas fa-eye text-white text-2xl"></i>
                                </div>
                                <h3 className='text-3xl font-bold text-gray-900 mb-6'>Our Vision</h3>
                                <p className='text-gray-700 text-lg leading-relaxed'>
                                    To become the world's most trusted e-commerce platform, where quality meets convenience, innovation drives growth, and every customer feels valued, heard, and empowered in their shopping journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='py-20 px-5 lg:px-30 bg-gradient-to-br from-blue-50/30 to-teal-50/30'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <div className='inline-flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                            <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Values</h2>
                        </div>
                        <h3 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>What Drives Us Forward</h3>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            These core values guide every decision we make and every relationship we build
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {values.map((value, index) => (
                            <div key={index} className='group'>
                                <div className='bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 h-full'>
                                    <div className='w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                                        <i className={`${value.icon} text-white text-2xl`}></i>
                                    </div>
                                    <h4 className='text-xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300'>
                                        {value.title}
                                    </h4>
                                    <p className='text-gray-600 leading-relaxed'>
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className='py-20 px-5 lg:px-30 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <div className='inline-flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                            <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Team</h2>
                        </div>
                        <h3 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>Meet the Visionaries</h3>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            Passionate professionals dedicated to revolutionizing your shopping experience
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {teamMembers.map((member, index) => (
                            <div key={member.id} className='group' style={{ animationDelay: `${index * 150}ms` }}>
                                <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100'>
                                    {/* Image */}
                                    <div className='relative overflow-hidden'>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    </div>

                                    {/* Content */}
                                    <div className='p-6'>
                                        <h4 className='text-xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300'>
                                            {member.name}
                                        </h4>
                                        <p className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-medium mb-3'>
                                            {member.role}
                                        </p>
                                        <p className='text-gray-600 text-sm leading-relaxed'>
                                            {member.bio}
                                        </p>
                                    </div>

                                    {/* Social Links (hover reveal) */}
                                    <div className='px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        <div className='flex gap-3 justify-center'>
                                            <button className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:text-white transition-colors duration-300 flex items-center justify-center'>
                                                <i className="fab fa-linkedin text-sm"></i>
                                            </button>
                                            <button className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:text-white transition-colors duration-300 flex items-center justify-center'>
                                                <i className="fab fa-twitter text-sm"></i>
                                            </button>
                                            <button className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:text-white transition-colors duration-300 flex items-center justify-center'>
                                                <i className="fas fa-envelope text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className='py-20 px-5 lg:px-30 bg-gradient-to-br from-blue-50/30 to-teal-50/30'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-16'>
                        <div className='inline-flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-teal-400 w-[20px] h-[40px] rounded-lg'></div>
                            <h2 className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-bold text-sm sm:text-base'>Our Journey</h2>
                        </div>
                        <h3 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>Growing Together</h3>
                    </div>

                    <div className='space-y-12'>
                        {[
                            { year: "2020", title: "The Beginning", description: "Started with a vision to revolutionize online shopping" },
                            { year: "2021", title: "First Milestone", description: "Reached 10,000+ happy customers and 100+ brand partnerships" },
                            { year: "2023", title: "Major Expansion", description: "Launched international shipping and mobile app" },
                            { year: "2025", title: "Leading Innovation", description: "Now serving 50,000+ customers with cutting-edge technology" }
                        ].map((milestone, index) => (
                            <div key={index} className='flex items-center gap-8 group'>
                                <div className='flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300'>
                                    {milestone.year}
                                </div>
                                <div className='bg-white rounded-2xl p-6 flex-1 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                                    <h4 className='text-xl font-bold text-gray-900 mb-2'>{milestone.title}</h4>
                                    <p className='text-gray-600'>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className='py-20 px-5 lg:px-30 bg-gradient-to-r from-blue-500 to-teal-500 text-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-3xl lg:text-5xl font-bold mb-6'>
                        Ready to Join Our Journey?
                    </h2>
                    <p className='text-xl mb-10 opacity-90'>
                        Discover premium products, exceptional service, and a shopping experience like no other.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link to={'/Products'} className='px-8 py-4 bg-white text-blue-500 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20 font-medium text-lg'>
                            <i className="fas fa-shopping-bag mr-2"></i>
                            Start Shopping
                        </Link>

                    </div>
                </div>
            </section>
        </>
    )
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarAlt, faTools } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
    // Use the environment variable
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`)
        .then(res => {
            setBlogs(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Critical Error Fetching Blogs:", err);
            setError('Failed to load blog posts. Please ensure the server is running and try again.');
            setLoading(false);
        });
}, []);

    return (
        <div className="min-h-screen bg-light">
            <SEO 
                title="Car Maintenance Blog - Khokhar Motors Ahmedabad"
                description="Read expert tips and advice on car maintenance, repair, and servicing from the Khokhar Motors blog in Ahmedabad."
                keywords="car maintenance blog, car repair tips, ahmedabad automotive blog"
            />

            <section className="relative py-24 bg-gradient-to-br from-secondary to-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517524206127-48bbd363f357?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimatedSection>
                            <h1 className="text-5xl md:text-7xl font-urbanist font-black mb-6 leading-tight">
                                Khokhar Motors <span className="text-primary">Blog</span>
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <p className="text-xl md:text-2xl font-inter text-gray-300 mb-8 leading-relaxed">
                                Expert tips, maintenance guides, and news from our Ahmedabad workshop to keep your car in top condition.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {loading && (
                        <div className="text-center text-gray-600 font-semibold">
                            <p>Loading posts...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-red-800 mb-2">An Error Occurred</h2>
                            <p className="font-inter">{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        blogs.length === 0 ? (
                            <div className="text-center text-gray-600 p-8 bg-white rounded-lg shadow-md">
                                <FontAwesomeIcon icon={faTools} size="3x" className="mb-4 text-gray-400"/>
                                <h2 className="text-2xl font-bold text-secondary mb-2">No Posts Yet</h2>
                                <p className="font-inter">There are no featured blog posts to display right now. Please add one from the admin panel!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogs.map((blog, index) => {
                                    // --- THE BULLETPROOF FIX IS HERE ---
                                    const imageUrl = blog.featuredImage 
    ? `${import.meta.env.VITE_API_BASE_URL}/${blog.featuredImage.replace(/\\/g, '/')}` 
    : '...';

                                    return (
                                        <AnimatedSection key={blog._id} delay={index * 100}>
                                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group h-full flex flex-col">
                                                <Link to={`/blog/${blog.slug}`} className="block overflow-hidden">
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={blog.title}
                                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </Link>
                                                <div className="p-6 flex-grow flex flex-col">
                                                    <div className="mb-4">
                                                        <span className="text-sm text-gray-500 font-inter flex items-center">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                                            {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-poppins font-bold text-secondary mb-3 group-hover:text-primary transition-colors flex-grow">
                                                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                                                    </h3>
                                                    <p className="text-gray-600 font-inter text-sm mb-4 leading-relaxed line-clamp-3">
                                                        {blog.metaDescription}
                                                    </p>
                                                    <div className="mt-auto">
                                                        <Link to={`/blog/${blog.slug}`} className="inline-flex items-center text-primary font-inter font-semibold group-hover:text-secondary transition-colors">
                                                            Read More
                                                            <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedSection>
                                    )
                                })}
                            </div>
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
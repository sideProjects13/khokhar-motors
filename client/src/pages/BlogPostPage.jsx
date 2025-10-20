import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BlogPostPage = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${slug}`)
            .then(res => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blog post:", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading post...</p></div>;
    }
    
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold text-secondary mb-4">Post Not Found</h1>
                <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you were looking for.</p>
                <Link to="/blog" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Blog
                </Link>
            </div>
        );
    }

    // --- THE BULLETPROOF FIX IS HERE ---
    const heroImageUrl = post.featuredImage
    ? `${import.meta.env.VITE_API_BASE_URL}/${post.featuredImage.replace(/\\/g, '/')}`
    : '...';

    return (
        <div className="bg-white">
            <SEO 
                title={`${post.title} | Khokhar Motors Blog`}
                description={post.metaDescription}
            />
            <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }}>
                <div className="absolute inset-0 bg-secondary/70 flex items-center justify-center">
                    <div className="text-center text-white p-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-urbanist font-black">{post.title}</h1>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-300">
                            <span className="flex items-center"><FontAwesomeIcon icon={faUser} className="mr-2" />{post.author}</span>
                            <span className="flex items-center"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:px-8">
                {/* Custom styling for Markdown content */}
                <article className="prose lg:prose-xl max-w-none prose-h2:font-urbanist prose-h2:text-secondary prose-a:text-primary hover:prose-a:text-red-700">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
};

export default BlogPostPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ title: '', metaDescription: '', content: '', author: 'Khokhar Motors Admin', slug: '', isFeatured: false });
    const [featuredImageFile, setFeaturedImageFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/blogs`;

    const fetchBlogs = () => {
        axios.get(API_URL)
            .then(res => {
                setBlogs(res.data);
            })
            .catch(err => {
                console.error("Error fetching blog posts:", err);
            });
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        
        if (name === 'title' && !isEditing) {
            const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            setCurrentBlog(prev => ({ ...prev, title: value, slug }));
        } else {
            setCurrentBlog(prev => ({ ...prev, [name]: finalValue }));
        }
    };

    const handleFileChange = (e) => {
        setFeaturedImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(currentBlog).forEach(key => {
            formData.append(key, currentBlog[key]);
        });
        if (featuredImageFile) {
            formData.append('featuredImage', featuredImageFile);
        }

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        
        const apiCall = isEditing 
            ? axios.put(`${API_URL}/${currentBlog._id}`, formData, config)
            : axios.post(API_URL, formData, config);

        apiCall.then(() => {
            setIsFormVisible(false);
            fetchBlogs();
        }).catch(err => {
            console.error("Error saving blog post:", err.response?.data);
            alert('Error saving post. Slugs must be unique.');
        });
    };

    const handleEdit = (blog) => {
        setIsEditing(true);
        setCurrentBlog(blog);
        setFeaturedImageFile(null);
        setIsFormVisible(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to permanently delete this post?')) {
            axios.delete(`${API_URL}/${id}`).then(fetchBlogs);
        }
    };
    
    const handleToggleFeature = (blog) => {
        const updatedBlog = { ...blog, isFeatured: !blog.isFeatured };
        axios.put(`${API_URL}/${blog._id}`, updatedBlog)
            .then(fetchBlogs)
            .catch(err => console.error("Error updating feature status", err));
    };

    const openNewPostForm = () => {
        setIsEditing(false);
        setCurrentBlog({ title: '', metaDescription: '', content: '', author: 'Khokhar Motors Admin', slug: '', isFeatured: false });
        setFeaturedImageFile(null);
        setIsFormVisible(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
                <button onClick={openNewPostForm} className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Post
                </button>
            </div>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8 space-y-4 animate-fadeIn">
                    <h2 className="text-xl font-semibold">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
                    
                    <input type="text" name="title" value={currentBlog.title} onChange={handleInputChange} placeholder="Blog Title" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="text" name="slug" value={currentBlog.slug} onChange={handleInputChange} placeholder="URL Slug (auto-generated from title)" required className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? 'bg-gray-200' : 'bg-gray-100'}`} disabled={isEditing} />
                    
                    <textarea name="metaDescription" value={currentBlog.metaDescription} onChange={handleInputChange} placeholder="Meta Description (for SEO - max 160 characters)" rows="3" maxLength="160" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    <p className="text-xs text-gray-500 text-right">{currentBlog.metaDescription.length} / 160</p>
                    
                    <textarea name="content" value={currentBlog.content} onChange={handleInputChange} placeholder="Blog Content (Markdown supported)" rows="10" required className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                        <input type="file" name="featuredImage" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                        {isEditing && currentBlog.featuredImage && <p className="text-xs text-gray-500 mt-2">Current image: {currentBlog.featuredImage}. Upload a new file to replace it.</p>}
                    </div>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" name="isFeatured" checked={currentBlog.isFeatured} onChange={handleInputChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                        <span>Feature this post on the main blog page</span>
                    </label>
                    
                    <div className="flex gap-4">
                        <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">{isEditing ? 'Update Post' : 'Create Post'}</button>
                        <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors">Cancel</button>
                    </div>
                </form>
            )}

            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Featured</th>
                            <th className="p-3 text-left">Created At</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    {blog.featuredImage && <img src={`${import.meta.env.VITE_API_BASE_URL}/${blog.featuredImage.replace(/\\/g, '/')}`} alt={blog.title} className="w-16 h-10 object-cover rounded"/>}
                                </td>
                                <td className="p-3 font-semibold text-secondary">{blog.title}</td>
                                <td className="p-3">
                                    <button onClick={() => handleToggleFeature(blog)} title={blog.isFeatured ? "Click to Unfeature" : "Click to Feature"}>
                                        <FontAwesomeIcon icon={blog.isFeatured ? faToggleOn : faToggleOff} className={`text-2xl ${blog.isFeatured ? 'text-green-500' : 'text-gray-400'}`} />
                                    </button>
                                </td>
                                <td className="p-3 text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className="p-3 space-x-4">
                                    <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-800" title="Edit"><FontAwesomeIcon icon={faPen} /></button>
                                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-800" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;
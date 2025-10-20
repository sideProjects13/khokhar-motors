import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/testimonials`;

    const fetchTestimonials = () => {
        axios.get(API_URL)
            .then(res => setTestimonials(res.data))
            .catch(err => console.error("Failed to fetch testimonials", err));
    };

    useEffect(fetchTestimonials, []);

    const handleToggleApprove = (id, currentStatus) => {
        axios.put(`${API_URL}/${id}`, { approved: !currentStatus })
            .then(() => fetchTestimonials())
            .catch(err => console.error("Failed to update status", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            axios.delete(`${API_URL}/${id}`)
                .then(() => fetchTestimonials())
                .catch(err => console.error("Failed to delete", err));
        }
    };
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Testimonials</h1>
             <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Author</th>
                            <th className="p-3 text-left">Review</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map(item => (
                            <tr key={item._id} className="border-b">
                                <td className="p-3">{item.author}</td>
                                <td className="p-3 max-w-sm truncate">{item.review}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.approved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                        {item.approved ? 'Featured' : 'Not Featured'}
                                    </span>
                                </td>
                                <td className="p-3 space-x-4">
                                    <button onClick={() => handleToggleApprove(item._id, item.approved)} className="text-blue-500 hover:underline">
                                        {item.approved ? 'Unfeature' : 'Feature'}
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTestimonials;
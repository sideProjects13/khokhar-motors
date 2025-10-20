import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

const ManageContacts = () => {
    const [messages, setMessages] = useState([]);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/contacts`;

     const fetchMessages = () => {
        axios.get(API_URL)
            .then(res => setMessages(res.data))
            .catch(err => console.error("Failed to fetch contact messages", err));
    };

    useEffect(fetchMessages, []);

    const handleToggleRead = (id, currentStatus) => {
        axios.put(`${API_URL}/${id}`, { isRead: !currentStatus })
            .then(() => fetchMessages())
            .catch(err => console.error("Failed to update status", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            axios.delete(`${API_URL}/${id}`)
                .then(() => fetchMessages())
                .catch(err => console.error("Failed to delete message", err));
        }
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Contact Form Messages</h1>
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Message</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(msg => (
                            <tr key={msg._id} className={`border-b hover:bg-gray-50 ${!msg.isRead ? 'font-bold' : ''}`}>
                                <td className="p-3">{new Date(msg.createdAt).toLocaleString()}</td>
                                <td className="p-3">{msg.name}</td>
                                <td className="p-3">{msg.phone}</td>
                                <td className="p-3 max-w-sm truncate" title={msg.message}>{msg.message}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${!msg.isRead ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                                        {!msg.isRead ? 'New' : 'Read'}
                                    </span>
                                </td>
                                <td className="p-3 space-x-4">
                                    <button onClick={() => handleToggleRead(msg._id, msg.isRead)} className="text-blue-600 hover:underline" title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}>
                                        <FontAwesomeIcon icon={msg.isRead ? faEnvelope : faEnvelopeOpen} />
                                    </button>
                                    <button onClick={() => handleDelete(msg._id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContacts;
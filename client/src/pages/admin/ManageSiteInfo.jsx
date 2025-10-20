import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ManageSiteInfo = () => {
const [info, setInfo] = useState({});
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState('');
const API_URL = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {
    axios.get(`${API_URL}/api/site-info`)
        .then(res => {
            setInfo(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to fetch site info", err);
            setLoading(false);
        });
}, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Saving...');
    axios.put(`${API_URL}/api/admin/site-info`, info)
        .then(res => {
            setInfo(res.data);
            setMessage('Site Info updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        })
        .catch(err => {
            console.error("Failed to update site info", err);
            setMessage('Error updating info. Please try again.');
        });
};

if (loading) return <p>Loading site information...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Site Information</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-secondary mb-4">Contact Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="text" name="contactPhone" value={info.contactPhone || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="contactEmail" value={info.contactEmail || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Physical Address</label>
                        <textarea name="address" value={info.address || ''} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-secondary mb-4">Homepage Stats</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                            <input type="number" name="yearsExperience" value={info.yearsExperience || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Satisfied Clients</label>
                            <input type="number" name="satisfiedClients" value={info.satisfiedClients || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Employees</label>
                            <input type="number" name="totalEmployees" value={info.totalEmployees || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                    {message && <p className="text-sm text-gray-600">{message}</p>}
                    <button type="submit" className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageSiteInfo;
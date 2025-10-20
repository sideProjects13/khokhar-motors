import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ pendingAppointments: 0, newMessages: 0 });

    useEffect(() => {
        const fetchAppointments = axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/appointments`);
        const fetchContacts = axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/contacts`);

        Promise.all([fetchAppointments, fetchContacts])
            .then(([appointmentsRes, contactsRes]) => {
                const pending = appointmentsRes.data.filter(app => app.status === 'Pending').length;
                const unread = contactsRes.data.filter(msg => !msg.isRead).length;
                setStats({ pendingAppointments: pending, newMessages: unread });
            })
            .catch(err => console.error("Failed to fetch dashboard stats", err));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-yellow-100 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-yellow-800">Pending Appointments</h2>
                    <p className="text-4xl font-bold text-yellow-900">{stats.pendingAppointments}</p>
                    <Link to="/admin/appointments" className="text-yellow-700 hover:underline font-semibold">View All</Link>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-blue-800">New Messages</h2>
                    <p className="text-4xl font-bold text-blue-900">{stats.newMessages}</p>
                    <Link to="/admin/contacts" className="text-blue-700 hover:underline font-semibold">View All</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
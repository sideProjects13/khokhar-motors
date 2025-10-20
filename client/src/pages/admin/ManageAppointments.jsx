import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/appointments`;

    const fetchAppointments = () => {
        axios.get(API_URL)
            .then(res => setAppointments(res.data))
            .catch(err => console.error("Failed to fetch appointments", err));
    };

    useEffect(fetchAppointments, []);

    const handleStatusChange = (id, status) => {
        axios.put(`${API_URL}/${id}`, { status })
            .then(() => fetchAppointments())
            .catch(err => console.error("Failed to update status", err));
    };
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            axios.delete(`${API_URL}/${id}`)
                .then(() => fetchAppointments())
                .catch(err => console.error("Failed to delete", err));
        }
    };

    const viewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left min-w-[150px]">Car Model</th>
                            <th className="p-3 text-left">Service</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(app => (
                            <tr key={app._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{new Date(app.preferredDate).toLocaleDateString()} at {app.preferredTime}</td>
                                <td className="p-3 font-semibold">{app.name}</td>
                                <td className="p-3">{app.phone}</td>
                                <td className="p-3">{app.carBrand} {app.carModel} ({app.carYear})</td>
                                <td className="p-3">{app.serviceType}</td>
                                <td className="p-3">
                                    <select 
                                        value={app.status} 
                                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                        className={`rounded p-1 text-xs font-semibold border-2 ${
                                            app.status === 'Pending' ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 
                                            app.status === 'Completed' ? 'bg-green-100 border-green-200 text-green-800' : 
                                            'bg-red-100 border-red-200 text-red-800'
                                        }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-3 space-x-3">
                                    <button onClick={() => viewDetails(app)} className="text-blue-600 hover:underline font-semibold">Details</button>
                                    <button onClick={() => handleDelete(app._id)} className="text-red-600 hover:underline font-semibold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {isModalOpen && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-secondary">Appointment Details</h2>
                        <div className="space-y-3 text-gray-700">
                            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            selectedAppointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                            selectedAppointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>{selectedAppointment.status}</span></p>
                            <hr/>
                            <h3 className="font-bold pt-2">Customer Info</h3>
                            <p><strong>Name:</strong> {selectedAppointment.name}</p>
                            <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
                            <p><strong>Email:</strong> {selectedAppointment.email || 'N/A'}</p>
                            <hr/>
                            <h3 className="font-bold pt-2">Vehicle Info</h3>
                            <p><strong>Car:</strong> {selectedAppointment.carBrand} {selectedAppointment.carModel}</p>
                            <p><strong>Year:</strong> {selectedAppointment.carYear}</p>
                            <hr/>
                             <h3 className="font-bold pt-2">Service Info</h3>
                            <p><strong>Service Requested:</strong> {selectedAppointment.serviceType}</p>
                            <p><strong>Date & Time:</strong> {new Date(selectedAppointment.preferredDate).toLocaleDateString()} at {selectedAppointment.preferredTime}</p>
                            <p><strong>Additional Notes:</strong> {selectedAppointment.message || 'None'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAppointments;
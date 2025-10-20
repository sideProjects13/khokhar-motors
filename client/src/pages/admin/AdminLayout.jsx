import React from 'react';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';

const AdminLayout = ({ auth, setAuth }) => {
    const navigate = useNavigate();

    if (!auth) {
        return <Navigate to="/admin" />;
    }

    const handleLogout = () => {
        localStorage.removeItem('khokhar_admin_auth');
        setAuth(false);
        navigate('/admin');
    };
    
    const linkClass = ({ isActive }) => 
        `block p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'}`;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-secondary text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                    <p className="text-sm text-gray-400">Khokhar Motors</p>
                </div>
                <nav className="flex flex-col space-y-2 p-4">
                    <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/admin/appointments" className={linkClass}>Appointments</NavLink>
                    <NavLink to="/admin/testimonials" className={linkClass}>Testimonials</NavLink>
                    <NavLink to="/admin/contacts" className={linkClass}>Contact Messages</NavLink>
                    <NavLink to="/admin/blogs" className={linkClass}>Manage Blogs</NavLink> {/* ADD THIS LINE */}

                    <NavLink to="/admin/site-info" className={linkClass}>Site Info</NavLink>
                </nav>
                <div className="mt-auto p-4">
                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 p-3 rounded-lg w-full text-white font-semibold transition-colors">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
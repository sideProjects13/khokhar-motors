import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageSiteInfo from './pages/admin/ManageSiteInfo';
import ManageContacts from './pages/admin/ManageContacts';
import ManageBlogs from './pages/admin/ManageBlogs';

function App() {
  const [auth, setAuth] = useState(false);
  const [siteInfo, setSiteInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('khokhar_admin_auth') === 'true';
    setAuth(loggedIn);

    // Use the environment variable for the API call
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/site-info`)
      .then(response => {
        setSiteInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching site info:", error);
      });
  }, []);
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-white">
      {!isAdminRoute && <Navbar siteInfo={siteInfo} />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage siteInfo={siteInfo} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin setAuth={setAuth} />} />
          <Route path="/admin" element={<AdminLayout auth={auth} setAuth={setAuth} />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="appointments" element={<ManageAppointments />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="contacts" element={<ManageContacts />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="site-info" element={<ManageSiteInfo />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
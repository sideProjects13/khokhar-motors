import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faWhatsapp // <-- IMPORT WHATSAPP ICON
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhoneAlt, 
  faEnvelope, 
  faMapMarkerAlt,
  faClock,
  faArrowRight,
  faAward,
  faToolbox,
  faCar
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [siteInfo, setSiteInfo] = useState({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/site-info`)
      .then(response => {
        setSiteInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching site info for footer:", error);
      });
  }, []);
  
  // Format the phone number for the WhatsApp URL (removes spaces, +, etc.)
  const whatsappNumber = siteInfo.contactPhone?.replace(/[^0-9]/g, '');

  const services = [
    { name: "Engine Repair & Maintenance", path: "/services/engine" },
    { name: "Denting & Painting", path: "/services/denting-painting" },
    { name: "Periodic Maintenance", path: "/services/maintenance" },
    { name: "Brake & Suspension Repair", path: "/services/brakes" },
    { name: "AC Service & Repair", path: "/services/ac" },
    { name: "Car Detailing", path: "/services/detailing" }
  ];

  const quickLinks = [
    { name: "About Khokhar Motors", path: "/about" },
    { name: "Customer Reviews", path: "/testimonials" },
    { name: "Car Maintenance Blog", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy" }
  ];
  
  const formattedAddress = siteInfo.address ? siteInfo.address.split(',').map(part => part.trim()) : [];

  return (
    <footer className="bg-gradient-to-br from-secondary to-dark text-white overflow-hidden">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src='/logo.png'  className="w-13 h-13 object-contain"/>
              </div>
              <div className="ml-4">
                <span className="text-2xl font-urbanist font-black group-hover:text-primary transition-colors">
                  Khokhar Motors
                </span>
                <p className="text-gray-400 font-inter text-sm mt-1">
                  Premium Car Service Ahmedabad
                </p>
              </div>
            </Link>
            
            <p className="text-gray-400 font-inter mb-6 leading-relaxed">
              Your trusted partner for premium car care in Ahmedabad. With {siteInfo.yearsExperience || '15'}+ years of experience, we provide expert mechanical repairs & unparalleled customer service.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faAward} className="text-accent text-lg" />
                <span className="font-inter font-semibold">{siteInfo.yearsExperience || '15'}+ Years Experience</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faToolbox} className="text-accent text-lg" />
                <span className="font-inter font-semibold">Certified Mechanics</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group"><FontAwesomeIcon icon={faFacebook} className="text-white text-lg" /></a>
              <a href="#" aria-label="Instagram" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group"><FontAwesomeIcon icon={faInstagram} className="text-white text-lg" /></a>
              <a href="#" aria-label="Twitter" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group"><FontAwesomeIcon icon={faTwitter} className="text-white text-lg" /></a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-300 group"><FontAwesomeIcon icon={faWhatsapp} className="text-white text-lg" /></a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-urbanist font-bold text-xl text-white mb-6 flex items-center">
              <FontAwesomeIcon icon={faCar} className="text-accent mr-3" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}><Link to={service.path} className="flex items-center text-gray-400 hover:text-primary transition-colors duration-300 group font-inter"><FontAwesomeIcon icon={faArrowRight} className="text-accent text-xs mr-3 group-hover:translate-x-1 transition-transform" />{service.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-urbanist font-bold text-xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}><Link to={link.path} className="flex items-center text-gray-400 hover:text-primary transition-colors duration-300 group font-inter"><FontAwesomeIcon icon={faArrowRight} className="text-accent text-xs mr-3 group-hover:translate-x-1 transition-transform" />{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-urbanist font-bold text-xl text-white mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent text-lg" /></div>
                <div>
                  <h4 className="font-poppins font-semibold text-white mb-1">Our Location</h4>
                  <p className="text-gray-400 font-inter text-sm leading-relaxed">
                    {formattedAddress.length > 0 ? formattedAddress.map((line, index) => <span key={index}>{line}<br/></span>) : 'Loading...'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300"><FontAwesomeIcon icon={faPhoneAlt} className="text-accent text-lg" /></div>
                <div>
                  <h4 className="font-poppins font-semibold text-white mb-1">Call Us</h4>
                  <p className="text-gray-400 font-inter text-sm"><a href={`tel:${siteInfo.contactPhone}`} className="hover:text-primary transition-colors">{siteInfo.contactPhone || 'Loading...'}</a></p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300"><FontAwesomeIcon icon={faEnvelope} className="text-accent text-lg" /></div>
                <div>
                  <h4 className="font-poppins font-semibold text-white mb-1">Email Us</h4>
                  <p className="text-gray-400 font-inter text-sm"><a href={`mailto:${siteInfo.contactEmail}`} className="hover:text-primary transition-colors">{siteInfo.contactEmail || 'Loading...'}</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-400 font-inter text-sm">
          <p>&copy; {currentYear} Khokhar Motors. All Rights Reserved. | Premium Car Service Ahmedabad</p>
        </div>
      </div>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-50 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
    </footer>
  );
};

export default Footer;
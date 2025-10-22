import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faPhoneAlt,
  faMapMarkerAlt,
  faChevronDown,
  faWrench,
  faCarCrash,
  faCog,
  faShieldAlt,
  faTools,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ siteInfo }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
  // //   // Fetch site-wide information for the navbar
  // //   axios.get('http://localhost:5000/api/site-info')
  // //     .then(response => {
  // //       setSiteInfo(response.data);
  // //     })
  // //     .catch(error => {
  // //       console.error("Error fetching site info for Navbar:", error);
  // //     });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: faWrench, name: "Engine Repair", path: "/services/engine" },
    { icon: faCarCrash, name: "Denting & Painting", path: "/services/denting-painting" },
    { icon: faCog, name: "Periodic Maintenance", path: "/services/maintenance" },
    { icon: faTools, name: "Brake & Suspension", path: "/services/brakes" },
    { icon: faShieldAlt, name: "AC Service", path: "/services/ac" },
    { icon: faCheckCircle, name: "Car Detailing", path: "/services/detailing" }
  ];

  const navLinkClass = ({ isActive }) => {
    const baseClasses = "relative font-inter font-semibold transition-all duration-300 py-2 px-3 group";
    
    if (isScrolled) {
      return `${baseClasses} ${isActive ? "text-primary" : "text-secondary hover:text-primary"}`;
    } else {
      return `${baseClasses} ${isActive ? "text-primary" : "text-white/90 hover:text-white"}`;
    }
  };

  const mobileNavLinkClass = ({ isActive }) =>
    `block font-inter font-semibold transition-all duration-300 py-4 px-4 border-b border-white/10 ${isActive ? "text-primary bg-primary/10" : "text-white/90 hover:text-white hover:bg-white/5"}`;

  return (
    <>
      {/* Top Bar - DYNAMIC */}
      <div className={`bg-dark text-white py-2 hidden md:block transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 -mt-2' : 'opacity-100 h-auto'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent text-sm" />
                <span className="font-inter">{siteInfo?.address?.split(',')[0] || 'Loading...'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-accent text-sm" />
                <span className="font-inter">{siteInfo?.contactPhone || 'Loading...'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-accent font-inter font-semibold">Open Today: 8:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200' : 'bg-gradient-to-r from-secondary to-dark'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 z-0"></div>
                 <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">  
                  <img src='/logo.png'  className="w-13 h-13 object-contain"/>
                </div>
                <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <div className="ml-4">
                <span className={`text-2xl font-urbanist font-black transition-colors duration-300 ${isScrolled ? 'text-secondary' : 'text-white'} group-hover:text-primary`}>
                  Khokhar Motors
                </span>
                <p className={`text-xs font-inter transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-gray-300'}`}>
                  Premium Car Service Ahmedabad
                </p>
              </div>
            </Link>

            {/* Desktop Menu - IMPROVED SPACING */}
            <nav className="hidden lg:flex items-center space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className={`flex items-center space-x-1 font-inter font-semibold py-2 px-3 rounded-lg transition-all duration-300 group ${isScrolled ? 'text-secondary hover:text-primary hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
                  <span>Services</span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`text-xs transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-secondary' : 'text-white'}`} 
                  />
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-urbanist font-bold text-secondary text-lg">Our Services</h3>
                      <p className="font-inter text-gray-600 text-sm">Complete car care solutions</p>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-2">
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          to={service.path}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FontAwesomeIcon icon={service.icon} className="text-white text-sm" />
                          </div>
                          <span className="font-inter font-semibold text-secondary group-hover:text-primary transition-colors">
                            {service.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pt-3 border-t border-gray-100">
                      <Link 
                        to="/services" 
                        className="block text-center bg-primary text-white font-inter font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
              <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </nav>

            {/* Desktop CTA Button - DYNAMIC */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href={`tel:${siteInfo.contactPhone}`} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-gray-100 text-secondary hover:bg-primary hover:text-white' : 'bg-white/10 text-white hover:bg-primary'}`}
              >
                <FontAwesomeIcon icon={faPhoneAlt} className={`text-sm ${isScrolled ? 'text-secondary' : 'text-white'}`} />
                <span className="font-inter font-semibold">Call Now</span>
              </a>
              <Link 
                to="/appointment" 
                className="bg-primary hover:bg-red-700 text-white font-inter font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Book Service</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-gray-100 text-secondary hover:bg-primary hover:text-white' : 'bg-white/10 text-white hover:bg-primary'}`}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faTimes : faBars} 
                size="lg" 
                className={isScrolled ? 'text-secondary' : 'text-white'}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-secondary to-dark backdrop-blur-xl border-t border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-6">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
            
            {/* Mobile Services Accordion */}
            <div className="border-b border-white/10">
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex items-center justify-between w-full font-inter font-semibold text-white py-4 px-4 hover:bg-white/5 transition-colors duration-300">
                <span>Our Services</span>
                <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 animate-fadeIn">
                  {services.map((service, index) => (
                    <Link key={index} to={service.path} className="flex items-center space-x-3 py-3 px-8 text-white/80 hover:text-primary hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-b-0" onClick={() => { setIsMenuOpen(false); setIsServicesOpen(false); }}>
                      <FontAwesomeIcon icon={service.icon} className="text-accent w-5" />
                      <span className="font-inter">{service.name}</span>
                    </Link>
                  ))}
                  <Link to="/services" className="block text-center bg-primary text-white font-inter font-bold py-3 px-4 m-4 rounded-lg hover:bg-red-700 transition-colors duration-300" onClick={() => { setIsMenuOpen(false); setIsServicesOpen(false); }}>
                    View All Services
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/pricing" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>
            <NavLink to="/blog" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Blog</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>

            {/* Mobile CTA Buttons - DYNAMIC */}
            <div className="p-4 space-y-4 border-t border-white/10">
              <a 
                href={`tel:${siteInfo.contactPhone}`}
                className="flex items-center justify-center space-x-2 w-full bg-white/10 text-white font-inter font-bold py-4 px-6 rounded-xl hover:bg-primary transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faPhoneAlt} />
                <span>Call {siteInfo.contactPhone || '...'}</span>
              </a>
              <Link 
                to="/appointment"
                className="flex items-center justify-center space-x-2 w-full bg-primary text-white font-inter font-bold py-4 px-6 rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Book Service Now</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
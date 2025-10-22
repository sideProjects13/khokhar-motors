import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTools, faCarCrash, faCog, faCheckCircle, faWrench, 
  faTags, faSmile, faArrowRight, faQuoteLeft, faStar,
  faClock, faShieldAlt, faAward, faMapMarkerAlt,
  faPhoneAlt, faEnvelope, faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Hero Section ---
const Hero = () => (
  <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2183&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/90"></div>
    </div>
    
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-600/10 to-transparent animate-pulse"></div>
    </div>

    <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
      <AnimatedSection>
        <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-blue-400/30">
          <FontAwesomeIcon icon={faAward} className="text-amber-400 mr-2" />
          <span className="font-inter font-semibold text-amber-400">Ahmedabad's Most Trusted Car Service Center</span>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={200}>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-urbanist font-black mb-6 leading-tight">
          Premium <span className="text-blue-400">Car Service</span> in Ahmedabad
        </h1>
      </AnimatedSection>
      
      <AnimatedSection delay={400}>
        <p className="text-xl md:text-2xl font-inter text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
          Expert car repair, maintenance, and servicing with <span className="text-amber-400 font-semibold">transparent pricing</span> and <span className="text-amber-400 font-semibold">genuine parts</span>. Your trusted partner for complete automotive care in Ahmedabad.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={600}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            to="/appointment" 
            className="group bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center"
          >
            Book Service Now
            <FontAwesomeIcon icon={faArrowRight} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link 
            to="/services" 
            className="group border-2 border-gray-400 hover:border-amber-400 text-white font-bold text-lg py-4 px-12 rounded-xl transition-all duration-300 hover:bg-amber-400/10 flex items-center"
          >
            View Services
            <FontAwesomeIcon icon={faWrench} className="ml-3 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={800}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faClock} className="text-amber-400 text-2xl" />
            <span className="font-inter font-semibold">Quick Service</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faAward} className="text-amber-400 text-2xl" />
            <span className="font-inter font-semibold">Expert Mechanics</span>
          </div>
        </div>
      </AnimatedSection>
    </div>

    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-gray-300 rounded-full mt-2"></div>
      </div>
    </div>
  </div>
);

// --- Services Section ---
const Services = () => {
  const services = [
    {
      icon: faWrench,
      title: "Engine Repair & Maintenance",
      description: "Complete engine diagnostics, repair, and maintenance services by certified mechanics using advanced tools.",
      features: ["Engine Diagnostics", "Timing Belt Replacement", "Complete Overhaul"]
    },
    {
      icon: faCarCrash,
      title: "Denting & Painting",
      description: "Professional car body repair and painting services with color matching and quality guarantee.",
      features: ["Color Matching", "Rust Treatment", "Quality Finish"]
    },
    {
      icon: faCog,
      title: "Periodic Maintenance",
      description: "Scheduled servicing, oil changes, and preventive maintenance to keep your car running smoothly.",
      features: ["Oil Change", "Filter Replacement", "Multi-point Check"]
    },
    {
      icon: faTools,
      title: "Brake & Suspension",
      description: "Complete brake system repair and suspension services for optimal safety and comfort.",
      features: ["Brake Pad Replacement", "Suspension Repair", "Wheel Alignment"]
    },
    {
      icon: faShieldAlt,
      title: "AC Service & Repair",
      description: "Professional car AC servicing, gas charging, and repair for optimal cooling performance.",
      features: ["AC Gas Charging", "Compressor Repair", "Cooling Check"]
    },
    {
      icon: faCheckCircle,
      title: "Car Detailing",
      description: "Premium car cleaning, polishing, and detailing services to restore your car's showroom shine.",
      features: ["Interior Cleaning", "Exterior Polishing", "Ceramic Coating"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 font-inter font-semibold px-6 py-2 rounded-full mb-4">
            OUR SERVICES
          </div>
          <h2 className="text-4xl md:text-5xl font-urbanist font-bold text-gray-800 mb-6">
            Comprehensive <span className="text-blue-600">Car Care</span> Solutions
          </h2>
          <p className="text-gray-600 font-inter text-lg max-w-3xl mx-auto leading-relaxed">
            From routine maintenance to complex repairs, we offer complete automotive solutions with genuine parts and expert workmanship.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={service.icon} className="text-white text-2xl" />
                    </div>
                    <div className="text-right">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-poppins font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 font-inter">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3 text-sm" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/appointment" 
                    className="inline-flex items-center text-blue-600 font-inter font-semibold group-hover:text-blue-800 transition-colors"
                  >
                    Book Service
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Why Choose Us Section ---
const WhyUs = ({ siteInfo }) => {
  const features = [
    {
      icon: faTags,
      title: "Transparent Pricing",
      description: "No hidden costs. Get detailed quotes upfront with complete breakdown of parts and labor charges."
    },
    {
      icon: faAward,
      title: "Expert Technicians",
      description: "Certified mechanics with 10+ years experience handling all car models and complex repairs."
    },
    {
      icon: faClock,
      title: "Quick Turnaround",
      description: "Most services completed within 4-6 hours. Express service available for urgent repairs."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-3 border border-gray-600/20">
                <img 
                  src="/service-1.jpg"
                  alt="Expert mechanic working on car engine at Khokhar Motors Ahmedabad"
                  className="rounded-2xl w-full shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 rounded-2xl p-6 shadow-2xl border-2 border-blue-400/20">
                <div className="text-center">
                  <div className="text-3xl font-urbanist font-black text-white">{siteInfo.yearsExperience || '15'}+</div>
                  <div className="text-white/90 font-inter text-sm font-semibold">Years Experience</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-amber-500 text-gray-900 rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faAward} className="text-sm" />
                  <span className="font-inter font-bold text-sm">Since 2008</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="inline-block bg-amber-500/20 text-amber-400 font-inter font-semibold px-6 py-2 rounded-full mb-4 border border-amber-400/30">
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl md:text-5xl font-urbanist font-bold mb-6 leading-tight">
              Why <span className="text-blue-400">Khokhar Motors</span> is Ahmedabad's #1 Choice
            </h2>
            <p className="text-gray-300 font-inter text-lg mb-8 leading-relaxed">
              We combine decades of expertise with cutting-edge technology to deliver unparalleled automotive care. 
              Your satisfaction is our driving force at every step of the service journey.
            </p>
            <div className="grid gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-300 border border-blue-400/30">
                    <FontAwesomeIcon icon={feature.icon} className="text-amber-400 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-poppins font-bold mb-2 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-300 font-inter leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-gray-600/20 hover:border-amber-400/30 transition-all duration-300 group">
                <div className="text-2xl font-urbanist font-black text-amber-400 group-hover:scale-110 transition-transform duration-300">{siteInfo.satisfiedClients || '1500'}+</div>
                <div className="text-gray-300 font-inter text-sm mt-1">Satisfied Clients</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-gray-600/20 hover:border-amber-400/30 transition-all duration-300 group">
                <div className="text-2xl font-urbanist font-black text-amber-400 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-gray-300 font-inter text-sm mt-1">Customer Satisfaction</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-gray-600/20 hover:border-amber-400/30 transition-all duration-300 group">
                <div className="text-2xl font-urbanist font-black text-amber-400 group-hover:scale-110 transition-transform duration-300">{siteInfo.totalEmployees || '10'}+</div>
                <div className="text-gray-300 font-inter text-sm mt-1">Skilled Technicians</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Section ---
const Testimonials = ({ testimonials }) => {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 font-inter font-semibold px-6 py-2 rounded-full mb-4">
            CUSTOMER REVIEWS
          </div>
          <h2 className="text-4xl md:text-5xl font-urbanist font-bold text-gray-800 mb-6">
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>
          <p className="text-gray-600 font-inter text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers in Ahmedabad have to say about their experience.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-200">
                  <div className="flex text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (<FontAwesomeIcon key={i} icon={faStar} className="text-sm" />))}
                  </div>
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-blue-600 text-2xl mb-6 opacity-50" />
                  <p className="font-inter text-gray-700 mb-6 leading-relaxed italic">"{testimonial.review}"</p>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-poppins font-bold text-gray-800">{testimonial.author}</p>
                      <p className="font-inter text-gray-500 text-sm">Ahmedabad Customer</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>
      </div>
    </section>
  );
};

// --- Contact & Location Section ---
const ContactSection = ({ siteInfo }) => {
  const formattedAddress = siteInfo.address ? siteInfo.address.split(',').map(part => part.trim()) : [];
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white">
              <div className="inline-block bg-amber-500/20 text-amber-400 font-inter font-semibold px-6 py-2 rounded-full mb-4">CONTACT US</div>
              <h2 className="text-4xl font-urbanist font-bold mb-6">Visit Our <span className="text-blue-400">Car Service Center</span> in Ahmedabad</h2>
              <p className="text-gray-300 font-inter text-lg mb-8">Conveniently located in Ahmedabad with state-of-the-art facilities and ample parking space.</p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-amber-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-2">Our Location</h3>
                    <p className="text-gray-300 font-inter">
                      {formattedAddress.length > 0 ? formattedAddress.map((line, index) => <span key={index}>{line}<br/></span>) : 'Loading...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faPhoneAlt} className="text-amber-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-gray-300 font-inter">{siteInfo.contactPhone || 'Loading...'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-amber-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-2">Email Us</h3>
                    <p className="text-gray-300 font-inter">{siteInfo.contactEmail || 'Loading...'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faClock} className="text-amber-400 text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-lg mb-2">Working Hours</h3>
                    <p className="text-gray-300 font-inter">Mon - Sat: 8:00 AM - 8:00 PM<br />Sunday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-gray-50 rounded-3xl p-8 h-full">
              <h3 className="text-3xl font-urbanist font-bold text-gray-800 mb-6">Quick Service <span className="text-blue-600">Enquiry</span></h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-inter font-semibold mb-2">Your Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-inter font-semibold mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-inter font-semibold mb-2">Car Model</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="e.g., Honda City, Hyundai Creta" />
                </div>
                <div>
                  <label className="block text-gray-700 font-inter font-semibold mb-2">Service Required</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <option>Select Service</option>
                    <option>General Service</option>
                    <option>Engine Repair</option>
                    <option>Denting & Painting</option>
                    <option>AC Service</option>
                    <option>Brake Service</option>
                    <option>Car Detailing</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                  Get Free Quote
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// --- Final CTA Banner ---
const CTABanner = ({ siteInfo }) => (
  <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-urbanist font-black mb-6">Ready for Exceptional <span className="text-amber-400">Car Service</span> in Ahmedabad?</h2>
        <p className="text-xl font-inter text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">Join thousands of satisfied customers who trust Khokhar Motors for reliable, professional, and affordable car care.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/appointment" className="group bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-lg py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center">
            Book Appointment Now
            <FontAwesomeIcon icon={faArrowRight} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
          <a href={`tel:${siteInfo.contactPhone}`} className="group border-2 border-white/30 hover:border-white text-white font-bold text-lg py-4 px-12 rounded-xl transition-all duration-300 hover:bg-white/10 flex items-center">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-3" />
            Call: {siteInfo.contactPhone || 'Loading...'}
          </a>
        </div>
        <div className="mt-8 text-white/70 font-inter">
          <p>📍 Located in Ahmedabad | 🕒 Open 6 Days a Week | 🛠️ {siteInfo.yearsExperience || '15'}+ Years Experience</p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// --- Main HomePage Component ---
const HomePage = ({ siteInfo }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials`)
      .then(response => setTestimonials(response.data))
      .catch(error => console.error("Error fetching testimonials:", error));
  }, []);

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Best Car Repair & Service Center in Ahmedabad | Khokhar Motors"
        description="Khokhar Motors - Ahmedabad's trusted car service center offering expert mechanical repairs, denting painting, AC service, and complete car maintenance. 15+ years experience with genuine parts and warranty."
        keywords="car service ahmedabad, car repair ahmedabad, mechanic ahmedabad, car ac service ahmedabad, denting painting ahmedabad, car maintenance ahmedabad, khokhar motors, best car service center ahmedabad"
        canonical="https://khokharmotors.com"
      />
      <Hero />
      <Services />
      <WhyUs siteInfo={siteInfo} />
      <Testimonials testimonials={testimonials} />
      <ContactSection siteInfo={siteInfo} />
      <CTABanner siteInfo={siteInfo} />
    </div>
  );
};

export default HomePage;
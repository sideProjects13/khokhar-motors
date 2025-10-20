import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faEnvelope, 
  faClock,
  faCar,
  faHeadset,
  faPaperPlane,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import SEO from '../components/SEO';
import axios from 'axios';

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

const ContactPage = () => {
  const [siteInfo, setSiteInfo] = useState({});
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/site-info`)
      .then(response => setSiteInfo(response.data))
      .catch(error => console.error("Error fetching site info:", error));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required.";
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.carModel.trim()) newErrors.carModel = "Car model is required.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`, formData)
      .then(response => {
        alert('Your message has been sent! We will get back to you shortly.');
        setFormData({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
        setErrors({});
      })
      .catch(error => {
        alert('There was an error sending your message. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
  const formattedAddress = siteInfo.address ? siteInfo.address.split(',').map(part => part.trim()) : [];

  const contactMethods = [
    {
      icon: faMapMarkerAlt,
      title: "Visit Our Workshop",
      details: formattedAddress.length > 0 ? formattedAddress : ["Loading..."],
      action: "Get Directions",
      link: "#"
    },
    {
      icon: faPhoneAlt,
      title: "Call Us Directly",
      details: [siteInfo.contactPhone || "Loading..."],
      action: "Call Now",
      link: `tel:${siteInfo.contactPhone}`
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      details: [siteInfo.contactEmail || "Loading..."],
      action: "Send Email",
      link: `mailto:${siteInfo.contactEmail}`
    },
    {
      icon: faClock,
      title: "Working Hours",
      details: ["Mon - Sat: 8:00 AM - 8:00 PM", "Sunday: 9:00 AM - 4:00 PM"],
      action: "Book Appointment",
      link: "/appointment"
    }
  ];

  return (
    <div className="min-h-screen bg-light">
      <SEO 
        title="Contact Khokhar Motors - Car Service Center in Ahmedabad"
        description="Get in touch with Khokhar Motors for expert car service in Ahmedabad. Visit our workshop, call, or email for appointments and inquiries."
        keywords="contact car service ahmedabad, khokhar motors contact, car repair ahmedabad address, automotive service contact"
      />

      <section className="relative py-20 bg-gradient-to-br from-secondary to-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-7xl font-urbanist font-black mb-6 leading-tight">
                Get In <span className="text-primary">Touch</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="text-xl md:text-2xl font-inter text-gray-300 mb-8 leading-relaxed">
                We're here to help with all your automotive needs. Visit our Ahmedabad workshop or 
                contact us for expert car service and support.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-light rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 flex-shrink-0">
                    <FontAwesomeIcon icon={method.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-secondary mb-4">{method.title}</h3>
                  <div className="space-y-1 mb-6 flex-grow">
                    {method.details.map((detail, idx) => (
                      <p key={idx} className="font-inter text-gray-600">{detail}</p>
                    ))}
                  </div>
                  <a href={method.link} className="inline-flex items-center text-primary font-inter font-semibold hover:text-secondary transition-colors mt-auto">
                    {method.action}
                    <FontAwesomeIcon icon={faPaperPlane} className="ml-2 text-sm" />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="inline-block bg-primary/10 text-primary font-inter font-semibold px-6 py-2 rounded-full mb-4">
                  SEND US A MESSAGE
                </div>
                <h2 className="text-3xl font-urbanist font-bold text-secondary mb-6">
                  Quick Service <span className="text-primary">Enquiry</span>
                </h2>
                <p className="text-gray-600 font-inter mb-8">
                  Fill out the form below and our team will get back to you within 30 minutes.
                </p>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-inter font-semibold mb-2">Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="Enter your full name"/>
                      {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-inter font-semibold mb-2">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="10-digit number"/>
                      {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-inter font-semibold mb-2">Car Model *</label>
                    <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.carModel ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="e.g., Honda City 2020"/>
                    {errors.carModel && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.carModel}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-inter font-semibold mb-2">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="Describe your car issue or service requirement..."></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-50">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </AnimatedSection>
            
            {/* --- THIS IS THE COMPLETED SECTION --- */}
            <AnimatedSection delay={200}>
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117501.81055743478!2d72.48002341501729!3d23.02613943389083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                      width="100%" 
                      height="384" 
                      style={{ border:0 }} 
                      allowFullScreen="" 
                      loading="lazy"
                      title="Khokhar Motors Location"
                      referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="bg-gradient-to-r from-primary to-red-700 rounded-2xl p-8 text-white shadow-lg">
                  <div className="flex items-start space-x-4">
                    <FontAwesomeIcon icon={faHeadset} className="text-2xl mt-1 text-white" />
                    <div>
                      <h3 className="font-urbanist font-bold text-2xl mb-2">24/7 Roadside Assistance</h3>
                      <p className="font-inter text-white/90 mb-4">
                        Emergency car breakdown? We're here to help anytime, anywhere in Ahmedabad.
                      </p>
                      <a 
                        href={`tel:${siteInfo.contactPhone}`}
                        className="inline-flex items-center bg-accent text-dark font-bold py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={faPhoneAlt} className="mr-3" />
                        Call Emergency: {siteInfo.contactPhone || 'Loading...'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
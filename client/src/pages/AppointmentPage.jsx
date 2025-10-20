import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck, 
  faCar, 
  faUser, 
  faPhone, 
  faEnvelope,
  faTools,
  faClock,
  faShieldAlt,
  faCheckCircle,
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

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    serviceType: 'General Service',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.carBrand) newErrors.carBrand = "Car brand is required.";
    if (!formData.carModel) newErrors.carModel = "Car model is required.";
    if (!formData.carYear) newErrors.carYear = "Manufacturing year is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.preferredDate) newErrors.preferredDate = "Please select a date.";
    if (!formData.preferredTime) newErrors.preferredTime = "Please select a time slot.";
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
    if (!validateStep2()) return;
    
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/appointments`, formData)
      .then(response => {
        setCurrentStep(3);
      })
      .catch(error => {
        alert('There was an error booking your appointment. Please try again.');
      });
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
        setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const steps = [
      { id: 1, name: 'Vehicle Details' },
      { id: 2, name: 'Schedule' },
      { id: 3, name: 'Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-light">
      <SEO 
        title="Book Car Service Appointment - Khokhar Motors Ahmedabad"
        description="Schedule your car service appointment online with Khokhar Motors in Ahmedabad. Choose from general service, engine repair, AC service, and more."
        keywords="book car service ahmedabad, online appointment car repair, schedule service khokhar motors, automotive service booking"
      />

      <section className="relative py-20 bg-gradient-to-br from-secondary to-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-7xl font-urbanist font-black mb-6 leading-tight">
                Book Your <span className="text-primary">Service</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="text-xl md:text-2xl font-inter text-gray-300 mb-8 leading-relaxed">
                Schedule your car service appointment in just a few clicks. 
                Experience professional automotive care at your convenience.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-inter font-bold transition-all duration-300 ${
                      step.id === currentStep ? 'bg-primary border-primary text-white' : 
                      step.id < currentStep ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-gray-400'
                    }`}>
                      {step.id < currentStep ? <FontAwesomeIcon icon={faCheckCircle} /> : step.id}
                    </div>
                    <div className={`mt-2 font-inter text-sm font-semibold ${
                      step.id === currentStep ? 'text-primary' : step.id < currentStep ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-6">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} noValidate>
              {currentStep === 1 && (
                <AnimatedSection>
                  <div className="bg-light rounded-2xl p-8">
                    <h2 className="text-3xl font-urbanist font-bold text-secondary mb-6">Vehicle <span className="text-primary">Information</span></h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-gray-700 font-inter font-semibold mb-2">Car Brand *</label>
                        <select name="carBrand" value={formData.carBrand} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.carBrand ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}>
                          <option value="">Select Brand</option>
                          <option value="Maruti Suzuki">Maruti Suzuki</option>
                          <option value="Hyundai">Hyundai</option>
                          <option value="Honda">Honda</option>
                          <option value="Tata">Tata</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Mahindra">Mahindra</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.carBrand && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.carBrand}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-inter font-semibold mb-2">Car Model *</label>
                        <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.carModel ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="e.g., Swift Dzire"/>
                        {errors.carModel && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.carModel}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-inter font-semibold mb-2">Manufacturing Year *</label>
                        <select name="carYear" value={formData.carYear} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.carYear ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}>
                          <option value="">Select Year</option>
                          {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        {errors.carYear && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.carYear}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-inter font-semibold mb-2">Current Kilometers</label>
                        <input type="number" name="currentKm" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g., 45000"/>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" onClick={nextStep} className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300">
                        Continue to Schedule
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              )}
              {currentStep === 2 && (
                <AnimatedSection>
                  <div className="bg-light rounded-2xl p-8">
                     <h2 className="text-3xl font-urbanist font-bold text-secondary mb-6">Schedule & <span className="text-primary">Contact</span></h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-6">
                        <h3 className="font-poppins font-bold text-secondary text-xl mb-4">Your Information</h3>
                        <div>
                          <label className="block text-gray-700 font-inter font-semibold mb-2">Full Name *</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="Enter your full name"/>
                          {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-inter font-semibold mb-2">Phone Number *</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`} placeholder="10-digit number"/>
                          {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-inter font-semibold mb-2">Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="your.email@example.com"/>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h3 className="font-poppins font-bold text-secondary text-xl mb-4">Preferred Schedule</h3>
                        <div>
                          <label className="block text-gray-700 font-inter font-semibold mb-2">Preferred Date *</label>
                          <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={`w-full px-4 py-3 rounded-xl border ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}/>
                          {errors.preferredDate && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.preferredDate}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-inter font-semibold mb-2">Preferred Time *</label>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                              <button key={time} type="button" onClick={() => { setFormData({ ...formData, preferredTime: time }); setErrors(prev => ({...prev, preferredTime: null})); }} className={`py-2 px-3 rounded-lg border transition-all duration-300 ${formData.preferredTime === time ? 'bg-primary border-primary text-white' : 'border-gray-300 text-gray-700 hover:border-primary'}`}>
                                {time}
                              </button>
                            ))}
                          </div>
                          {errors.preferredTime && <p className="text-red-500 text-sm mt-1 flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-2"/>{errors.preferredTime}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                        <label className="block text-gray-700 font-inter font-semibold mb-2">Additional Notes</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Any specific issues or requirements..."></textarea>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button type="button" onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-xl transition-all duration-300">Back</button>
                      <button type="submit" className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300">Confirm Appointment</button>
                    </div>
                  </div>
                </AnimatedSection>
              )}
              {currentStep === 3 && (
                <AnimatedSection>
                  <div className="bg-light rounded-2xl p-12 text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-white text-3xl" />
                    </div>
                    <h2 className="text-3xl font-urbanist font-bold text-secondary mb-4">Appointment Confirmed!</h2>
                    <p className="text-gray-600 font-inter text-lg mb-8 max-w-md mx-auto">
                      Thank you for booking with Khokhar Motors. Our team will contact you shortly to confirm your slot.
                      <br/>
                      <strong className="mt-4 block">You will be redirected to the homepage in 5 seconds...</strong>
                    </p>
                    <div className="bg-white rounded-xl p-6 max-w-md mx-auto mb-8">
                      <h3 className="font-poppins font-bold text-secondary mb-4">Appointment Details</h3>
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-semibold">{formData.serviceType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vehicle:</span>
                          <span className="font-semibold">{formData.carBrand} {formData.carModel} ({formData.carYear})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-semibold">{formData.preferredDate} at {formData.preferredTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-300">
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-secondary to-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-urbanist font-bold mb-6">Why Book With <span className="text-primary">Khokhar Motors</span>?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={100}><div className="text-center"><FontAwesomeIcon icon={faClock} className="text-accent text-4xl mb-4" /><h3 className="font-poppins font-bold text-xl mb-3">Quick Service</h3><p className="font-inter text-gray-300">Most services completed within 4-6 hours with our efficient workflow.</p></div></AnimatedSection>
            <AnimatedSection delay={200}><div className="text-center"><FontAwesomeIcon icon={faShieldAlt} className="text-accent text-4xl mb-4" /><h3 className="font-poppins font-bold text-xl mb-3">6-Month Warranty</h3><p className="font-inter text-gray-300">All services and parts come with a comprehensive 6-month warranty.</p></div></AnimatedSection>
            <AnimatedSection delay={300}><div className="text-center"><FontAwesomeIcon icon={faUser} className="text-accent text-4xl mb-4" /><h3 className="font-poppins font-bold text-xl mb-3">Expert Mechanics</h3><p className="font-inter text-gray-300">Certified technicians with 15+ years of experience in automotive repair.</p></div></AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointmentPage;
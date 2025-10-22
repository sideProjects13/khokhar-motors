import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAward, 
  faUsers, 
  faCar, 
  faShieldAlt,
  faHeart,
  faArrowRight,
  faPlay,
  faCheckCircle,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SEO from '../components/SEO';

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

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Rajesh Khokhar",
      position: "Founder & Head Mechanic",
      experience: "15+ Years",
      specialty: "Engine Specialist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
      description: "With over 15 years in automotive repair, Rajesh leads our team with expertise and passion."
    },
    {
      name: "Priya Sharma",
      position: "Service Manager",
      experience: "8+ Years",
      specialty: "Customer Relations",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1887&auto=format&fit=crop",
      description: "Priya ensures every customer receives exceptional service and clear communication."
    },
    {
      name: "Amit Patel",
      position: "Senior Technician",
      experience: "12+ Years",
      specialty: "Electrical Systems",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
      description: "Amit specializes in complex electrical and diagnostic repairs with precision."
    }
  ];

  const milestones = [
    { year: "2008", event: "Founded Khokhar Motors in Ahmedabad" },
    { year: "2012", event: "Expanded to full-service automotive center" },
    { year: "2015", event: "Introduced computerized diagnostics" },
    { year: "2018", event: "Achieved 1000+ satisfied customers" },
    { year: "2021", event: "Launched mobile servicing unit" },
    { year: "2023", event: "5000+ cars serviced milestone" }
  ];

  return (
    <div className="min-h-screen bg-light">
      <SEO 
        title="About Khokhar Motors - Ahmedabad's Trusted Car Service Center"
        description="Learn about Khokhar Motors' 15+ years of excellence in car service and repair in Ahmedabad. Meet our expert team and discover our commitment to quality."
        keywords="about khokhar motors, car service history ahmedabad, expert mechanics ahmedabad, automotive repair team"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-7xl font-urbanist font-black mb-6 leading-tight">
                Driven by <span className="text-primary">Excellence</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="text-xl md:text-2xl font-inter text-gray-300 mb-8 leading-relaxed">
                For over 15 years, Khokhar Motors has been Ahmedabad's trusted partner for premium automotive care, 
                combining traditional craftsmanship with modern technology.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/contact" 
                  className="bg-primary hover:bg-red-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                >
                  Visit Our Center
                  <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
                </Link>
                <button className="border-2 border-white/30 hover:border-accent text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 hover:bg-accent/10 flex items-center">
                  <FontAwesomeIcon icon={faPlay} className="mr-3" />
                  Our Story
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1603712610496-5362a2c93c90?q=80&w=2069&auto=format&fit=crop" 
                  alt="Khokhar Motors workshop in Ahmedabad"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-2xl shadow-2xl">
                  <div className="text-3xl font-urbanist font-black">15+</div>
                  <div className="font-inter">Years Experience</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="inline-block bg-primary/10 text-primary font-inter font-semibold px-6 py-2 rounded-full mb-4">
                OUR MISSION
              </div>
              <h2 className="text-4xl md:text-5xl font-urbanist font-bold text-secondary mb-6">
                Redefining Car Service in <span className="text-primary">Ahmedabad</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faHeart} className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-secondary text-lg mb-2">Our Passion</h3>
                    <p className="font-inter text-gray-600">
                      We're passionate about keeping Ahmedabad's vehicles running smoothly and safely. 
                      Every car we service receives the same care and attention we'd give our own.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-secondary text-lg mb-2">Our Promise</h3>
                    <p className="font-inter text-gray-600">
                      Transparent pricing, genuine parts, and workmanship backed by a 6-month warranty. 
                      Your trust is our most valuable asset.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon icon={faUsers} className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-poppins font-bold text-secondary text-lg mb-2">Our Community</h3>
                    <p className="font-inter text-gray-600">
                      As a local Ahmedabad business, we're committed to serving our community with 
                      reliable, affordable, and professional automotive care.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <AnimatedSection>
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-urbanist font-black text-accent mb-2">5000+</div>
                <div className="font-inter text-gray-300">Cars Serviced</div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-urbanist font-black text-accent mb-2">98%</div>
                <div className="font-inter text-gray-300">Satisfaction Rate</div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-urbanist font-black text-accent mb-2">15+</div>
                <div className="font-inter text-gray-300">Years Experience</div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-urbanist font-black text-accent mb-2">24/7</div>
                <div className="font-inter text-gray-300">Roadside Support</div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      
      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary font-inter font-semibold px-6 py-2 rounded-full mb-4">
              OUR JOURNEY
            </div>
            <h2 className="text-4xl md:text-5xl font-urbanist font-bold text-secondary mb-6">
              Years of <span className="text-primary">Excellence</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>
              
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-2xl font-urbanist font-black text-primary mb-2">
                          {milestone.year}
                        </div>
                        <p className="font-inter text-gray-700">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-urbanist font-black mb-6">
              Ready to Experience the <span className="text-accent">Khokhar Motors</span> Difference?
            </h2>
            <p className="text-xl font-inter text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers in Ahmedabad who trust us with their vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/appointment" 
                className="bg-accent hover:bg-amber-500 text-dark font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                Book Your Service
                <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white/30 hover:border-white text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 hover:bg-white/10 flex items-center"
              >
                Visit Our Center
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
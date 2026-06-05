import React from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconUsers, IconTrophy, IconClock, IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook } from '@tabler/icons-react';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-primary bg-gradient text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">About Our Company</h1>
              <p className="lead mb-4">
                We are on a mission to revolutionize the investment landscape, 
                making it accessible, transparent, and profitable for everyone.
              </p>
              <Link to="/contact" className="btn btn-light btn-lg px-4">
                Get In Touch
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://cdn.pixabay.com/photo/2021/08/03/06/04/cryptocurrency-6518268_640.png"
                alt="About Us"
                className="img-fluid"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Our Story"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-lg-6">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3">Our Story</span>
              <h2 className="display-5 fw-bold mb-4">Building Trust Since 2020</h2>
              <p className="lead mb-3">
                Started with a vision to democratize investment opportunities, 
                we've grown into a trusted platform serving thousands of investors worldwide.
              </p>
              <p className="text-muted mb-4">
                Our journey began when we realized that traditional investment methods 
                were excluding millions of potential investors. We created a platform 
                that combines cutting-edge technology with user-friendly design to 
                make investing accessible to everyone.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <IconCheck size={20} className="text-success" />
                    <span>Licensed & Regulated</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <IconCheck size={20} className="text-success" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <IconCheck size={20} className="text-success" />
                    <span>Secure Transactions</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <IconCheck size={20} className="text-success" />
                    <span>Global Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-block">
                    <IconTrophy size={32} className="text-primary" />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Our Mission</h3>
                  <p className="text-muted mb-0">
                    To empower individuals worldwide with accessible, transparent, 
                    and profitable investment opportunities, helping them achieve 
                    financial freedom and security.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-block">
                    <IconUsers size={32} className="text-primary" />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Our Vision</h3>
                  <p className="text-muted mb-0">
                    To become the world's most trusted and innovative investment 
                    platform, creating wealth opportunities for millions across the globe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="display-3 fw-bold text-primary">50K+</div>
              <p className="text-muted mb-0">Active Investors</p>
            </div>
            <div className="col-md-3 col-6">
              <div className="display-3 fw-bold text-primary">$100M+</div>
              <p className="text-muted mb-0">Total Investment</p>
            </div>
            <div className="col-md-3 col-6">
              <div className="display-3 fw-bold text-primary">150+</div>
              <p className="text-muted mb-0">Countries</p>
            </div>
            <div className="col-md-3 col-6">
              <div className="display-3 fw-bold text-primary">98%</div>
              <p className="text-muted mb-0">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3">
              Core Values
            </span>
            <h2 className="display-5 fw-bold">What Drives Us</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Our principles guide everything we do
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <IconClock size={32} className="text-primary" />
                  </div>
                  <h5 className="fw-bold mb-3">Transparency</h5>
                  <p className="text-muted">
                    We believe in complete transparency in all our operations and communications.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <IconTrophy size={32} className="text-primary" />
                  </div>
                  <h5 className="fw-bold mb-3">Innovation</h5>
                  <p className="text-muted">
                    Constantly evolving and adapting to provide the best solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <IconUsers size={32} className="text-primary" />
                  </div>
                  <h5 className="fw-bold mb-3">Trust</h5>
                  <p className="text-muted">
                    Building lasting relationships through reliability and integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3">
              Leadership Team
            </span>
            <h2 className="display-5 fw-bold">Meet Our Leaders</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Experts dedicated to your financial success
            </p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  className="card-img-top"
                  alt="Team Member"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold mb-1">John Anderson</h5>
                  <p className="text-primary mb-3">CEO & Founder</p>
                  <div className="d-flex justify-content-center gap-2">
                    <a href="#" className="btn btn-sm btn-outline-primary rounded-circle p-2">
                      <IconBrandTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-primary rounded-circle p-2">
                      <IconBrandLinkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  className="card-img-top"
                  alt="Team Member"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold mb-1">Sarah Johnson</h5>
                  <p className="text-primary mb-3">CTO</p>
                  <div className="d-flex justify-content-center gap-2">
                    <a href="#" className="btn btn-sm btn-outline-primary rounded-circle p-2">
                      <IconBrandTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-primary rounded-circle p-2">
                      <IconBrandLinkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm">
                <img 
                  src="https://randomuser.me/api/portraits/men/3.jpg"
                  className="card-img-top"
                  alt="Team Member"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold mb-1">Michael Chen</h5>
                  <p className="text-primary mb-3">Head of Investments</p>
                  <div className="d-flex justify-content-center gap-2">
                    <a href="#" className="btn btn-sm btn-outline-primary rounded-circle p-2">
                      <IconBrandTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-primary rounded-circle p-2">
                      <IconBrandLinkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="lead mb-4">
                Join thousands of successful investors and start earning today
              </p>
              <Link to="/signup" className="btn btn-light btn-lg px-4 me-2">
                Get Started Now
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
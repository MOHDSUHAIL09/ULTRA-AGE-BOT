import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll animation
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-animation">
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          <div className="bg-shape shape-3"></div>
          <div className="bg-shape shape-4"></div>
        </div>

        <div className="px-5">
          <div className="hero-grid">
            <div className={`hero-content ${isVisible ? 'fade-in-up' : ''}`}>

              <h1 className="hero-title">
                Grow Your Wealth With
                <span className="gradient-text"> Smart Investment</span>
              </h1>

              <p className="hero-description">
                Join thousands of successful investors who are building their financial 
                future with our AI-powered investment platform. Start with as little as $100 
                and watch your money grow with guaranteed returns.
              </p>

              <div className="hero-stats">
                <div className="stat-card">
                  <div className="stat-number">$2.5B+</div>
                  <div className="stat-label">Assets Managed</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-card">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Active Investors</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-card">
                  <div className="stat-number">24.5%</div>
                  <div className="stat-label">Average Return</div>
                </div>
              </div>

              <div className="hero-buttons">
                <Link to="/signup" className="btn-primary">
                  Get Started Now
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn More
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>

              <div className="hero-trust">
                <div className="trust-badges">
                  <span className="trust-badge">✓ SEC Registered</span>
                  <span className="trust-badge">✓ Insured</span>
                  <span className="trust-badge">✓ 24/7 Support</span>
                </div>
              </div>
            </div>

            <div className={`hero-visual ${isVisible ? 'fade-in-up-delayed' : ''}`}>
              <div className="dashboard-preview">
                <div className="dashboard-card main-card">
                  <div className="card-header">
                    <div className="card-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="card-title">Portfolio Overview</div>
                  </div>
                  <div className="card-content">
                    <div className="chart-line">
                      <svg viewBox="0 0 300 100">
                        <path d="M0,80 L50,70 L100,40 L150,50 L200,20 L250,30 L300,10" 
                              stroke="#04832f" strokeWidth="3" fill="none" 
                              strokeLinecap="round" strokeDasharray="400" 
                              strokeDashoffset="400">
                          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" fill="freeze"/>
                        </path>
                      </svg>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-value">+24.5%</span>
                        <span className="stat-name">This Month</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">$12,450</span>
                        <span className="stat-name">Total Return</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="floating-card crypto-card">
                  <div className="crypto-icon">₿</div>
                  <div className="crypto-info">
                    <div className="crypto-name">Bitcoin</div>
                    <div className="crypto-price">$43,250</div>
                    <div className="crypto-change positive">+8.2%</div>
                  </div>
                </div>

                <div className="floating-card stock-card">
                  <div className="stock-icon">📈</div>
                  <div className="stock-info">
                    <div className="stock-name">S&P 500</div>
                    <div className="stock-price">$4,782</div>
                    <div className="stock-change positive">+1.4%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header scroll-animate">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">Amazing <span className="gradient-text">Features</span></h2>
            <p className="section-subtitle">We provide the best investment experience with cutting-edge technology</p>
          </div>

          <div className="features-grid">
            <div className="feature-card scroll-animate">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>Bank-level security with 256-bit encryption to protect your investments</p>
            </div>
            <div className="feature-card scroll-animate">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Track your portfolio performance with advanced analytics and insights</p>
            </div>
            <div className="feature-card scroll-animate">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Smart algorithms optimize your investments for maximum returns</p>
            </div>
            <div className="feature-card scroll-animate">
              <div className="feature-icon">💎</div>
              <h3>Low Fees</h3>
              <p>Competitive fees with no hidden charges, transparent pricing</p>
            </div>
            <div className="feature-card scroll-animate">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Manage your investments anytime, anywhere with our mobile app</p>
            </div>
            <div className="feature-card scroll-animate">
              <div className="feature-icon">🎯</div>
              <h3>Expert Support</h3>
              <p>24/7 customer support from investment experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header scroll-animate">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Get started in just 3 easy steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card scroll-animate">
              <div className="step-number">01</div>
              <div className="step-icon">📝</div>
              <h3>Create Account</h3>
              <p>Sign up for free and complete your profile in minutes</p>
            </div>
            <div className="step-card scroll-animate">
              <div className="step-number">02</div>
              <div className="step-icon">💰</div>
              <h3>Deposit Funds</h3>
              <p>Add funds to your account using secure payment methods</p>
            </div>
            <div className="step-card scroll-animate">
              <div className="step-number">03</div>
              <div className="step-icon">📈</div>
              <h3>Start Earning</h3>
              <p>Watch your money grow with daily returns and withdrawals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-counter">
        <div className="container">
          <div className="stats-wrapper">
            <div className="stat-item scroll-animate">
              <div className="counter-number">50K+</div>
              <div className="counter-label">Happy Investors</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item scroll-animate">
              <div className="counter-number">$100M+</div>
              <div className="counter-label">Total Invested</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item scroll-animate">
              <div className="counter-number">150+</div>
              <div className="counter-label">Countries</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item scroll-animate">
              <div className="counter-number">98%</div>
              <div className="counter-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-wrapper scroll-animate">
            <h2>Ready to Start Your Investment Journey?</h2>
            <p>Join thousands of successful investors and start earning today</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-cta-primary">
                Get Started Now
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link to="/contact" className="btn-cta-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
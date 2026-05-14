
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-primary bg-gradient text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Home</h1>
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
    </div>
  );
};

export default AboutPage;
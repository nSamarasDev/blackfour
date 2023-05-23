import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Landing = props => {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 426);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 426);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
    <section className="landing" style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Random Layout</h1>
            <p className="lead">
              Connect with like minds and share the experience
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary landing-btn">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light landing-btn">
                Login
              </Link>
              <Link to="/contact" className="btn btn-primary landing-btn">
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
  )
}


export default Landing

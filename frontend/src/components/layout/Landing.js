import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';



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

  const handleDownload = () => {
    axios({
      url: '/api/book', // Replace with your backend endpoint for downloading the book
      method: 'GET',
      responseType: 'blob', // Set the response type to 'blob' for binary data
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'mevlana.pdf'); // Specify the filename for the downloaded file
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Error downloading the book:', error);
      });
  };
  return (
    <div style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
    <section className="landing" style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
        <div className="dark-overlay">
          <div className="landing-inner">     <p className="lead">
              Connect with like minds and share the experience
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-dark landing-btn ">
                Sign Up
              </Link>
              <Link to='/' className="btn btn-dark landing-btn" onClick={handleDownload}>
                Download the book
              </Link>
              <Link to="/login" className="btn btn-dark landing-btn">
                Login
              </Link>
              <Link to="/contact" className="btn btn-dark landing-btn">
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

import React from 'react';
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <p className='footer-text'>© 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    minHeight: '40px',
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderTop: '1px solid #ccc',
    marginTop: 'auto', // Push the footer to the bottom
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  text: {
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
    margin: 0,
  },
};

export default Footer;


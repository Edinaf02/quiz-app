import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Edinaf. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

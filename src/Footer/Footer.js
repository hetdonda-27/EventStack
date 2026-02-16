import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">

        {/* Column 1 - Branding */}
        <div>
          <h2 className="text-xl font-bold mb-4">EventStack</h2>  
          <p className="text-gray-400">
            Your ultimate platform for exploring and tracking university events all in one place.
          </p>
        </div>

        {/* Column 2 - Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/het-donda-a51525312/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <FaFacebook /> Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <a href="mailto:EventStack@gmail.com" className="text-gray-400 mb-2">EventStack@gmail.com</a>
          <p className="text-gray-400 mt-2 mb-2">Gujarat, Surat, India</p>
          <a href="tel:+919727680155" className="mt-3 text-gray-400">+91 97276 80155
           </a>
        </div>

        {/* Column 4 - Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Academic</li>
            <li>Sports</li>
            <li>Arts & Culture</li>
            <li>Career</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xm">
        © {new Date().getFullYear()} EventStack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
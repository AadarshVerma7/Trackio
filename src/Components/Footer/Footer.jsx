import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';
import Logo from "../../assets/favIconPNG_Black.png";
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#f1e0c5] border-t-2 border-black backdrop-blur-lg mt-16 text-black py-4 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Company Info & Social Media */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <a href="#">
            <img src={Logo} alt="Company Logo" className="h-10 mb-4" />
          </a>
          <p className="text-sm max-w-[250px] mb-4">
            Compete, grow, learn
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="#" aria-label="X" className="transition-colors">
              <FaXTwitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-lg mb-4 text-black">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:font-semibold transition-all duration-200">Home</a></li>
            <li><a href="#" className="hover:font-semibold transition-all duration-200">About Us</a></li>
            <li><a href="#" className="hover:font-semibold transition-all duration-200">Groups</a></li>
            <li><a href="#" className="hover:font-semibold transition-all duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-lg mb-4 text-black">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:font-semibold transition-all duration-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:font-semibold transition-all duration-200">Terms of Service</a></li>
            <li><a href="#" className="hover:font-semibold transition-all duration-200">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-lg mb-4 text-black">Contact</h4>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:info@trackio.com" className="hover:font-semibold transition-all duration-200">info@trackio.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:font-semibold transition-all duration-200">+91 9779935714</a></li>
            <li>Address: #2147 Green St. -Dhakoli</li>
          </ul>
        </div>

      </div>

      <div className="mt-8 pt-2 border-t border-neutral-700 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Your Website. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

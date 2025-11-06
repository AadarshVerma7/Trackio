import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../assets/favIconPNG.png";

const Footer = ({ theme }) => {
  const isDark = theme === "dark";

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#f1e0c5]",
    secondary: isDark ? "bg-[#364153]" : "bg-[#95775A]",
    border: isDark ? "border-white/20" : "border-black/30",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    icon: isDark ? "text-white hover:text-[#FFB347]" : "text-gray-800 hover:text-[#7E664D]",
    divider: isDark ? "border-gray-600" : "border-neutral-400",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  return (
    <footer
      className={`${colors.primary} ${colors.border} border-t-2 backdrop-blur-lg mt-16 py-8 px-6 transition-colors duration-300 ${colors.shadow}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info & Social Media */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <a href="#">
            <img
              src={Logo}
              alt="Trackio Logo"
              className="h-10 mb-4 transition-transform hover:scale-105"
            />
          </a>
          <p className={`text-sm max-w-[250px] mb-4 ${colors.textSecondary}`}>
            Compete, grow, learn.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className={`${colors.icon} transition-colors`}>
              <FaFacebook size={22} />
            </a>
            <a href="#" aria-label="X" className={`${colors.icon} transition-colors`}>
              <FaXTwitter size={22} />
            </a>
            <a href="#" aria-label="Instagram" className={`${colors.icon} transition-colors`}>
              <FaInstagram size={22} />
            </a>
            <a href="#" aria-label="LinkedIn" className={`${colors.icon} transition-colors`}>
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center sm:text-left">
          <h4 className={`font-bold text-lg mb-4 ${colors.textPrimary}`}>Quick Links</h4>
          <ul className={`space-y-2 ${colors.textSecondary}`}>
            {["Home", "About Us", "Groups", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:font-semibold transition-all duration-200 hover:text-[#95775A]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div className="text-center sm:text-left">
          <h4 className={`font-bold text-lg mb-4 ${colors.textPrimary}`}>Legal</h4>
          <ul className={`space-y-2 ${colors.textSecondary}`}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:font-semibold transition-all duration-200 hover:text-[#95775A]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h4 className={`font-bold text-lg mb-4 ${colors.textPrimary}`}>Contact</h4>
          <ul className={`space-y-2 ${colors.textSecondary}`}>
            <li>
              Email:{" "}
              <a
                href="mailto:info@trackio.com"
                className="hover:font-semibold hover:text-[#95775A] transition-all duration-200"
              >
                info@trackio.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+919779935714"
                className="hover:font-semibold hover:text-[#95775A] transition-all duration-200"
              >
                +91 9779935714
              </a>
            </li>
            <li>Address: #2147 Green St., Dhakoli</li>
          </ul>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div
        className={`mt-8 pt-3 border-t ${colors.divider} text-center text-sm ${colors.textSecondary}`}
      >
        &copy; {new Date().getFullYear()} Trackio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

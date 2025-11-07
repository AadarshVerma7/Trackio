import React, { useState, useRef } from "react";
import Footer from "../../Components/Footer/Footer";

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    // Refs for inputs
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const formRef = useRef(null);

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s'-]+$/;

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        else if (!nameRegex.test(formData.firstName)) newErrors.firstName = "Invalid characters";

        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        else if (!nameRegex.test(formData.lastName)) newErrors.lastName = "Invalid characters";

        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";

        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
        else if (formData.message.trim().length < 10)
            newErrors.message = "Message must be at least 10 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Message sent successfully!");
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
            setErrors({});
        } else {
            focusFirstError();
        }
    };

    // 👉 Function to focus on the first empty field
    const focusFirstEmpty = () => {
        if (!formData.firstName.trim()) return firstNameRef.current.focus();
        if (!formData.lastName.trim()) return lastNameRef.current.focus();
        if (!formData.email.trim()) return emailRef.current.focus();
        if (!formData.message.trim()) return messageRef.current.focus();
    };

    // 👉 Function to focus on the first error if validation fails
    const focusFirstError = () => {
        if (errors.firstName) return firstNameRef.current.focus();
        if (errors.lastName) return lastNameRef.current.focus();
        if (errors.email) return emailRef.current.focus();
        if (errors.message) return messageRef.current.focus();
    };

    const handleEnterDetailsClick = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => focusFirstEmpty(), 400);
    };

    const primaryColor = "cyan-700";
    const primaryColorHover = "cyan-800";
    const primaryColorRing = "cyan-400";
    const textColorOnDark = "gray-100";
    const subduedTextColorOnDark = "cyan-200";

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch min-h-screen p-8 md:p-16 lg:p-24">
                <div className="flex flex-col md:flex-row max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
                    {/* Left Section */}
                    <div
                        className={`md:w-1/2 p-10 md:p-12 lg:p-16 bg-[#5e5348] text-white flex flex-col justify-center space-y-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none`}
                    >
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold leading-snug text-white">
                                Get in touch
                                <span
                                    className={`inline-block w-16 h-1 bg-${primaryColorRing} ml-2 align-middle`}
                                ></span>
                            </h1>
                        </div>

                        <p className={`text-${textColorOnDark} leading-relaxed max-w-md text-lg`}>
                            We're here to help! Reach out to us with any questions, assistance needs,
                            or feedback you may have.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div>
                                <p
                                    className={`text-${subduedTextColorOnDark} uppercase tracking-wider text-sm`}
                                >
                                    Email Address
                                </p>
                                <h2 className="text-xl font-semibold text-white">
                                    info@trackio.com
                                </h2>
                            </div>

                            <div>
                                <p
                                    className={`text-${subduedTextColorOnDark} uppercase tracking-wider text-sm`}
                                >
                                    Phone Number
                                </p>
                                <h2 className="text-xl font-semibold text-white">
                                    +91 9779935714
                                </h2>
                                <p className={`text-${subduedTextColorOnDark} text-sm`}>
                                    Available Mon - Fri, 9 AM - 6 PM GMT
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleEnterDetailsClick}
                            className={`bg-white text-slate-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 self-start hover:bg-gray-100 transition-all duration-300 shadow-lg active:scale-95 active:brightness-90 active:bg-black active:text-white `}
                        >
                            Enter Your Details  
                            <span className="text-xl">→</span>
                        </button>
                    </div>

                    {/* Right Section (Form) */}
                    <div
                        ref={formRef}
                        className="md:w-1/2 p-10 md:p-12 lg:p-16 bg-white flex items-center"
                    >
                        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Send us a Message
                            </h2>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-1/2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        ref={firstNameRef}
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className={`w-full border rounded-xl p-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 ${
                                            errors.firstName
                                                ? "border-red-500 focus:ring-red-400"
                                                : `border-gray-300 focus:border-transparent focus:ring-${primaryColorRing}`
                                        }`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        ref={lastNameRef}
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className={`w-full border rounded-xl p-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 ${
                                            errors.lastName
                                                ? "border-red-500 focus:ring-red-400"
                                                : `border-gray-300 focus:border-transparent focus:ring-${primaryColorRing}`
                                        }`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={`w-full border rounded-xl p-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 ${
                                        errors.email
                                            ? "border-red-500 focus:ring-red-400"
                                            : `border-gray-300 focus:border-transparent focus:ring-${primaryColorRing}`
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    How can we help you?
                                </label>
                                <textarea
                                    ref={messageRef}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message in detail..."
                                    rows="5"
                                    className={`w-full border rounded-xl p-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 ${
                                        errors.message
                                            ? "border-red-500 focus:ring-red-400"
                                            : `border-gray-300 focus:border-transparent focus:ring-${primaryColorRing}`
                                    }`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    className={`bg-${primaryColor} text-black px-8 py-3 border-2 border-black rounded-xl font-semibold flex items-center gap-2 hover:bg-${primaryColorHover} transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-${primaryColorRing} focus:ring-opacity-50 active:scale-95`}
                                >
                                    Send Message <span className="text-lg">→</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
export const ContactUs = ({ theme }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const isDark = theme === "dark";

  // Unified theme colors
  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#5e5348]",
    secondary: isDark ? "bg-[#364153]" : "bg-white",
    accent: isDark ? "bg-[#364153]" : "bg-[#da966f]",
    textPrimary: isDark ? "text-white" : "text-black",
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    border: isDark ? "border-white/20" : "border-black/20",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
    ring: isDark ? "focus:ring-[#FFB347]" : "focus:ring-[#5e5348]",
    button: isDark ? "bg-[#364153]" : "bg-white",
    buttonHover: isDark ? "hover:bg-[#46546e]" : "hover:bg-gray-100",
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    else if (!nameRegex.test(formData.firstName))
      newErrors.firstName = "Invalid characters";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(formData.lastName))
      newErrors.lastName = "Invalid characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.message.trim())
      newErrors.message = "Message cannot be empty";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div className={` min-h-screen transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch min-h-screen p-8 md:p-16 lg:p-24">
        {/* Container */}
        <div
          className={`flex flex-col md:flex-row max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl ${colors.shadow}`}
        >
          {/* Left Section */}
          <div
            className={`md:w-1/2 p-10 md:p-12 lg:p-16 ${colors.primary} text-white flex flex-col justify-center space-y-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none transition-colors duration-300`}
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-snug text-white">
                Get in touch
              </h1>
              <div className="w-20 h-1 bg-white mt-2 rounded"></div>
            </div>

            <p className="text-lg leading-relaxed max-w-md">
              We're here to help! Reach out to us with any questions, assistance
              needs, or feedback you may have.
            </p>

            <div className="space-y-4 pt-4">
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-300">
                  Email Address
                </p>
                <h2 className="text-xl font-semibold text-white">
                  info@trackio.com
                </h2>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-gray-300">
                  Phone Number
                </p>
                <h2 className="text-xl font-semibold text-white">
                  +91 9779935714
                </h2>
                <p className="text-sm text-gray-300">
                  Available Mon - Fri, 9 AM - 6 PM GMT
                </p>
              </div>
            </div>

            <button className="bg-white text-[#5e5348] px-8 py-3 rounded-full font-semibold flex items-center gap-2 self-start hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Enter Your Details <span className="text-xl">→</span>
            </button>
          </div>

          {/* Right Section (Form) */}
          <div
            className={`md:w-1/2 p-10 md:p-12 lg:p-16 ${colors.secondary} flex items-center transition-colors duration-300`}
          >
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              <h2
                className={`text-3xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Send us a Message
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* First Name */}
                <div className="w-full sm:w-1/2">
                  <label className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full border rounded-xl p-3 ${isDark ? "bg-[#272F40]" : "bg-white"} ${colors.textPrimary} transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-400"
                        : colors.ring
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="w-full sm:w-1/2">
                  <label className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`w-full border rounded-xl p-3 ${isDark ? "bg-[#272F40]" : "bg-white"} ${colors.textPrimary} transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-400"
                        : colors.ring
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full border rounded-xl p-3 ${isDark ? "bg-[#272F40]" : "bg-white"} ${colors.textPrimary} transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : colors.ring
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}>
                  How can we help you?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message in detail..."
                  rows="5"
                  className={`w-full border rounded-xl p-3 ${isDark ? "bg-[#272F40]" : "bg-white"} ${colors.textPrimary} transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-400"
                      : colors.ring
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className={`${colors.button} ${colors.textPrimary} px-8 py-3 border-2 border-black rounded-xl font-semibold flex items-center gap-2 ${colors.buttonHover} transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 ${colors.ring}`}
                >
                  Send Message <span className="text-lg">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
    );
      </div>

      <Footer theme={theme} />
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const projectTypes = [
    'Commission Artwork',
    'Gallery Exhibition',
    'Speed Painting Live Performance',
    'Commercial Project',
    'Portrait Session',
    'Consultation',
    'Other'
  ];

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = 'Enter a valid name';
    }
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.projectType) {
      newErrors.projectType = 'Select a project type';
    }
    if (formData.message.trim().length < 20) {
      newErrors.message = 'Minimum 20 characters required';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const form = formRef.current;

    fetch('https://formspree.io/f/xwpbwloq', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new FormData(form),
    })
      .then((res) => res.json())
      .then(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', projectType: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch((err) => {
        console.error('Submission error:', err);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-amber-600 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="inline-block uppercase text-amber-400 text-sm font-bold tracking-widest px-6 py-2 border border-amber-400/40 rounded-full bg-amber-500/10 mb-5">
  Let’s Connect
</span>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-wide mt-6 mb-4">
            Share Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
              Vision
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Every creative journey starts with a message. Let’s make yours count.
          </p>
        </div>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
            <p className="text-amber-400 font-medium">
              Thank you! I’ll be in touch shortly.
            </p>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900/50 border border-gray-800 p-8 rounded-xl shadow-2xl"
          method="POST"
          action="https://formspree.io/f/xwpbwloq"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Your name"
                required
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full p-4 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Project Type */}
          <div>
  <label className="block text-sm font-medium text-gray-300 mb-2">
    Project Type *
  </label>
  <div className="relative">
    <select
      name="projectType"
      value={formData.projectType}
      onChange={handleChange}
      className="w-full appearance-none p-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none pr-10"
      required
    >
      <option value="">Select project type</option>
      {projectTypes.map((type) => (
        <option
          key={type}
          value={type}
          className="text-gray-900 bg-white"
        >
          {type}
        </option>
      ))}
    </select>
    {/* Custom amber dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
      <svg
        className="w-4 h-4 text-amber-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
      </svg>
    </div>
  </div>
  {errors.projectType && (
    <p className="text-sm text-red-400 mt-1">{errors.projectType}</p>
  )}
</div>


          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Details *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your project idea, goals, and timeline..."
              className="w-full p-4 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-vertical"
              required
            />
            {errors.message && (
              <p className="text-sm text-red-400 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold rounded-lg shadow-lg hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-600/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

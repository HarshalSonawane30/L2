import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import './Login.css'; // Reusing the same styles from Login

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.fromNavbar && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = { name: formData.name, email: formData.email, password: formData.password };
    fetch(`${API_URL}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        if (status >= 400) {
          setErrors({ form: body?.message || 'Signup failed' });
          return;
        }
        navigate('/login', { state: { registered: true } });
      })
      .catch((err) => setErrors({ form: err.message || 'Network error' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const togglePasswordVisibility = (field) => setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
    <>
      <div className="auth-top-sticky">
        <div className="sticky-inner">
          <div className="app-name-small">Learn and Let Learn</div>
          <div className="page-title">Join Our Community</div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-inner">
            {/* Left side - branding / illustration */}
            <div className="auth-side">
              <div className="app-branding">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="auth-logo-large"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/120x120?text=Logo';
                  }}
                />
                <h1 className="app-name">Learn and Let Learn</h1>
                <p className="app-tagline">Connect • Share • Grow</p>
              </div>
              <div className="auth-side-illustration" aria-hidden={true}>
                <img src="https://cdn-icons-png.flaticon.com/512/3593/3593264.png" alt="" />
              </div>
              <div className="auth-side-text">
                <h2>Join a community of learners</h2>
                <p>Share projects, find mentors, and grow together with focused learning paths and friendly peers.</p>
              </div>
            </div>

            {/* Right side - form */}
            <div className="auth-form-wrap">
              <div className="auth-header">
                <h1 className="auth-title">Join Our Community</h1>
                <p className="auth-subtitle">Create your account to get started</p>
                <div className="auth-existing-account">
                  <p>Already have an account?</p>
                  <Link to="/login" className="auth-switch-btn">
                    Sign In Here
                  </Link>
                </div>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {errors.form && <div className="form-error">{errors.form}</div>}

                <div className="form-group">
                  <input
                    ref={nameInputRef}
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    autoComplete="name"
                  />
                  <label className="form-label">
                    <FaUser /> Full Name
                  </label>
                  {errors.name && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    autoComplete="email"
                  />
                  <label className="form-label">
                    <FaEnvelope /> Email Address
                  </label>
                  {errors.email && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type={showPassword.password ? 'text' : 'password'}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    autoComplete="new-password"
                  />
                  <label className="form-label">
                    <FaLock /> Password
                  </label>
                  <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('password')}>
                    {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.password}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder=" "
                    autoComplete="new-password"
                  />
                  <label className="form-label">
                    <FaLock /> Confirm Password
                  </label>
                  <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('confirmPassword')}>
                    {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmPassword && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button type="submit" className="submit-btn">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
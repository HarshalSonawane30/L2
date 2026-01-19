import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const location = useLocation();
  // Show a one-time message when redirected from signup
  const registered = location?.state?.registered;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Check for test credentials
      if (formData.email === 'test@test.com' && formData.password === 'test123') {
        // Test login - bypass backend
        const testUser = {
          id: 'test-user-123',
          name: 'Test User',
          email: 'test@test.com'
        };
        localStorage.setItem('token', 'test-token-123');
        localStorage.setItem('user', JSON.stringify(testUser));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home#posts');
        return;
      }
      
      // Perform login request to backend
      fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
          if (status >= 400) {
            const msg = body?.message || 'Login failed';
            setErrors({ form: msg });
            return;
          }
          const { token, user } = body;
          // Persist token and user for session
          if (token) localStorage.setItem('token', token);
          if (user) localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isAuthenticated', 'true');
          // After login, go to home and jump to posts feed
          navigate('/home#posts');
        })
        .catch(err => {
          setErrors({ form: err.message || 'Network error' });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="app-branding">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="auth-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/80x80?text=Logo';
              }}
            />
            <h1 className="app-name">Learn & Let Learn</h1>
            <p className="app-tagline">Connect • Share • Grow</p>
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        {registered && (
          <div className="form-success">Signup successful — please sign in with your new account.</div>
        )}
        <div className="test-credentials-hint">
          <small>💡 Test Login: <strong>test@test.com</strong> / <strong>test123</strong></small>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="form-error">{errors.form}</div>
          )}
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
                <FaExclamationCircle />
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              autoComplete="current-password"
            />
            <label className="form-label">
              <FaLock /> Password
            </label>
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <div className="error-message">
                <FaExclamationCircle />
                {errors.password}
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-existing-account">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
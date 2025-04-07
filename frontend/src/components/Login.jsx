import { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    loginUsername: '',
    loginPassword: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPhone: '',
    registerAddress: '',
    registerImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === 'login') {
      if (formData.loginUsername && formData.loginPassword) {
        onLoginSuccess();
      }
    } else {
      if (formData.registerUsername && 
          formData.registerEmail && 
          formData.registerPassword && 
          formData.registerPhone && 
          formData.registerAddress) {
        const registerData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key.startsWith('register') && value) {
            const fieldName = key.replace('register', '').toLowerCase();
            registerData.append(fieldName, value);
          }
        });
        onLoginSuccess(registerData);
      }
    }
  };

  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      <div className="form-box login">
        <h2 className="title animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
        <form onSubmit={(e) => handleSubmit(e, 'register')} encType="multipart/form-data">
          <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
            <input 
              type="text" 
              name="registerUsername"
              value={formData.registerUsername}
              onChange={handleChange}
              required 
            />
            <label>Username</label>
            <i className='bx bxs-user'></i>
          </div>

          <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
            <input 
              type="email" 
              name="registerEmail"
              value={formData.registerEmail}
              onChange={handleChange}
              required 
            />
            <label>Email</label>
            <i className='bx bxs-envelope'></i>
          </div>

          <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
            <input 
              type="password" 
              name="registerPassword"
              value={formData.registerPassword}
              onChange={handleChange}
              required 
            />
            <label>Password</label>
            <i className='bx bxs-lock-alt'></i>
          </div>

          <div className="input-box animation" style={{ '--i': 21, '--j': 4 }}>
            <input 
              type="tel" 
              name="registerPhone"
              value={formData.registerPhone}
              onChange={handleChange}
              required 
              pattern="[0-9]{10,15}"
              title="Please enter a valid phone number (10-15 digits)"
            />
            <label>Phone Number</label>
            <i style={{color:"black"}} className='bx bxs-phone'></i>
          </div>

          <div className="input-box animation" style={{ '--i': 22, '--j': 5 }}>
            <input 
              type="text" 
              name="registerAddress"
              value={formData.registerAddress}
              onChange={handleChange}
              required 
            />
            <label>Address</label>
            <i className='bx bxs-home'></i>
          </div>

          <div className="input-box file-input animation" style={{ '--i': 23, '--j': 6 }}>
            <label className="file-label">
              <input 
                type="file" 
                name="registerImage"
                onChange={handleChange}
                accept="image/*"
              />
              <span className="file-custom">{formData.registerImage ? formData.registerImage.name : 'Choose profile image...'}</span>
              <i className='bx bxs-image'></i>
            </label>
          </div>

          <button type="submit" className="btn animation" style={{ '--i': 24, '--j': 7 }}>Sign Up</button>

          <div className="linkTxt animation" style={{ '--i': 25, '--j': 8 }}>
            <p>Already have an account? <a href="#" className="login-link" onClick={toggleForm}>Sign in</a></p>
          </div>
        </form>
      </div>

      {/* Register Info Text */}
      <div className="info-text login">
        <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome!</h2>
        <p className="animation" style={{ '--i': 18, '--j': 1 }}>
            Create an account to access exclusive features and content.
        </p>
      </div>

      <div className="form-box register">
        <h2 className="title animation" style={{ '--i': 0, '--j': 21 }}>Sign in</h2>
        <form onSubmit={(e) => handleSubmit(e, 'login')}>
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
            <input 
              type="text" 
              name="loginUsername"
              value={formData.loginUsername}
              onChange={handleChange}
              required 
            />
            <label>Username</label>
            <i className='bx bxs-user'></i>
          </div>

          <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
            <input 
              type="password" 
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
              required 
            />
            <label>Password</label>
            <i className='bx bxs-lock-alt'></i>
          </div>
          
          <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Sign in</button>
          
          <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
            <p>Don't have an account? <a href="#" className="register-link" onClick={toggleForm}>Sign Up</a></p>
          </div>
        </form>
      </div>

      {/* Login Info Text */}
      <div className="info-text register">
        <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 1, '--j': 21 }}>
          Please enter your credentials to access your account.
        </p>
      </div>

    </div>
  );
};

export default Login;
import { useState } from 'react';


const LoginForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    loginUsername: '',
    loginPassword: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === 'login') {
      console.log('Login data:', {
        username: formData.loginUsername,
        password: formData.loginPassword
      });
    } else {
      console.log('Register data:', {
        username: formData.registerUsername,
        email: formData.registerEmail,
        password: formData.registerPassword
      });
    }
  };

  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* signin Form */}
      <div className="form-box login">
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
          
          <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>sign in</button>
          
          <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
            <p>Don't have an account? <a href="#" className="register-link" onClick={toggleForm}>Sign Up</a></p>
          </div>
        </form>
      </div>

      {/* Login Info Text */}
      <div className="info-text login">
        <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 1, '--j': 21 }}>
          Please enter your credentials to access your account.
        </p>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <h2 className="title animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
        <form onSubmit={(e) => handleSubmit(e, 'register')}>
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

          <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>Sign Up</button>

          <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
            <p>Already have an account? <a href="#" className="login-link" onClick={toggleForm}>Sign in</a></p>
          </div>
        </form>
      </div>

      {/* Register Info Text */}
      <div className="info-text register">
        <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome!</h2>
        <p className="animation" style={{ '--i': 18, '--j': 1 }}>
            Create an account to access exclusive features and content.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
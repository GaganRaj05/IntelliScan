import { useState, useRef } from 'react';
import './Home.css';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const HomePage = ({ onLogout }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="logo-title-container">
          <img src={logo} alt="Brain Tumor Detector Logo" className="logo" />
          <h1 className="app-title">brain-tumor-detector</h1>
        </div>
        <button onClick={onLogout} className="logout-btn">
          LOGOUT
        </button>
      </div>
      
      <div className="content">
        <h2 className="page-title">Image Uploader</h2>
        
        <div className="upload-section">
          <button onClick={triggerFileInput} className="upload-btn">
            Upload Image
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          {!preview && (
            <p className="instruction">No image selected. Click "Upload Image" to select one.</p>
          )}
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Uploaded preview" />
            <div className="image-actions">
              <button onClick={clearImage} className="clear-btn">
                Clear Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
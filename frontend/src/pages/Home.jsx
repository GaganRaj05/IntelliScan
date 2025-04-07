import { useState, useRef } from 'react';
import './Home.css';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import { useAuth } from '../Context/AuthContext';
import {useNavigate} from "react-router-dom";
import {handleLogout} from "../Services/auth";
import uploadFile from "../Services/uploadFile"

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("")
  const fileInputRef = useRef(null);
  const {user, setUser} = useAuth();
  const navigate = useNavigate()
  console.log(user)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setResult("")
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
    setResult("")
    setImage(null);
    setPreview(null);
  };
  const handleLogoutClick = async(e) => {
    e.preventDefault();
    const response = await handleLogout();
    if(response.error) {
      alert(response.error === "Failed to fetch"?"Some error occured please try again later":response.error);
      return;
    }
    alert("Logout successfull");
    setUser(null);
    navigate("/")
  }
  const handleFileUpload = async(e)=> {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);
    const response = await uploadFile(formData);
    if(response.error) {
        alert(response.error === "Failed to fetch"?"Some error occured please try again later":response.error);
        return;
    }
    setResult(response);
    
  }
  return (
    <div className="home-container">
      <div className="header">
        <div className="logo-title-container">
          <img src={logo} alt="Brain Tumor Detector Logo" className="logo" />
          <h1 className="app-title">brain-tumor-detector</h1>
        </div>
        <button onClick={(e)=>handleLogoutClick(e)} className="logout-btn">
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
            name="image"
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
              <button onClick={(e)=>handleFileUpload(e)}>
                Submit
              </button>
            </div>
          </div>
        )}
        {result && <p>You likely have {result}</p>}
      </div>
    </div>
  );
};

export default HomePage;
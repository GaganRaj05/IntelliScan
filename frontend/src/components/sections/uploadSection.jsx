import React, { useState } from 'react';
import './uploadSection.css';
import Button from '../ui/Button';
import { toast } from 'react-toastify';
import uploadImage from '../../services/uploadImage';
import { useNavigate } from 'react-router-dom';

const UploadSection = () => {
  const [image, setImage] = useState(null);       
  const [preview, setPreview] = useState(null);   
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setIsLoading(true);
    const response = await uploadImage(formData);
    setIsLoading(false);

    if (response.error) {
      toast.error("Error uploading image. Please try again.");
    } else {
      toast.success("Image uploaded successfully!");
      navigate("/upload-mri-images/results",{state:{response}});
      console.log("Backend Response:", response);
    }
  };

  return (
    <form className="upload-form">
      <h2>Upload an Image</h2>
      <label htmlFor="file-input" className="upload-btn">
        Choose Image
      </label>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {preview && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <img src={preview} alt="Uploaded Preview" />
        </div>
      )}

      {image && (
        <Button classname="upload-btn" onClick={handleUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Image'}
        </Button>
      )}
    </form>
  );
};

export default UploadSection;

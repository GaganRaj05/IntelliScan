import { useState, useRef } from 'react';

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
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
      <h1>Image Uploader</h1>
      
      <div className="button-group">
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
        
        {image && (
          <button onClick={clearImage} className="clear-btn">
            Clear Image
          </button>
        )}
      </div>

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Uploaded preview" />
          <p className="image-info">
            {image.name} • {(image.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      {!image && (
        <p className="instruction">No image selected. Click "Upload Image" to select one.</p>
      )}
    </div>
  );
};

export default HomePage;
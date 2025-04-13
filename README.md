# **IntelliScan - AI-Powered Brain Tumor Detection**  

**IntelliScan** is a web application that detects brain tumors from MRI scans using a **deep learning model** (MobileNetV2 + CNN) trained on a **public Kaggle dataset**. The system consists of:  
- **React.js Frontend** (User Interface)  
- **Node.js/Express Backend** (API & Auth)  
- **FastAPI AI Service** (Model Inference)  

---

## **✨ Key Features**  
✅ **AI-Powered Tumor Detection** – Uses **TensorFlow (MobileNetV2 + CNN)** for high-accuracy predictions.  
✅ **Secure User Authentication** – JWT-based login/signup.  
✅ **Simple MRI Upload** – Upload scans and get instant results.  
✅ **JSON API Communication** – FastAPI backend processes requests efficiently.  
✅ **Responsive UI** – Built with **Bootstrap**.  

---

## **🛠️ Tech Stack**  
| **Component**       | **Technology** |  
|----------------------|---------------|  
| **Frontend**         | React.js, Tailwind CSS |  
| **Backend**          | Node.js, Express, MongoDB |  
| **AI Model**         | TensorFlow (MobileNetV2 + CNN) |  
| **AI Service**       | FastAPI (Python) |  
| **Authentication**   | JWT |  

---

## **🚀 Installation & Setup**  

### **Prerequisites**  
- Node.js (v16+)  
- Python (v3.8+)  
- MongoDB (running locally or Atlas URI)  

### **1. Clone the Repository**  
```bash
git clone https://github.com/GaganRaj05/IntelliScan.git
cd IntelliScan
```

### **2. Backend Setup**  
```bash
cd backend
npm install
```
Create a `.env` file:  
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FASTAPI_URL=http://localhost:8000  # FastAPI endpoint
PORT=your_desried_port
```

Run the backend:  
```bash
nodemon server.js
```

### **3. Frontend Setup**  
```bash
cd frontend
npm install
npm run dev
```

### **4. FastAPI AI Service Setup**  
*(Ensure Python 3.8+ and TensorFlow installed)*  
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

---

## **🔌 API Request/Response Format**  
### **Request (MRI Upload)**  
```json
POST /api/scan
Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
Body: { "image": "base64_encoded_mri_image" }
```

### **Response (Prediction)**  
```json
{
  "prediction": "Tumor Detected",  // or "No Tumor"
  "confidence": 0.92,
  "model": "MobileNetV2 + CNN"
}
```

---

## **📈 Future Improvements**  
🔹 **3D MRI Support** (Volumetric Analysis)  
🔹 **Improved UI with DICOM Viewer**  
🔹 **Deployment Guide for Cloud (AWS/GCP)**  

---

## **📜 License**  
*This project is not licensed as of this day*  

---

## **🙌 Contributing**  
Contributions are welcome! Open an **issue** or submit a **PR**.  

---

**🌟 Show your support by starring the repo!**  

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
import tensorflow as tf
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Load model
model = tf.keras.models.load_model(r'D:\IntelliScan\ai-model\brain_tumor_model.keras')

def preprocess_image(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        
        # Resize to 128x128 (model's expected input size)
        image = image.resize((128, 128))  # Changed from 224 to 128
        
        # Convert to numpy array and normalize
        image_array = np.array(image)
        
        # Ensure image has 3 channels (in case of grayscale)
        if len(image_array.shape) == 2:
            image_array = np.stack((image_array,)*3, axis=-1)
        elif image_array.shape[2] == 4:
            image_array = image_array[:, :, :3]  # Remove alpha channel
            
        image_array = image_array / 255.0 
        image_array = np.expand_dims(image_array, axis=0)
        
        logging.info("Image preprocessing succeeded")
        return image_array
    except Exception as e:
        logging.error(f"Image processing failed: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Image processing failed: {str(e)}")

IMG_SIZE = (128, 128)
CLASSES = ['glioma_tumor', 'meningioma_tumor', 'pituitary_tumor', 'no_tumor']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        contents = await file.read()
        
        image = Image.open(io.BytesIO(contents)).convert('RGB')  
        image = image.resize(IMG_SIZE)
        
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        logging.info(f"Input array - min: {img_array.min()}, max: {img_array.max()}, shape: {img_array.shape}")
        
        prediction = model.predict(img_array)
        logging.info(f"Raw prediction: {prediction}")
        
        predicted_class_idx = np.argmax(prediction, axis=1)[0]
        confidence = np.max(prediction)
        predicted_label = CLASSES[predicted_class_idx]
        
        return {
            "prediction": prediction[0].tolist(),
            "class": predicted_label,
            "confidence": float(confidence),
            "all_predictions": {c: float(p) for c, p in zip(CLASSES, prediction[0])}
        }
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
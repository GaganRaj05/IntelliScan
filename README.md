# IntelliScan --- Brain Tumor Classification System

IntelliScan is a full-stack brain MRI classification application. It
combines a React frontend and Node.js/Express backend with a separate
FastAPI AI service that uses an already-trained TensorFlow/Keras model
to classify MRI images.

The model predicts one of three classes:

-   `meningioma`
-   `pituitary`
-   `notumor`

> **Scope:** Glioma is not included in this model. The output is an AI
> prediction and must not be treated as a medical diagnosis.

## Features

-   Brain MRI classification using a trained MobileNetV2-based model.
-   Three-class prediction: meningioma, pituitary, and no tumor.
-   React-based user interface.
-   Node.js/Express application backend.
-   Separate FastAPI inference service.
-   MongoDB database integration.
-   JWT-based authentication configuration.
-   Model evaluation artifacts, including a confusion matrix and
    training-history plot.

## System Architecture

``` text
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│       Vite development       │
└──────────────┬───────────────┘
               │
               │ VITE_BACKEND_URL
               ▼
┌──────────────────────────────┐
│    Node.js / Express API     │
│                              │
│  MongoDB                     │
│  JWT authentication          │
│  Application routes          │
└──────────────┬───────────────┘
               │
               │ AI_SERVICE_URL
               ▼
┌──────────────────────────────┐
│        FastAPI Service       │
│          ai-service/         │
│                              │
│  Receives MRI image          │
│  Runs model inference        │
│  Returns prediction          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│    Trained Keras Model       │
│                              │
│       MobileNetV2            │
│       3-class output         │
└──────────────────────────────┘
```

The model is already provided with the project. **You do not need to
train the model or run the training script to start the application.**
The FastAPI service loads the available model for inference.

## Machine Learning Model

The classifier is based on MobileNetV2 with a custom classification
head.

  Component                           Configuration
  ----------------------------------- ---------------------------------
  Base architecture                   MobileNetV2
  Pretrained weights                  ImageNet
  Input dimensions                    128 × 128 × 3
  Pooling                             GlobalAveragePooling2D
  Dense layer                         256 units, ReLU
  Dropout                             0.5
  Output layer                        3 units, Softmax
  Loss                                Sparse Categorical Crossentropy
  Optimizer during initial training   Adam, learning rate 0.0001
  Optimizer during fine-tuning        Adam, learning rate 0.00001

### Classes

  Class          Meaning
  -------------- ------------------------
  `meningioma`   Meningioma tumor class
  `pituitary`    Pituitary tumor class
  `notumor`      No-tumor class

### Training methodology

The model was developed using transfer learning in two phases:

1.  **Feature extraction:** the pretrained MobileNetV2 backbone was
    frozen while the custom classification head was trained.
2.  **Fine-tuning:** the final 30 layers of the backbone were made
    trainable, while earlier layers and Batch Normalization layers
    remained frozen.

Training used image augmentation, an 80/20 training-validation split,
EarlyStopping, ModelCheckpoint, and ReduceLROnPlateau.

Training is documented here for reference only. It is not part of the
application startup process.

## Technology Stack

  Layer                 Technology
  --------------------- ------------------------------------------
  Frontend              React, Vite
  Application backend   Node.js, Express.js
  Database              MongoDB
  AI service            FastAPI
  Deep learning         TensorFlow / Keras
  Model                 MobileNetV2
  Evaluation            NumPy, Matplotlib, Seaborn, scikit-learn

## Project Structure

The key application directories are:

``` text
IntelliScan/
├── frontend/       # React + Vite application
├── backend/        # Node.js + Express application
├── ai-service/     # FastAPI model inference service
└── README.md
```

The trained model and any supporting files are expected to be available
where the AI service is configured to load them.

## Prerequisites

-   Node.js and npm
-   Python
-   MongoDB running locally, or a reachable MongoDB instance
-   The trained model file supplied with the project

## Setup and Run

Run each service in a separate terminal.

### 1. Start MongoDB

Make sure MongoDB is running and accessible at:

``` text
mongodb://127.0.0.1:27017
```

The Express backend uses the `Intelli_Scan` database.

### 2. Configure and start the Express backend

Open the Express backend directory and create a `.env` file:

``` env
MONGODB_URL=mongodb://127.0.0.1:27017/Intelli_Scan
JWT_SECRET=your_jwt_secret_key
AI_SERVICE_URL=http://localhost:6000
PORT=8000
```

Install dependencies and start the backend:

``` bash
npm install
npm start
```

Use the development command configured in your `package.json` if your
project uses a different script.

The Express backend runs on port `8000`.

### 3. Configure and start the Vite frontend

In the Vite frontend directory, create a `.env` file:

``` env
VITE_BACKEND_URL=http://localhost:8000/app
```

Install dependencies and start the frontend:

``` bash
npm install
npm run dev
```

Vite will print the local frontend URL in the terminal.

### 4. Start the AI service

Open the `ai-service` directory.

Create and activate a Python virtual environment:

**Windows**

``` powershell
python -m venv env
.\env\Scripts\activate
```

**Linux / macOS**

``` bash
python -m venv env
source env/bin/activate
```

Run the AI service:

``` bash
python app.py
```

The Express backend is configured to reach the AI service at:

``` text
http://localhost:6000
```

Ensure the FastAPI application in `app.py` starts on the host and port
expected by `AI_SERVICE_URL`.

## Application Workflow

1.  The user interacts with IntelliScan through the React frontend.
2.  The frontend sends application requests to the Express backend using
    `VITE_BACKEND_URL`.
3.  The Express backend handles application logic and MongoDB
    operations.
4.  For MRI classification, the backend communicates with the AI service
    using `AI_SERVICE_URL`.
5.  The AI service uses the supplied trained model to generate a
    prediction.
6.  The prediction is returned through the backend and presented in the
    frontend.

## Model Evaluation

The model training and evaluation workflow produced the following
artifacts:

-   `confusion_matrix.png` --- actual-versus-predicted counts for the
    three supported classes.
-   `training_history.png` --- training and validation accuracy and loss
    across epochs.
-   Classification report --- precision, recall, F1-score, and support
    for each class.

These are evaluation outputs from model development; they are not
required to run the web application.

## Configuration Reference

  -----------------------------------------------------------------------
  Variable                Service                 Purpose
  ----------------------- ----------------------- -----------------------
  `MONGODB_URL`           Express                 MongoDB connection
                                                  string

  `JWT_SECRET`            Express                 Secret used for JWT
                                                  operations

  `AI_SERVICE_URL`        Express                 URL of the FastAPI
                                                  inference service

  `PORT`                  Express                 Port used by the
                                                  Express backend

  `VITE_BACKEND_URL`      Vite frontend           Base URL used by the
                                                  frontend to reach the
                                                  Express application
  -----------------------------------------------------------------------

For local development, the configured URLs are:

-   Frontend → Express: `http://localhost:8000/app`
-   Express → AI service: `http://localhost:6000`

## Important Notes

-   The application uses a three-class model; glioma is not supported.
-   The trained model is supplied. Model training is not required during
    setup.
-   The AI service must load the model from the correct path configured
    in its implementation.
-   Keep real secrets private. Replace the example `JWT_SECRET` with a
    strong secret outside local testing.
-   The model's predictions are not clinically validated diagnoses. Do
    not use them as a substitute for assessment by a qualified medical
    professional.
-   Performance on images from other hospitals, scanners, or patient
    populations may differ from validation results.

## Disclaimer

IntelliScan is an educational and machine-learning project intended for
demonstration and research purposes. It is not a medical device and must
not be used as the sole basis for diagnosis or treatment decisions.

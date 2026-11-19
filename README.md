# IntelliScan --- Brain Tumor Classification System

IntelliScan is a full-stack brain MRI classification application that
combines a **MERN-based web application**, a **FastAPI inference
service**, and a **TensorFlow/Keras deep learning model** to classify
uploaded MRI images.

The system predicts one of three classes:

-   **Meningioma** --- tumor class
-   **Pituitary** --- tumor class
-   **No Tumor** --- no tumor detected by the model

> **Scope:** This model is trained for the three classes listed above.
> It does not include glioma classification. Its output is an AI model
> prediction, not a medical diagnosis.

------------------------------------------------------------------------

## Features

-   Brain MRI image classification using a MobileNetV2-based
    transfer-learning model.
-   Three-class prediction: `meningioma`, `pituitary`, and `notumor`.
-   FastAPI service for model inference.
-   MERN stack application for the user-facing experience.
-   Image preprocessing consistent with the model's training pipeline.
-   Training and validation metrics, classification report, and
    confusion matrix generation.
-   Saved model checkpoint in Keras `.keras` format.

## System Architecture

``` text
┌─────────────────────────────┐
│       MERN Application      │
│                             │
│  React frontend             │
│  Node.js / Express backend  │
└──────────────┬──────────────┘
               │
               │ Image / prediction request
               ▼
┌─────────────────────────────┐
│       FastAPI Service       │
│                             │
│  Receives MRI image         │
│  Preprocesses image         │
│  Loads trained model        │
│  Runs model inference       │
│  Returns prediction         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   TensorFlow / Keras Model  │
│                             │
│  MobileNetV2 backbone       │
│  Global Average Pooling     │
│  Dense (256, ReLU)          │
│  Dropout (0.5)              │
│  Dense (3, Softmax)         │
└─────────────────────────────┘
```

The MERN application provides the user interface and application
workflow. The FastAPI service handles model inference, keeping the
machine-learning component separate from the main application backend.

## Machine Learning Model

### Model Architecture

The classifier uses **MobileNetV2**, initialized with ImageNet
pretrained weights, as its feature extraction backbone.

A custom classification head is added:

  Layer                   Configuration
  ----------------------- ---------------------------------
  Base model              MobileNetV2
  Pretrained weights      ImageNet
  Input size              128 × 128 × 3
  Global pooling          GlobalAveragePooling2D
  Fully connected layer   Dense (256, ReLU)
  Regularization          Dropout (0.5)
  Output layer            Dense (3, Softmax)
  Loss function           Sparse Categorical Crossentropy
  Optimizer               Adam

### Training Configuration

  Parameter                   Value
  --------------------------- -----------------------
  Image dimensions            128 × 128
  Batch size                  32
  Maximum configured epochs   50 per training phase
  Number of classes           3
  Training/validation split   80% / 20%
  Initial learning rate       0.0001
  Fine-tuning learning rate   0.00001
  Backbone                    MobileNetV2

### Data Augmentation

The training data generator applies:

-   Rotation: 20 degrees
-   Width shift: 0.1
-   Height shift: 0.1
-   Zoom: 0.2
-   Brightness range: 0.8--1.2
-   Horizontal flipping
-   Nearest-neighbor fill

The validation generator uses MobileNetV2 preprocessing without the
training augmentations.

### Transfer Learning and Fine-Tuning

Training is performed in two phases:

**Phase 1 --- Feature extraction**

-   Load MobileNetV2 with ImageNet pretrained weights.
-   Freeze the pretrained backbone.
-   Train the custom classification head.
-   Use Adam with a learning rate of `0.0001`.

**Phase 2 --- Fine-tuning**

-   Unfreeze the MobileNetV2 backbone.
-   Keep all but the final 30 backbone layers frozen.
-   Keep Batch Normalization layers frozen.
-   Recompile with Adam at a lower learning rate of `0.00001`.
-   Continue training with validation monitoring.

### Training Callbacks

  -----------------------------------------------------------------------
  Callback                Configuration           Purpose
  ----------------------- ----------------------- -----------------------
  EarlyStopping           Patience: 10            Stop when validation
                                                  loss stops improving
                                                  and restore the best
                                                  weights

  ModelCheckpoint         Save best only          Save the model with the
                                                  lowest validation loss

  ReduceLROnPlateau       Factor: 0.5, patience:  Reduce the learning
                          3                       rate when validation
                                                  loss plateaus
  -----------------------------------------------------------------------

The configured model output is:

``` text
brain_tumor_model_updated.keras
```

## Model Evaluation

The training pipeline generates two evaluation artifacts:

### 1. Confusion Matrix

`confusion_matrix.png`

Displays the actual-versus-predicted classification counts for:

-   meningioma
-   pituitary
-   notumor

### 2. Training History

`training_history.png`

Contains two plots:

-   Training and validation accuracy
-   Training and validation loss

The script also prints a classification report containing precision,
recall, F1-score, and support for each class.

## Technology Stack

  Component                  Technology
  -------------------------- -----------------------------------
  Frontend                   React
  Main application backend   Node.js, Express.js
  Database                   MongoDB
  ML inference API           FastAPI
  Deep learning framework    TensorFlow / Keras
  Model architecture         MobileNetV2
  Numerical processing       NumPy
  Image/model evaluation     Matplotlib, Seaborn, scikit-learn
  Language                   Python, JavaScript

## Project Structure

The following is a suggested logical structure. Adjust the paths to
match your actual repository layout.

``` text
IntelliScan/
│
├── frontend/                       # React frontend
│
├── backend/                        # Node.js / Express backend
│
├── ai-model/
│   ├── train.py                    # Model training script
│   ├── brain_tumor_model_updated.keras
│   ├── confusion_matrix.png
│   └── training_history.png
│
├── fastapi-service/
│   ├── main.py                     # FastAPI application
│   └── requirements.txt
│
└── README.md
```

## Dataset

The training script expects a directory-based image dataset:

``` text
Training/
├── meningioma/
├── pituitary/
└── notumor/
```

Each directory contains the MRI images belonging to that class.

The training and validation generators use an 80/20 split with a fixed
seed of `42`.

Set the dataset path in the training script:

``` python
DATASET_PATH = r"path/to/Training"
```

## Installation and Setup

The commands below describe the typical setup. Replace directory names
and environment variables with the ones used in your repository.

### Prerequisites

-   Python 3.10 or a TensorFlow-supported Python version
-   Node.js and npm
-   MongoDB, if the application uses a local MongoDB instance
-   The trained Keras model file

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd IntelliScan
```

### 2. Set up the FastAPI inference service

``` bash
cd fastapi-service

python -m venv venv
```

Activate the virtual environment:

**Windows**

``` powershell
venv\Scripts\activate
```

**Linux / macOS**

``` bash
source venv/bin/activate
```

Install the Python dependencies:

``` bash
pip install fastapi uvicorn tensorflow numpy pillow
```

If your FastAPI service has a `requirements.txt`, use that instead:

``` bash
pip install -r requirements.txt
```

Start the API:

``` bash
uvicorn main:app --reload
```

The service will typically be available at:

``` text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is typically available at:

``` text
http://127.0.0.1:8000/docs
```

> The actual host, port, endpoint, and request format depend on your
> FastAPI implementation.

### 3. Set up the MERN application

Install frontend dependencies:

``` bash
cd frontend
npm install
npm run dev
```

Install backend dependencies:

``` bash
cd backend
npm install
```

Start the Node.js / Express backend using the start script defined in
its `package.json`, for example:

``` bash
npm start
```

Configure the frontend and backend environment variables according to
your application's configuration.

## Prediction Workflow

The intended inference flow is:

1.  The user uploads a brain MRI image through the React interface.
2.  The MERN application handles the application request.
3.  The image is forwarded to the FastAPI inference service.
4.  FastAPI preprocesses the image to match the model's expected input.
5.  The trained MobileNetV2 classifier performs inference.
6.  The softmax output is used to determine the predicted class.
7.  The prediction is returned to the application and displayed to the
    user.

### Output Classes

  Model output   Interpretation
  -------------- --------------------------
  `meningioma`   Tumor class predicted
  `pituitary`    Tumor class predicted
  `notumor`      No tumor class predicted

The model's softmax output represents class scores. These scores should
not be interpreted as clinically calibrated probabilities.

## Training the Model

Install the training dependencies:

``` bash
pip install tensorflow numpy matplotlib seaborn scikit-learn
```

Run the training script:

``` bash
python train.py
```

The script:

1.  Loads the dataset.
2.  Creates augmented training and validation generators.
3.  Builds the MobileNetV2 classifier.
4.  Trains the classification head.
5.  Fine-tunes the final layers of the backbone.
6.  Saves the best checkpoint.
7.  Generates predictions on the validation set.
8.  Prints the classification report.
9.  Saves the confusion matrix and training history plots.

## Important Notes and Limitations

-   The model recognizes only the three classes used during training. It
    cannot identify glioma in this configuration.
-   Predictions depend on the quality, resolution, and distribution of
    the input MRI images.
-   The model should not be used as a standalone diagnostic tool or as a
    replacement for a qualified radiologist.
-   Validation performance does not guarantee performance on images from
    other hospitals, scanners, or patient populations.
-   The validation split is created from the supplied directory dataset;
    the script does not establish an independent external test set.
-   The saved checkpoint is selected using validation loss. The training
    script subsequently saves the final model state as well, so the
    final saved file may not necessarily represent the best validation
    checkpoint.

## Future Improvements

Potential improvements include:

-   Adding additional tumor categories, including glioma.
-   Evaluating on an independent external dataset.
-   Improving robustness across MRI acquisition settings.
-   Adding prediction confidence visualization with appropriate
    calibration.
-   Implementing Grad-CAM for model interpretability.
-   Adding image quality checks before inference.
-   Improving API validation, logging, and inference monitoring.

## Disclaimer

IntelliScan is an educational and machine-learning project intended for
research and demonstration purposes. Its predictions are not medical
diagnoses. Always consult qualified medical professionals for the
interpretation of MRI scans and clinical decisions.

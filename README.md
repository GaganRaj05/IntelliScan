# IntelliScan --- Deep Learning-Based Brain MRI Classification

IntelliScan is a brain MRI classification project built around a
**MobileNetV2 deep learning model**. The model is the core of the
system: it analyzes an MRI image and predicts which of the supported
classes it belongs to.

A **FastAPI service** exposes the trained model for inference, while the
**MERN application primarily provides the user-facing interface** for
submitting images and displaying prediction results. The web application
supports interaction with the system; the deep learning model performs
the image classification.

> **Model scope:** This version supports three classes: `meningioma`,
> `pituitary`, and `notumor`. Glioma is not included in the trained
> classifier.

------------------------------------------------------------------------

## Project Highlights

-   Transfer learning using **MobileNetV2 pretrained on ImageNet**.
-   Custom neural-network classification head built with
    TensorFlow/Keras.
-   Two-stage training: frozen-backbone feature extraction followed by
    fine-tuning.
-   Image augmentation to improve variation in the training data.
-   Three-class softmax classification.
-   FastAPI inference service for serving the trained model.
-   MERN-based application for image submission and presentation of
    results.
-   Evaluation using a classification report, confusion matrix, and
    training/validation curves.

## System Architecture

``` text
                 User
                  |
                  v
       ┌──────────────────────┐
       │   MERN Application   │
       │                      │
       │ Image upload / UI    │
       │ Display prediction   │
       └──────────┬───────────┘
                  |
                  v
       ┌──────────────────────┐
       │  Express Backend     │
       │                      │
       │ Application API      │
       │ MongoDB connection   │
       │ JWT configuration   │
       └──────────┬───────────┘
                  |
                  | AI_SERVICE_URL
                  v
       ┌──────────────────────┐
       │   FastAPI Service    │
       │     ai-service/      │
       │                      │
       │ Receives MRI image   │
       │ Prepares model input │
       │ Calls trained model  │
       │ Returns prediction   │
       └──────────┬───────────┘
                  |
                  v
       ┌──────────────────────┐
       │  MobileNetV2 Model   │
       │                      │
       │ Feature extraction   │
       │ Classification head  │
       │ 3-class softmax      │
       └──────────────────────┘
```

The **deep learning model is the classification engine**. FastAPI makes
that model accessible to the application. The MERN stack is primarily
responsible for the application experience and displaying the model's
output; it does not perform the MRI classification itself.

## Deep Learning Model

### MobileNetV2 Transfer Learning

IntelliScan uses **MobileNetV2** as its convolutional neural network
(CNN) backbone. The base network is initialized with ImageNet pretrained
weights and configured with `include_top=False`, removing the original
ImageNet classification head.

This allows the network to reuse pretrained visual feature
representations. A custom classification head is then attached to learn
the three brain MRI categories used by this project.

### Model Architecture

The architecture defined in the training script is:

``` text
Input MRI Image
  128 × 128 × 3
        |
        v
MobileNetV2
ImageNet pretrained weights
include_top = False
        |
        v
GlobalAveragePooling2D
        |
        v
Dense Layer
256 units, ReLU
        |
        v
Dropout
0.5
        |
        v
Output Dense Layer
3 units, Softmax
        |
        v
Predicted Class
meningioma / pituitary / notumor
```

  Component               Configuration
  ----------------------- ---------------------------------
  CNN backbone            MobileNetV2
  Initial weights         ImageNet
  Original classifier     Removed (`include_top=False`)
  Input dimensions        128 × 128 × 3
  Pooling                 GlobalAveragePooling2D
  Fully connected layer   256 neurons, ReLU
  Dropout                 0.5
  Output layer            3 neurons, Softmax
  Loss function           Sparse Categorical Crossentropy
  Optimizer               Adam

### Why MobileNetV2?

MobileNetV2 is a lightweight CNN architecture designed to extract useful
image features efficiently. Using ImageNet pretrained weights provides
an initial set of visual features, while transfer learning adapts the
network to the MRI classification task.

The custom dense head maps the extracted feature representation to the
three target classes. Dropout is applied before the output layer as a
regularization measure.

## Training Methodology

The supplied training script uses two training phases.

### Phase 1 --- Feature Extraction

1.  Load MobileNetV2 with ImageNet pretrained weights.
2.  Remove its original classification head.
3.  Freeze the MobileNetV2 backbone using
    `base_model.trainable = False`.
4.  Add and train the custom classification head.
5.  Compile with Adam using a learning rate of `0.0001`.

During this phase, the pretrained convolutional layers remain fixed
while the new classifier learns to distinguish the target MRI classes.

### Phase 2 --- Fine-Tuning

After the initial training phase:

1.  Unfreeze the MobileNetV2 base model.
2.  Keep all but the final 30 backbone layers frozen.
3.  Keep Batch Normalization layers frozen.
4.  Recompile using Adam with a lower learning rate of `0.00001`.
5.  Continue training with the validation data and configured callbacks.

Fine-tuning allows selected pretrained layers to adapt their learned
features to the MRI dataset while using a smaller learning rate.

### Training Configuration

  Parameter                    Value
  ---------------------------- -----------
  Image size                   128 × 128
  Batch size                   32
  Configured epoch limit       50
  Training/validation split    80% / 20%
  Initial learning rate        0.0001
  Fine-tuning learning rate    0.00001
  Random seed for data split   42
  Number of classes            3

The `epochs=50` setting is used for the overall training schedule:
fine-tuning starts at the number of epochs completed in the first phase
and continues up to epoch 50. Early stopping can end a phase sooner.

### Data Augmentation

The training `ImageDataGenerator` applies the following transformations:

  Augmentation      Configuration
  ----------------- ---------------
  Rotation          20 degrees
  Width shift       0.1
  Height shift      0.1
  Zoom              0.2
  Brightness        0.8--1.2
  Horizontal flip   Enabled
  Fill mode         Nearest

The validation generator applies MobileNetV2 preprocessing without the
training augmentations.

Both generators use `preprocess_input` from
`tensorflow.keras.applications.mobilenet_v2`.

### Training Callbacks

  ------------------------------------------------------------------------
  Callback                Configuration            Purpose
  ----------------------- ------------------------ -----------------------
  EarlyStopping           `monitor='val_loss'`,    Stops training when
                          patience 10              validation loss does
                                                   not improve and
                                                   restores the best
                                                   weights

  ModelCheckpoint         `save_best_only=True`,   Saves a checkpoint when
                          monitor `val_loss`       validation loss
                                                   improves

  ReduceLROnPlateau       Factor 0.5, patience 3,  Reduces the learning
                          minimum LR `1e-7`        rate when validation
                                                   loss plateaus
  ------------------------------------------------------------------------

### Saved Model

The training script saves the model as:

``` text
brain_tumor_model_updated.keras
```

The trained model is supplied for application use. **You do not need to
run the training script to launch IntelliScan.** The FastAPI service
uses the available trained model for prediction.

------------------------------------------------------------------------

## Supported Classification Labels

The output layer contains three neurons with softmax activation.

  Class label    Interpretation
  -------------- ------------------------
  `meningioma`   Meningioma tumor class
  `pituitary`    Pituitary tumor class
  `notumor`      No-tumor class

The model selects the class with the highest output score. These scores
are model outputs and should not be treated as clinically calibrated
probabilities.

## Model Evaluation

The training script evaluates the trained model on the validation
generator and produces the following outputs.

### Classification Report

The scikit-learn `classification_report` provides:

-   **Precision:** Of the predictions made for a class, how many were
    correct.
-   **Recall:** Of the actual samples in a class, how many were
    identified.
-   **F1-score:** Harmonic mean of precision and recall.
-   **Support:** Number of validation samples belonging to each class.

### Confusion Matrix

The confusion matrix compares actual labels with predicted labels for:

-   `meningioma`
-   `pituitary`
-   `notumor`

The script saves the visualization as:

``` text
confusion_matrix.png
```

### Training History

The training script combines the history from the feature-extraction and
fine-tuning phases and plots:

-   Training accuracy
-   Validation accuracy
-   Training loss
-   Validation loss

The resulting figure is saved as:

``` text
training_history.png
```

These metrics describe performance on the validation split used by the
script. They do not establish performance on an independent external
dataset.

------------------------------------------------------------------------

## Technology Stack

  -----------------------------------------------------------------------
  Component               Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Deep learning model     TensorFlow / Keras      MRI image
                                                  classification

  CNN architecture        MobileNetV2             Feature extraction

  Image processing        NumPy, Keras            Model input preparation
                          preprocessing           

  Inference API           FastAPI                 Exposes model
                                                  predictions

  Application backend     Node.js, Express.js     Application API and
                                                  service integration

  Frontend                React, Vite             User interface and
                                                  prediction display

  Database                MongoDB                 Application data

  Authentication          JWT                     Token-based
  configuration                                   authentication

  Evaluation              scikit-learn            Classification report
                                                  and confusion matrix

  Visualization           Matplotlib, Seaborn     Training curves and
                                                  confusion matrix
  -----------------------------------------------------------------------

## Project Structure

The following shows the main application directories and model artifact.
Adjust file locations to match the repository:

``` text
IntelliScan/
│
├── frontend/                         # React + Vite UI
│
├── backend/                          # Node.js + Express API
│
├── ai-service/                       # FastAPI inference service
│   ├── app.py
│   └── brain_tumor_model_updated.keras
│
├── README.md
│
└── ...
```

The model file must be located at the path expected by the AI service.
The training script and evaluation images may be kept separately from
the runtime application.

------------------------------------------------------------------------

## Setup and Installation

### Prerequisites

-   Python
-   Node.js and npm
-   MongoDB
-   The supplied trained model file
-   The project source code

### 1. Start MongoDB

Ensure MongoDB is running locally and accessible at:

``` text
mongodb://127.0.0.1:27017
```

The Express backend is configured to use the `Intelli_Scan` database.

### 2. Configure and Start the Express Backend

Open the Express backend directory and create a `.env` file:

``` env
MONGODB_URL=mongodb://127.0.0.1:27017/Intelli_Scan
JWT_SECRET=your_jwt_secret_key
AI_SERVICE_URL=http://localhost:6000
PORT=8000
```

Install dependencies:

``` bash
npm install
```

Start the backend using the script configured in its `package.json`, for
example:

``` bash
npm start
```

The Express backend is configured to run on port `8000`.

### 3. Configure and Start the Vite Frontend

In the Vite frontend directory, create a `.env` file:

``` env
VITE_BACKEND_URL=http://localhost:8000/app
```

Install dependencies and start the frontend:

``` bash
npm install
npm run dev
```

Use the local URL printed by Vite to open the application.

### 4. Start the AI Inference Service

Open the `ai-service` directory.

Create and activate a Python virtual environment.

**Windows**

``` powershell
python -m venv env
.\env\Scripts\activate
```

**Linux / macOS**

``` bash
python3 -m venv env
source env/bin/activate
```

Install the dependencies required by the AI service. If a
`requirements.txt` is present, run:

``` bash
pip install -r requirements.txt
```

Run the service:

``` bash
python app.py
```

The Express backend is configured to communicate with the AI service at:

``` text
http://localhost:6000
```

Ensure `app.py` starts the FastAPI application on the expected host and
port, and ensure the model path configured in the service points to the
supplied `.keras` file.

------------------------------------------------------------------------

## End-to-End Prediction Workflow

1.  A user opens IntelliScan in the React frontend.
2.  The user submits a brain MRI image through the application
    interface.
3.  The frontend communicates with the Express backend using the
    configured backend URL.
4.  The Express backend forwards the inference request to the FastAPI
    service.
5.  FastAPI prepares the image in the format expected by the model.
6.  The MobileNetV2-based model performs inference and produces three
    class scores.
7.  The predicted class is returned through the API flow.
8.  The MERN application displays the prediction to the user.

The MERN application is the presentation and application layer. The
trained deep learning model is responsible for the actual image
classification.

## Configuration Reference

  Variable             Service         Description
  -------------------- --------------- ---------------------------------
  `MONGODB_URL`        Express         MongoDB connection string
  `JWT_SECRET`         Express         JWT signing/verification secret
  `AI_SERVICE_URL`     Express         FastAPI inference service URL
  `PORT`               Express         Express server port
  `VITE_BACKEND_URL`   Vite frontend   Express API base URL

Local development URLs:

  Connection             URL
  ---------------------- -----------------------------
  Frontend → Express     `http://localhost:8000/app`
  Express → AI service   `http://localhost:6000`

------------------------------------------------------------------------

## Limitations and Future Improvements

-   The current model supports only meningioma, pituitary, and no-tumor
    classes; glioma is not supported.
-   Validation performance may differ on MRI images from other scanners,
    hospitals, or patient populations.
-   The supplied training script uses a validation split from the
    dataset; an independent external test set would provide stronger
    evidence of generalization.
-   Future work could add more tumor categories, external validation,
    Grad-CAM visualizations, input-quality checks, and model monitoring.
-   Prediction scores should be calibrated and clinically evaluated
    before being interpreted as probabilities for medical use.

## Medical Disclaimer

IntelliScan is an educational and machine-learning project. It is not a
certified medical device, and its predictions are not medical diagnoses.
It must not be used as the sole basis for diagnosis, treatment, or other
clinical decisions. MRI scans should be interpreted by qualified medical
professionals.

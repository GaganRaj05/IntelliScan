import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import load_img, img_to_array
# Register the custom loss function
from tensorflow.keras.saving import register_keras_serializable

@register_keras_serializable()
def focal_loss(gamma=2.0, alpha=0.5):
    def loss(y_true, y_pred):
        y_true = tf.cast(y_true, tf.int32)
        y_true_onehot = tf.one_hot(y_true, depth=len(CLASSES))
        cross_entropy = tf.nn.softmax_cross_entropy_with_logits(labels=y_true_onehot, logits=y_pred)
        p = tf.math.sigmoid(y_pred)
        p = tf.reduce_sum(y_true_onehot * p, axis=-1)
        focal_weight = tf.pow(1. - p, gamma)
        class_weights = tf.constant([alpha if c == 0 or c == 3 else 1.0 for c in range(len(CLASSES))], dtype=tf.float32)
        class_weight = tf.reduce_sum(class_weights * y_true_onehot, axis=-1)
        return tf.reduce_mean(focal_weight * cross_entropy * class_weight)
    return loss

# Load the model with custom objects


# Configuration
MODEL_PATH = "brain_tumor_model.keras"
CLASSES = ['glioma_tumor', 'meningioma_tumor', 'pituitary_tumor', 'no_tumor']
IMG_SIZE = (128, 128)
TEST_IMAGE_DIR = r"D:\IntelliScan\ai-model\training_images\Testing\pituitary_tumor"

# Load trained model
# Register the custom loss function

# Load the model with custom objects
model = tf.keras.models.load_model(MODEL_PATH, custom_objects={'loss': focal_loss()})

# Function to preprocess image
def preprocess_image(image_path):
    img = load_img(image_path, target_size=IMG_SIZE)
    img_array = img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

# Function to predict class
def predict_image(image_path):
    img_array = preprocess_image(image_path)
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    confidence = np.max(prediction)
    return CLASSES[predicted_class], confidence

# Test images
test_images = [f for f in os.listdir(TEST_IMAGE_DIR) if f.lower().endswith(('png', 'jpg', 'jpeg'))]

for image_name in test_images:
    image_path = os.path.join(TEST_IMAGE_DIR, image_name)
    predicted_label, confidence = predict_image(image_path)
    print(f"Image: {image_name} -> Predicted: {predicted_label} ({confidence:.2f})")
    
    # Display image with prediction
    img = load_img(image_path, target_size=IMG_SIZE)
    plt.imshow(img)
    plt.axis('off')
    plt.title(f"Prediction: {predicted_label} ({confidence:.2f})")
    plt.show()

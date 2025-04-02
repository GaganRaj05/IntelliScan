import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from sklearn.metrics import classification_report, confusion_matrix

DATASET_PATH = r"D:\IntelliScan\ai-model\training_images\Training"
CLASSES = ['glioma_tumor', 'meningioma_tumor', 'pituitary_tumor', 'no_tumor']
IMG_SIZE = (128, 128)
BATCH_SIZE = 32
EPOCHS = 50
MODEL_SAVE_PATH = "brain_tumor_model.keras"


base_dir = "D:\\IntelliScan\\ai-model\\training_images\\Training"
for tumor_class in ['glioma_tumor', 'meningioma_tumor', 'pituitary_tumor', 'no_tumor']:
    print(f"{tumor_class}: {len(os.listdir(os.path.join(base_dir, tumor_class)))} images")

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,  
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.2,  
    brightness_range=[0.8, 1.2],  
    horizontal_flip=True,
    fill_mode='nearest'
)
train_generator = train_datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='sparse',
    subset='training',
    classes=CLASSES,
    shuffle=True
)

val_generator = train_datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='sparse',
    subset='validation',
    classes=CLASSES,
    shuffle=False
)

def build_model(input_shape, num_classes):
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=input_shape)
    base_model.trainable = False
    
    x = Flatten()(base_model.output)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    output = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=output)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

callbacks = [
    EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True),
    ModelCheckpoint(MODEL_SAVE_PATH, save_best_only=True),
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, min_lr=1e-7)
]

model = build_model((IMG_SIZE[0], IMG_SIZE[1], 3), len(CLASSES))
model.summary()

history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    validation_data=val_generator,
    validation_steps=val_generator.samples // BATCH_SIZE,
    epochs=EPOCHS,
    callbacks=callbacks
)

model.save(MODEL_SAVE_PATH)

y_pred = model.predict(val_generator, steps=val_generator.samples // BATCH_SIZE + 1)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true = val_generator.classes[:len(y_pred_classes)]

print("\nClassification Report:")
print(classification_report(y_true, y_pred_classes, target_names=CLASSES))

plt.figure(figsize=(8,6))
cm = confusion_matrix(y_true, y_pred_classes)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=CLASSES, yticklabels=CLASSES)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.savefig('confusion_matrix.png')
plt.close()

plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Accuracy')
plt.xlabel('Epochs')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Loss')
plt.xlabel('Epochs')
plt.legend()

plt.tight_layout()
plt.savefig('training_history.png')
plt.close()

print("Training complete. Model saved at:", MODEL_SAVE_PATH)

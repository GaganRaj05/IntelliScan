import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { ImagePlus, RotateCcw, Upload } from "lucide-react";
import Button from "../ui/Button";
import uploadImage from "../../services/uploadImage";
import "./uploadSection.css";

const UploadSection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length) return toast.error("Choose an image file under 10 MB.");
    if (accepted[0]) setImage(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false, maxSize: 10 * 1024 * 1024, accept: { "image/*": [] },
  });

  useEffect(() => {
    if (!image) return setPreview(null);
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleUpload = async () => {
    if (!image) return toast.error("No image selected");
    const formData = new FormData();
    formData.append("image", image);

    setIsLoading(true);
    const response = await uploadImage(formData);
    setIsLoading(false);

    if (response.error) {
      toast.error("Error uploading image. Please try again.");
    } else {
      toast.success("Image uploaded successfully!");
      navigate("/upload-mri-images/results", { state: { response } });
    }
  };

  return (
    <section className="uploader">
      <h1 className="uploader__title">Upload an MRI scan.</h1>
      <p className="uploader__sub">Add a brain MRI image and Pixel will analyze it in seconds.</p>

      <div className="uploader__card glass glass--strong">
        {!image ? (
          <div {...getRootProps({ className: `uploader__drop ${isDragActive ? "is-active" : ""}` })}>
            <input {...getInputProps()} aria-label="Choose MRI image" />
            <ImagePlus size={36} strokeWidth={1.5} aria-hidden="true" />
            <p><strong>Drop an MRI image here</strong></p>
            <p className="muted">or click to choose a file</p>
          </div>
        ) : (
          <div className="uploader__preview">
            <img src={preview} alt="Selected MRI scan preview" />
            <p className="uploader__meta">{image.name}</p>
            <div className="uploader__actions">
              <Button onClick={handleUpload} disabled={isLoading}>
                <Upload size={16} aria-hidden="true" />
                {isLoading ? "Analyzing…" : "Analyze scan"}
              </Button>
              <Button variant="glass" onClick={() => setImage(null)} disabled={isLoading}>
                <RotateCcw size={16} aria-hidden="true" />Choose another
              </Button>
            </div>
          </div>
        )}
      </div>
      <p className="uploader__note">Pixel supports clinical decisions. It does not replace a medical diagnosis.</p>
    </section>
  );
};

export default UploadSection;
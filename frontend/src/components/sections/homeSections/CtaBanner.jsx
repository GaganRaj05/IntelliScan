import { useNavigate } from "react-router-dom";
import NeuButton from "./NeuButton";

const CTA_ROUTE = "/upload-mri-images";

const CtaBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="section cta-wrap">
      <div className="cta">
        <h2>Ready to look at a scan?</h2>
        <p>Upload a brain MRI slice and see the result in seconds.</p>
        <NeuButton variant="light" size="lg" onClick={() => navigate(CTA_ROUTE)}>Analyze an MRI</NeuButton>
      </div>
    </section>
  );
};

export default CtaBanner;
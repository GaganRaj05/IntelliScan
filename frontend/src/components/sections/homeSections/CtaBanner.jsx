import { useNavigate } from "react-router-dom";

const CTA_ROUTE = "/upload-mri-images";

const CtaBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="section cta-wrap">
      <div className="cta">
        <h2>Ready to look at a scan?</h2>
        <p>Upload a brain MRI slice and see the result in seconds.</p>
        <button type="button" className="cta__btn" onClick={() => navigate(CTA_ROUTE)}>Analyze an MRI</button>
      </div>
    </section>
  );
};

export default CtaBanner;
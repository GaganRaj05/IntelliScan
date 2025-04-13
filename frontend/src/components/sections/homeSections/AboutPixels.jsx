import "./AboutPixels.css";
const AboutPixel = () => {
  return (
    <section className="about-pixel">
      <div className="pixel-info-container">
        <div className="about-pixel-head">
          <p>How pixels are used for Brain Tumor Detection</p>
        </div>
        <div className="about-pixel-content">
          <p id="mr" className="pixel-cont-head">
            Solutions specifically designed for end-users to efficiently monitor
            disease progression
          </p>
          <ul>
            <li>
              <p className="pixel-cont-head">Automated Image Analysis:</p>
              <p className="pixel-cont-main">
                Pixel resolution is standardized to 512×512 (adjustable per
                modality) voxel analysis in 3D convolutional networks for
                volumetric scans, processing speed is 15 seconds per study
                (GPU-accelerated)
              </p>
              </li>
              <li>
                <p className="pixel-cont-head">Automated Reporting System:</p>
                <p className="pixel-cont-main">
                  Template-based with 200+ customizable macros HL7 with
                  FHIR-compliant output
                </p>
              </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default AboutPixel;

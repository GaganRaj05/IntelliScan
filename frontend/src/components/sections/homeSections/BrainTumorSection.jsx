import "./BrainTumors.css";
import Glioma from "./glioma.jpg";
import Meningioma from "./meningioma.jpg";
import Pitiuatory from "./pituatory.jpg";
const BrainTumors = () => {
  return (
    <section className="brain-tumor-info">
      <h1>TYPES OF BRAIN TUMORS</h1>
      <div className="brain-tumor-cont">
        <div className="meningioma-tumor">
          <img src={Meningioma} alt="" />
          <a href="">MENINGIOMA TUMOR</a>
        </div>
        <div className="glioma-tumor">
          <img src={Glioma} alt="" />
          <a href="">GLIOMA TUMOR</a>
        </div>
        <div className="pituitary-tumor">
          <img src={Pitiuatory} alt="" />
          <a href="">PITUITARY TUMOR</a>
        </div>
      </div>
    </section>
  );
};
export default BrainTumors;

import Button from "../../ui/Button";
import "./HeroSection.css";
import HeroImg from "./hero.jpg";
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="hero-container">
            <div className="hero">  
                <div className="hero-img-container">
                    <img src={HeroImg} alt="" />
                </div>
                <div className="hero-content">
                    <p className="hero-cont-head">BRAIN TUMOR DETECTION /// AI</p>
                    <p className="hero-cont-main">
                        AI-enabled solutions that provide advance insights based on MRI Scan images
                    </p>
                    <p className="hero-cont-descript">
                        We have built a solution that generate actionable insights from radiology images to help users to make more informed diagnostic and treatment decisions
                    </p>
                    <Button classname={"contact nav-btn"} onClick={()=>navigate("/")}>
                        Contact us
                    </Button>
                </div>
            </div>
        </section>
    )
}
export default Hero;
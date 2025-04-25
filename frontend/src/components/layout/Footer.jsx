import "./Footer.css";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate();
     return (
        <section className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>BrainScan</h2>
                    <p>Your health, our priority.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="" onClick={(e)=>{e.preventDefault();navigate("/") }}>Home</a></li>
                        <li><a href="" onClick={(e)=>{e.preventDefault(); toast.success("This feature is not added yet")}}>About</a></li>
                        <li><a href="" onClick={(e)=>{e.preventDefault(); toast.success("This feature is not added yet")}}>Contact</a></li>
                        <li><a href="" onClick={(e)=>{e.preventDefault(); toast.success("This feature is not added yet")}}>Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: support@brainscan.ai</p>
                    <p>Phone: +91 98765 43210</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 BrainScan. All rights reserved.</p>
            </div>
        </section>
    );
};

export default Footer;

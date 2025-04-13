import "./Header.css";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";
import Logo from "./logo.jpg"
const Header = () => {
    const navigate = useNavigate();
  return (
    <div className="navbar-container">
        <nav>
            <ul>
                <li className="nav-item">
                    <p style={{marginLeft:"15px",fontSize:"20px",fontWeight:"900"}}>INTELLISCAN</p>
                </li>
                <li className="nav-item">
                    <Button classname={"login nav-btn"} onClick={()=>navigate('/login')}>
                        SIGN IN
                    </Button>
                    <Button classname={"login nav-btn"} onClick={()=>navigate("/login")}>
                        SIGN UP
                    </Button>
                    <Button classname={"contact nav-btn"} onClick={()=>navigate("/contact")}>
                        Contact Us
                    </Button>
                </li>
            </ul>
        </nav>
    </div>
  )
  
};
export default Header;

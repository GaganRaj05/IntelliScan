import "./Header.css";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom"
const Header = () => {
    const navigate = useNavigate();
  return (
    <div className="navbar-container">
        <nav>
            <ul>
                <li>
                    <Button classname={"login-btn"} onClick={()=>navigate('/login')}>
                        Login
                    </Button>
                </li>
            </ul>
        </nav>
    </div>
  )
  
};
export default Header;

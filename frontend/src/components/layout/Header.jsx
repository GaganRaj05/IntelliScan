import "./Header.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Login from "./Login";
import SignUp from "./SignUp";
import { useState } from "react";
import { signOut } from "../../services/auth";
const Header = () => {
  const navigate = useNavigate();
  const { user,setUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const handleLogoutClick = async(e) => {
    e.preventDefault();
    const response = await signOut();
    if(response.error) {
      toast.error("Some error occured please try again later");
      return;
    }
    setUser(null);
    toast.success("Logout successfull");
    navigate("/")
  }
  return (
    <div className="navbar-container">
      <nav>
        <ul>
          <li className="nav-item">
            <p
              style={{
                marginLeft: "15px",
                fontSize: "20px",
                fontWeight: "900",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              INTELLISCAN
            </p>
          </li>
          <li className="nav-item">
            {!user && (
              <>
                <Button
                  classname={"login nav-btn"}
                  onClick={() => setIsLoginOpen(true)}
                >
                  SIGN IN
                </Button>
                <Button
                  classname={"login nav-btn"}
                  onClick={() => setIsSignUpOpen(true)}
                >
                  SIGN UP
                </Button>
              </>
            )}
            
            <Button
              classname={"login nav-btn"}
              onClick={() => {if(!user){toast.error("Login to upload MRI Images"); return;}navigate("/upload-mri-images")}}
            >
              Upload MRI
            </Button>
            {user && 
                          <Button
                          classname={"login nav-btn"}
                          onClick={handleLogoutClick}
                        >
                          Logout
                        </Button>
            
            }
            <Button
              classname={"contact nav-btn"}
              onClick={() => toast.error("This feature is not added yet")}
            >
              Contact Us
            </Button>
          </li>
        </ul>
      </nav>
      {isLoginOpen && <Login onClose={()=>setIsLoginOpen(false)} onRegisterClick={()=>{setIsLoginOpen(false);setIsSignUpOpen(true)}}/> }
      {isSignUpOpen && <SignUp onClose={()=>setIsSignUpOpen(false)} onLoginClick={()=>{setIsSignUpOpen(false);setIsLoginOpen(true)}}/> }
    </div>
  );
};
export default Header;

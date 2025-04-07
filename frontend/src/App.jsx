import 'boxicons/css/boxicons.min.css';
import './index.css';
import { useState } from 'react';
import Login from "./components/Login";
import HomePage from './pages/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLogin} />
      ) : (
        <HomePage onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
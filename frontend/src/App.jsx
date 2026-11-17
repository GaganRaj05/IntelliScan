import { useState } from "react";
import Router from "./routes/Router";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div className="app">
      <Router />
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;

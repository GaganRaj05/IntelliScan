import 'boxicons/css/boxicons.min.css';
import Login from "./components/Login";
import HomePage from './pages/Home';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/home",
    element:<HomePage/>
  }
  
])


const App = () => {
  

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
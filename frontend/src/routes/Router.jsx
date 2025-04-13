import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/login",
        element:<HomePage/>
    }
])

const Router = () =>{
    return (
        <RouterProvider router={router}/>
    )
}
export default Router;

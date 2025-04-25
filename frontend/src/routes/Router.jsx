import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UploadMriImagesPage from "../pages/UploadMRIiMage";
import ImageResultsPage from "../pages/ImageResults";
const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/login",
        element:<HomePage/>
    },
    {
        path:"/upload-mri-images",
        element:<UploadMriImagesPage/>
    },
    {
        path:"/upload-mri-images/results",
        element:<ImageResultsPage/>
    }
])

const Router = () =>{
    return (
        <RouterProvider router={router}/>
    )
}
export default Router;

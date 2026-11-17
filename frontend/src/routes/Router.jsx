import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UploadMriImagesPage from "../pages/UploadMRIiMage";
import ImageResultsPage from "../pages/ImageResults";

import Landing from "../pages/Landing";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Landing/>
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

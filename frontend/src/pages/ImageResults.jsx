import { Navigate, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ResultDisplay from "../components/sections/ResultsDisplay";

const ImageResultsPage = () => {
  const location = useLocation();
  const response = location.state?.response;

  // Opening this URL directly (or refreshing) has no result, so send the user back to upload.
  if (!response) return <Navigate to="/upload-mri-images" replace />;

  return (
    <>
      <Header />
      <main>
        <ResultDisplay result={response} />
      </main>
      <Footer />
    </>
  );
};
export default ImageResultsPage;
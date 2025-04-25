import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useLocation } from "react-router-dom";
import ResultDisplay from "../components/sections/ResultsDisplay";
const ImageResultsPage = ()=> {
    const location = useLocation();
    const {response} = location.state;
    console.log(response);
    return (
        <>
            <Header/>
            <ResultDisplay result ={response}/>
            <Footer/>
        </>
    )
}
export default ImageResultsPage;
import Header from "../components/layout/Header";
import Hero from "../components/sections/homeSections/Hero";
import TrustStrip from "../components/sections/homeSections/TrustStrip";
import HowItWorks from "../components/sections/homeSections/HowItWorks";
import Features from "../components/sections/homeSections/Features";
import TumorTypes from "../components/sections/homeSections/TumorTypes";
import Audience from "../components/sections/homeSections/Audience";
import Stats from "../components/sections/homeSections/Stats";
import ScanDemo from "../components/sections/homeSections/ScanDemo";
import Privacy from "../components/sections/homeSections/Privacy";
import Limits from "../components/sections/homeSections/Limits";
import Faq from "../components/sections/homeSections/Faq";
import CtaBanner from "../components/sections/homeSections/CtaBanner";
import Footer from "../components/sections/homeSections/Footer";
import "./Landing.css";
import "./LandingPolish.css";

const Landing = () => (
  <>
    <Header />
    <main>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Features />
      <TumorTypes />
      <Audience />
      <Stats />
      <ScanDemo />
      <Privacy />
      <Limits />
      <Faq />
      <CtaBanner />
    </main>
    <Footer />
  </>
);

export default Landing;
import { useRef } from "react";
import HeroSection from "../../components/unregistered/HeroSection";
import Sidebar from "../../components/unregistered/Sidebar";
import AboutUs from "../../components/unregistered/aboutus/AboutUs";
import ContactSection from "../../components/unregistered/contactus/ContactSection";

const Home = ({ setShowRegModal }) => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const refSections = {
    Home: homeRef,
    AboutUs: aboutRef,
    ContactUs: contactRef,
  };

  return (
    <>
      <Sidebar refSections={refSections} />
      <HeroSection homeRef={homeRef} setShowRegModal={setShowRegModal} />
      <AboutUs aboutRef={aboutRef} />
      <ContactSection contactRef={contactRef} />
    </>
  );
};

export default Home;

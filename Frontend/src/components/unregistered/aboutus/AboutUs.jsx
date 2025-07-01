import { useState } from "react";
import { Waypoint } from "react-waypoint";
import Card from "./Card";
import wahabImg from "../../../assets/images/unregistered/team/wahab.png";
import furqanImg from "../../../assets/images/unregistered/team/furqan.png";
import ahmadImg from "../../../assets/images/unregistered/team/ahmad.png";

const AboutUs = ({ aboutRef }) => {
  const [isAboutSectionVisible, setIsAboutSectionVisible] = useState(false);

  return (
    <div ref={aboutRef} className="mt-20">
      <h1 className="text-center text-[#003366] font-black">About Us</h1>
      <div className="flex justify-center gap-10 mt-10">
        <Waypoint
          onEnter={() => setIsAboutSectionVisible(true)}
          bottomOffset="20%"
        />
        <Card
          isAboutSectionVisible={isAboutSectionVisible}
          animationName="animate__backInRight"
          animationDelay="0.2s"
          img={wahabImg}
          role="Graphics Designer"
          name="Abdul Wahab"
          bio="A creative Graphics Designer specializing in Figma, logo design, and branding. Passionate about visual storytelling, he brings ideas to life with modern and professional designs, ensuring a unique identity for every project."
        />
        <Card
          isAboutSectionVisible={isAboutSectionVisible}
          animationName="animate__rotateIn"
          animationDelay="0.8s"
          img={furqanImg}
          role="Full Stack Developer"
          name="Muhammad Furqan Cheema"
          bio="A skilled Full Stack Developer with expertise in both frontend and backend technologies. From designing interactive UI to handling robust server-side logic, he ensures seamless and high-performance web applications for a smooth user experience."
        />
        <Card
          isAboutSectionVisible={isAboutSectionVisible}
          animationName="animate__backInRight"
          animationDelay="1.5s"
          img={ahmadImg}
          role="AI & NLP Specialist"
          name="Muhammad Ahmad Butt"
          bio="An AI and NLP specialist with professional experience in artificial intelligence. Also contributes to backend development, integrating intelligent solutions into applications to enhance automation, user interaction, and data-driven decision-making"
        />
      </div>
    </div>
  );
};

export default AboutUs;

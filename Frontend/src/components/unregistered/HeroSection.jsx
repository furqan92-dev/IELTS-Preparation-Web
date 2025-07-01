import { FaArrowRight } from "react-icons/fa";
import Student from "../../assets/images/unregistered/heroSection/student.png";

const HeroSection = ({ homeRef, setShowRegModal }) => {
  return (
    <div ref={homeRef} className="flex bg-[#f5f6f8] pb-5">
      <div className="bg-[#003366] w-56 h-56 rounded-br-full"></div>
      <div className="w-1/2 pt-56" data-aos="fade-right">
        <div className="flex">
          <div className="h-5 w-1 bg-red-800 mr-5"></div>
          <p className="text-[#003366] font-black">
            LET'S LEARN ENGLISH TOGETHER
          </p>
        </div>
        <br />
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 tracking-wide drop-shadow-md !leading-tight englishExpert">
          Speak <span className="text-pink-600 englishExpert">English</span>
          <span className="block englishExpert">Like an Expert</span>
        </h1>
        <br />
        <p className="text-gray-600 text-lg font-medium max-w-md mx-auto lg:mx-0">
          "Master IELTS with expert-created learning materials and smart
          AI-based evaluation for your success."
        </p>
        <br />
        <button
          onClick={() => setShowRegModal(true)}
          className="px-6 py-3 bg-[#003366] hover:bg-[#1a4473] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Register Now
          <FaArrowRight className="ml-2 inline-block" />
        </button>
      </div>
      <div
        className="relative w-full lg:w-1/2 py-10 flex justify-center items-center mb-10 lg:mb-0 overflow-hidden"
        data-aos="fade-left"
      >
        {/* Decorative SVG */}
        <svg
          className="absolute top-[56%] right-[50%] -translate-y-1/2 translate-x-1/4 sm:translate-x-1/3 md:translate-x-1/2 w-40 sm:w-60 md:w-80 lg:w-[530px] xl:w-[650px] z-0"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="#003366"
            d="M56.4,-49.6C71.5,-35.5,80.6,-13.5,77.9,7.7C75.2,28.9,60.6,49.3,42.8,60.2C25.1,71.2,4.2,72.8,-17.2,70.4C-38.7,68.1,-60.8,61.9,-69.2,47.4C-77.5,32.8,-72,9.9,-61.4,-8.7C-50.7,-27.2,-35,-41.4,-18.1,-53.3C-1.2,-65.2,16.9,-75.9,36.6,-72.3C56.2,-68.6,77.2,-50.5,83.6,-29.5C90,-8.4,81.8,15.6,70.4,34.5C59,53.4,44.4,67.2,27.9,72.5C11.4,77.8,-6,74.5,-24.1,67.8C-42.2,61,-60.9,51,-68.2,35.6C-75.6,20.2,-71.7,-0.5,-61.5,-17.4C-51.3,-34.2,-34.9,-47.2,-18.2,-56.4C-1.5,-65.6,15.3,-70.8,32.3,-68.9C49.3,-67,66.5,-58,72.3,-43.2C78,-28.5,71.3,-8.3,59.6,5.5C48,19.3,31.3,26.7,18.2,34.6C5.2,42.4,-3.2,50.8,-15.1,52.6C-26.9,54.5,-42.2,49.7,-56.4,41.8C-70.5,33.9,-83.6,23,-86.2,10.1C-88.8,-2.9,-80.9,-17.8,-70.1,-31.1C-59.2,-44.5,-45.3,-56.3,-30.3,-59.7C-15.4,-63.1,-0.5,-58.1,13.1,-49.1C26.7,-40.1,39.7,-27.2,56.4,-49.6Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Student Image */}
        <img
          src={Student}
          alt="IELTS Student"
          className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[750px] object-contain z-10"
        />
      </div>
    </div>
  );
};

export default HeroSection;

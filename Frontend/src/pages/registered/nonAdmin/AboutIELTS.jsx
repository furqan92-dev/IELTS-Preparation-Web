import { RiExternalLinkLine } from "react-icons/ri";
import BritishCouncil from "../../../assets/images/registered/nonAdmin/aboutIELTS/British Council.webp";
import IDPEducation from "../../../assets/images/registered/nonAdmin/aboutIELTS/IDP Education.webp";
import Cambridge from "../../../assets/images/registered/nonAdmin/aboutIELTS/cambridge.webp";

const AboutIELTS = () => {
  return (
    <>
      <div className="bg-[#003366] w-full h-80 mt-28">
        <h1 className="text-white pl-64 text-7xl pt-20">
          Our global partnership
        </h1>
        <h3 className="text-white pl-64 pt-5">Trusted WorldWide</h3>
      </div>
      <p className="text-center bg-[#f1f1f0] text-2xl p-10">
        IELTS is the International English Language Testing System, trusted by
        governments, employers, and thousands of universities around the world.
      </p>
      <div className="w-5/6 mx-auto p-20">
        <p className="text-lg w-3/4 mx-auto">
          IELTS, the International English Language Testing System, was
          originally launched in 1980 (as just "ELTS"), but rapidly expanded to
          help people worldwide from 1989 when the IELTS International
          partnership was formed. For decades now IELTS has set the standard for
          English language testing to help people achieve their professional,
          personal, and academic ambitions.
          <br />
          <br />
          Jointly owned by the British Council, IDP IELTS, and Cambridge
          University Press & Assessment – our combined global presence and
          commitment to research makes us ideal providers of international
          English testing.
        </p>
        <div className="flex mt-28">
          <div className="relative w-1/2 animate__animated animate__fadeInLeft">
            <div className="bg-red-700 h-[500px] w-80"></div>
            <img
              src={BritishCouncil}
              alt=""
              className="absolute top-[15%] left-[30%]"
            />
          </div>
          <div className="w-1/2 ml-10 my-auto animate__animatedn animate__fadeInRight">
            <p className="text-4xl font-black mb-10">British Counsil</p>
            <p className="text-lg">
              The
              <a
                className="text-blue-800 font-medium hover:text-blue-500"
                href="https://takeielts.britishcouncil.org/?_gl=1*yh5pcv*_gcl_au*MTQ0MDI4MDYzMi4xNzM5MDMxMDEw*_ga*MTU3Mjg3MzIyMy4xNzM5MDMwOTk3*_ga_444SGTFNSL*MTc0MjgzOTkxNi43LjEuMTc0Mjg0MTc2MC42MC4wLjc0NTAyMTM0Nw..*_ga_X5M3D7HLQQ*MTc0MjgzOTkxNi43LjAuMTc0MjgzOTk5Ny42MC4wLjA."
              >
                <span className="underline">British Council</span>{" "}
                <RiExternalLinkLine className="inline" />
              </a>
              connects people worldwide with learning opportunities and creative
              ideas from the UK, and builds lasting relationships with other
              countries. The British Council is the UK's international
              organisation for educational opportunity and cultural relations
              and is represented in over 140 countries worldwide.
            </p>
          </div>
        </div>

        <div className="flex mt-28">
          <div className="w-1/2 ml-10 my-auto">
            <p className="text-4xl font-black mb-10">IDP Education</p>
            <p className="text-lg">
              <a
                className="text-blue-800 font-medium hover:text-blue-500"
                href="https://ielts.idp.com/"
              >
                <span className="underline">IDP</span>{" "}
                <RiExternalLinkLine className="inline" />
              </a>
              is a leader in global education services. As an Australian listed
              company, IDP operates in more than 50 countries and its websites
              attract 100 million visits a year. IDP specialises in combining
              human expertise with a leading digital platform to help people get
              accepted into their ideal course, take an English language test or
              learn English in their
            </p>
          </div>
          <div className="relative w-1/2">
            <img
              src={IDPEducation}
              alt=""
              className="absolute top-[15%] left-[5%]"
            />
            <div className="bg-red-700 h-[500px] w-80 ml-[40%]"></div>
          </div>
        </div>

        <div className="flex mt-28">
          <div className="relative w-1/2">
            <div className="bg-red-700 h-[600px] w-80"></div>
            <img
              src={Cambridge}
              alt=""
              className="absolute top-[15%] left-[30%]"
            />
          </div>
          <div className="w-1/2 ml-10 my-auto">
            <p className="text-4xl font-black mb-10">Cambridge English</p>
            <p className="text-lg">
              <a
                className="text-blue-800 font-medium hover:text-blue-500"
                href="http://www.cambridgeenglish.org/?__hstc=171110271.4fd45b3216ed81b448571697a8a80c39.1739030999250.1742835394772.1742840082886.5&__hssc=171110271.1.1742840082886&__hsfp=258915985&_gl=1*tm42ap*_gcl_au*MTQ0MDI4MDYzMi4xNzM5MDMxMDEw"
              >
                <span className="underline">Cambridge English</span>{" "}
                <RiExternalLinkLine className="inline" />
              </a>
              is part of the University of Cambridge. We develop and produce
              world-leading exams and tests for learners and teachers of
              English; 5.5 million of our assessments are taken every year* in
              more than 130 countries. Around the world over 25,000
              universities, employers, government ministries and other
              organisations rely on our exams and qualifications as proof of
              English language ability. Cambridge English exams are backed by
              over 100 years of expertise and experience in English language
              testing.
              <br />
              <br />
              Cambridge English is part of Cambridge University Press &
              Assessment – a not-for-profit organisation.
              <br />
              <br />
              *Average number of assessments delivered in the last five years.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutIELTS;

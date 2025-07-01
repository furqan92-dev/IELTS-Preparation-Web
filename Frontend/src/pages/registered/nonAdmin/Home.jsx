import RegisteredHeroSection from "../../../assets/images/registered/nonAdmin/home/RegisteredHeroSection.jpg";
import { FaBook } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProgressTracker from "../../../components/registered/nonAdmin/ProgressTracker";

const Home = ({materialsrc, materialTitle}) => {
  let accessToken = localStorage.getItem("access token");
  const decoded = jwtDecode(accessToken);
  const username = decoded.username;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="flex">
        <div className="bg-[#003366] w-[300px] h-[460px] mt-5"></div>
        <img src={RegisteredHeroSection} alt="" className="w-[1300px]" />
        <div className="bg-[#003366] w-[300px] h-[460px] mt-5"></div>
      </div>
      <div className="text-center text-blue-900 text-lg italic mt-6 px-4">
        "Master your IELTS journey with expert guidance and proven strategies!"
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-4">
        <ProgressTracker materialsrc={materialsrc} username={username} materialTitle={materialTitle} />
        <Link
          to="/learning-materials"
          className="bg-[#003366] text-white rounded-2xl p-6 flex flex-col items-center"
        >
          <FaBook className="size-28 mb-4" />
          <h2 className="font-semibold text-xl">Learning Materials</h2>
        </Link>
        <Link
          to="/tests"
          className="bg-[#003366] text-white rounded-2xl p-6 flex flex-col items-center"
        >
          <FaPencilRuler className="size-28 mb-4" />
          <h2 className="font-semibold text-xl">Test Section</h2>
        </Link>
      </div>
    </div>
  );
};
``;

export default Home;

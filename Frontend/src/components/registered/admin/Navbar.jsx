import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { formatDateCustom } from "../../../utils/formatDateCustom";
import { FcHome, FcSettings, FcExport, FcConferenceCall } from "react-icons/fc";
import { FaPencilRuler } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("access token");
    const decoded = token ? jwtDecode(token) : {};
    const username = decoded?.username;

    setUsername(username);
  }, []);

  const handleLogout = async () => {
    const currentTime = formatDateCustom(new Date());
    try {
      const resTime = await axios.post(
        "http://127.0.0.1:8000/log-activities/",
        {
          username_or_email: localStorage.getItem("username_or_email"),
          activities: {
            logout: currentTime,
          },
        }
      );
      if (resTime.status === 201) {
        logout();
        navigate("/");
      }
    } catch (error) {
      logout();
      navigate("/");
    }
  };

  return (
    <>
      <header className="fixed top-0 right-0 w-[87%] h-16 flex justify-between items-center pr-5 bg-gray-100 border-b-2">
        <div>
          <img src="IELTSLogo.png" alt="IELTS Logo" className="h-16" />
        </div>
        <div>
          <Link to="/profile">
            {/* {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : ( */}
              <FaCircleUser className="size-11 text-[#003366]" />
            {/* )} */}
          </Link>
        </div>
      </header>
      <nav className="fixed top-0 left-0 bg-[#003366] flex flex-col w-[13%] h-screen z-20 text-base">
        <div className=" py-5 px-2 text-white flex items-center gap-2 bg-[#214162]">
          {/* {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : ( */}
            <FaCircleUser className="size-14" />
          {/* )} */}
          <h4 className="font-black">{username}</h4>
        </div>
        <div className="flex flex-col justify-between flex-1 my-8">
          <div className="flex flex-col gap-8">
            <Link
              to="/"
              className="text-white px-4 font-black hover:underline flex items-center gap-4"
            >
              <FcHome className="size-5" />
              Home
            </Link>
            <Link
              to="/manage-users"
              className="text-white px-4 font-black hover:underline flex items-center gap-4"
            >
              <FcConferenceCall className="size-5" />
              Manage Users
            </Link>
            <Link
              to="/manage-resources"
              className="text-white px-4 font-black hover:underline flex items-center gap-4"
            >
              <GrResources className="text-teal-600 size-5" />
              Manage Resources
            </Link>
            <Link
              to="/manage-tests"
              className="text-white px-4 font-black hover:underline flex items-center gap-4"
            >
              <FaPencilRuler className="text-green-600 size-5" />
              Manage Tests
            </Link>
            <Link
              to="/site-settings"
              className="text-white px-4 font-black hover:underline flex items-center gap-4"
            >
              <FcSettings className="size-5" />
              Site Settings
            </Link>
          </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white px-4 font-black hover:underline flex items-center gap-4 text-base"
          >
            <FcExport className="size-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;

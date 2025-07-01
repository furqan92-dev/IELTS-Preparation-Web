import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { TbBellRingingFilled } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { formatDateCustom } from "../../../utils/formatDateCustom";
import { Badge, Dropdown, message } from "antd";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { useImage } from "../../../context/ImageContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const { image, setImage } = useImage();

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

  const handleClose = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/delete-notification/${id}`
      );
      if (res.status === 204) {
        message.success(res.data.message);
        setNotifications((prev) => prev.filter((item) => item.key !== id));
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Something went wrong");
    }
  };

  const fetchNotifications = async () => {
    try {
      const username = jwtDecode(localStorage.getItem("access token"))?.username;

      const profileRes = await axios.get(
        `http://127.0.0.1:8000/retrieve-profile/${username}/`
      );

      if (profileRes.status === 200) {
        const imagePath = profileRes.data.image;
        setImage(imagePath); // ✅ Set profile image in context
      }

      const notifyRes = await axios.get(
        "http://127.0.0.1:8000/retrieve-notification/"
      );

      const formatted = notifyRes.data.map((item) => ({
        key: item.id,
        label: (
          <div className="flex items-center justify-between gap-2">
            <span>{item.notification}</span>
            <button
              onClick={() => handleClose(item.id)}
              className="text-sm text-gray-500 hover:text-[#003366]"
            >
              <IoCloseOutline className="text-lg" />
            </button>
          </div>
        ),
      }));
      setNotifications(formatted);
    } catch (error) {
      message.error("Failed to load notifications or profile image");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <nav className="sticky top-0 backdrop-blur-md bg-white flex items-center justify-between w-full z-20 text-sm">
      <div>
        <img src="IELTSLogo.png" alt="IELTS Logo" className="h-14" />
      </div>
      <div className="flex gap-10">
        <Link
          to="/"
          className="text-[#003366] px-5 py-2 font-black hover:underline"
        >
          Home
        </Link>
        <Link
          to="/about-ielts"
          className="text-[#003366] px-5 py-2 font-black hover:underline"
        >
          About IELTS
        </Link>
        <Link
          to="/tips"
          className="text-[#003366] px-5 py-2 font-black hover:underline"
        >
          Tips
        </Link>
        <button
          onClick={handleLogout}
          className="text-[#003366] px-5 py-2 font-black hover:underline"
        >
          Logout
        </button>
      </div>
      <div className="flex items-center gap-8 py-2 h-full pr-10">
        <Dropdown
          key={notifications?.length}
          menu={{
            items:
              notifications.length > 0
                ? notifications
                : [
                    {
                      key: "no-data",
                      label: (
                        <span className="text-gray-400">No Notifications</span>
                      ),
                      disabled: true,
                    },
                  ],
          }}
          trigger={["click"]}
          placement="bottomRight"
          className="cursor-pointer p-0"
        >
          <Badge count={notifications.length} size="small">
            <TbBellRingingFilled className="text-[#003366] size-7" />
          </Badge>
        </Dropdown>
        <Link to="/profile">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaCircleUser className="size-8 text-[#003366]" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

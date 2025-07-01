import { useContext, useEffect, useState, useRef } from "react";
import { Upload, Form, Input, Button, Dropdown, message } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { useImage } from "../../../context/ImageContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef(null);
  const [tempImage, setTempImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const { image, setImage } = useImage();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const fetchProfileImage = async () => {
    const token = localStorage.getItem("access token");
    const decoded = token ? jwtDecode(token) : {};
    const username = decoded?.username;
    const email = decoded?.email;

    setUsername(username);
    setEmail(email);

    if (!username) {
      message.error("No username found");
      return;
    }

    if (image) return;

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/retrieve-profile/${username}/`
      );
      if (res.status === 200) {
        const imagePath = res.data.image;
        if (imagePath) {
          setImage(imagePath);
        } else {
          setImage("");
        }
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        message.error("Failed to load profile image");
      }
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      callback(reader.result);
    });
    reader.readAsDataURL(img);
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file, (url) => {
        setTempImage(url);
      });
    }
  };

  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  const handleEditProfile = async () => {
    console.log("Updated Profile.....")
    const accessToken = localStorage.getItem("access token");
    const decoded = jwtDecode(accessToken);
    const username = decoded.username;

    if (!username) {
      message.error("Username not found.");
      return;
    }

    if (password) {
      try {
        const passwordRes = await axios.put(
          `http://127.0.0.1:8000/reset-password/${username}/`,
          { password }
        );
        if (passwordRes.status === 200) {
          message.success(passwordRes.data.message);
          setPassword("");
        }
      } catch (err) {
        message.error("Password update failed.");
        return;
      }
    }

    if (imageRemoved) {
      try {
        const res = await axios.delete(
          `http://127.0.0.1:8000/profile/delete/${username}/`);
        if (res.status === 200) {
          message.success("Profile image removed.");
          setImage("");
          setTempImage(null);
          setImageRemoved(false);
        }
      } catch (err) {
        message.error("Failed to remove image from backend.");
      }
      return;
    }

    if (tempImage) {
      const isBase64Image = tempImage.startsWith("data:image/");
      if (!isBase64Image) {
        message.error("Invalid image format.");
        return;
      }

      try {
        const byteString = atob(tempImage.split(",")[1]);
        const mimeString = tempImage.split(";")[0].split(":")[1];
        const byteArray = new Uint8Array([...byteString].map(c => c.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: mimeString });

        const formData = new FormData();
        formData.append("username", username);
        formData.append("image", blob, `image.${mimeString.split("/")[1]}`);

        const res = await axios.post(
          `http://127.0.0.1:8000/check-and-update-profile/${username}/`,
          formData
        );

        if (res.status === 200 || res.status === 201) {
          message.success("Profile updated.");
          setImage(tempImage);
          setTempImage(null);
          setImageRemoved(false);
        }
      } catch (err) {
        console.error("Upload Error:", err);
        message.error("Image upload failed.");
      }
    }
  };

  const handleRemoveImage = () => {
    setTempImage(null);
    setImageRemoved(true); 
  };

  const handleDeleteAccount = async () => {
    const res = await axios.delete(
      `http://127.0.0.1:8000/dashboard/user/delete/${username}/`
    );

    if(res.status === 200) {
      message.success("Account deleted successfully.");
      logout();
      navigate("/");
    }
  }


  const menu = {
    items: [
      {
        key: "1",
        label: <span onClick={handleEditImage}>Edit</span>,
      },
      {
        key: "2",
        label: <span onClick={handleRemoveImage}>Remove</span>,
      },
    ],
  };

  return (
    <>
      <div className="flex justify-center relative">
        <Upload
          name="avatar"
          showUploadList={false}
          onClick={(e) => e.preventDefault()}
          className="flex justify-center mt-10"
        >
          <div className="w-[200px] h-[200px] rounded-full bg-gray-100 border-4 border-[#003366] flex items-center justify-center">
            {!imageRemoved && (tempImage || image) ? (
              <img
                src={tempImage || image}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaCircleUser className="w-full h-full text-[#003366]" />
              </div>
            )}
          </div>
        </Upload>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <div className="absolute top-48 right-[55%] z-10">
          <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
            <Button size="small" icon={<DownOutlined />} />
          </Dropdown>
        </div>
      </div>
      <Form className="mt-10">
        <div className="flex justify-center gap-20">
          <Form.Item label="Username">
            <Input
              type="text"
              value={username}
              readOnly
              placeholder="Enter Your Username"
              className="w-96 py-2 rounded-full border-[#003366]"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              value={email}
              readOnly
              placeholder="Enter Your Email"
              className="w-96 py-2 rounded-full border-[#003366]"
            />
          </Form.Item>
        </div>
        <div className="flex justify-center">
          <Form.Item label="New Password" className="mt-10 w-[65%]">
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="new-password"
              placeholder="Enter Your New Password"
              className="py-2 rounded-full border-[#003366]"
            />
          </Form.Item>
        </div>
        <div className="flex justify-center gap-5">
          <Button
            onClick={handleEditProfile}
            className="bg-[#003366] hover:!bg-[#1a4473] hover:!text-white hover:border-[#003366] text-white rounded-full px-20 !py-6"
          >
            Update Profile
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className="bg-[#003366] hover:!bg-[#1a4473] hover:!text-white hover:border-[#003366] text-white rounded-full px-20 !py-6"
          >
            Delete Account
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Profile;

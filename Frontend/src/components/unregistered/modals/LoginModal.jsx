import { useState } from "react";
import { message, Checkbox } from "antd";
import axios from "axios";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../../utils/validation";
import { useNavigate } from "react-router-dom";
import { formatDateCustom } from "../../../utils/formatDateCustom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const LoginModal = ({
  setShowRegModal,
  setShowLoginModal,
  setIsForgetPassComp,
}) => {
  const [user, setUser] = useState({
    username_or_email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("jk")
    try {
      const res = await axios.post("http://127.0.0.1:8000/login/", user);
      if (res.status === 200) {
        login(res.data.access);
        const currentTime = formatDateCustom(new Date());
        console.log("Sending:", {
          username_or_email: user.username_or_email,
          activities: [
            {
              login: currentTime,
              logout: null,
            },
          ],
        });

        console.log(":hj");

        const resTime = await axios.post(
          "http://127.0.0.1:8000/log-activities/",
          {
            username_or_email: user.username_or_email,
            activities: [
              {
                login: currentTime,
                logout: null,
              },
            ],
          }
        );

        if (resTime.status === 201) {
          console.log(currentTime);
          if (isChecked) {
            localStorage.setItem("LoginData", JSON.stringify(user));
          }
          setShowLoginModal(false);
          localStorage.setItem("access token", res.data.access);
          localStorage.setItem("refresh token", res.data.refresh);
          localStorage.setItem("username_or_email", user.username_or_email);
          message.success(res.data.message);
          console.log(user.username_or_email);
          setTimeout(() => {
            window.dispatchEvent(new Event("login"));
            window.dispatchEvent(new Event("storage"));
            navigate("/");
          }, 0);
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      message.error(error?.response?.data?.error || "Login failed.");
    }

    setUser({
      username_or_email: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center font-semibold text-[#003366] p-8">Login</h1>

        <div>
          <label htmlFor="usernameOrEmail">
            <span className="text-red-600">*</span>Username or Email
          </label>
          <input
            type="text"
            name="username_or_email"
            value={user.username_or_email}
            onChange={handleChangeInput}
            className="mt-1"
          />
        </div>

        <div className="my-6">
          <label htmlFor="password">
            <span className="text-red-600">*</span>Password
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChangeInput}
            className="mt-1"
          />
          <div className="flex justify-between font-normal">
            <Checkbox
              className="text-[#003366]"
              onChange={(e) => {
                const checked = e.target.checked;
                console.log(checked);
                setIsChecked(checked);
              }}
            >
              Remember Me
            </Checkbox>
            <button
              type="button"
              onClick={() => setIsForgetPassComp(true)}
              className="text-[#003366] hover:underline"
            >
              Forget Password
            </button>
          </div>
        </div>
        <button type="submit" className="formButton">
          Login
        </button>
      </form>

      <div className="text-center text-[#003366] font-normal m-2">
        Don't have an account?&nbsp;
        <button
          className="font-black hover:underline"
          onClick={() => {
            setShowLoginModal(false);
            setShowRegModal(true);
          }}
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default LoginModal;

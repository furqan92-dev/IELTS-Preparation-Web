import { useState } from "react";
import { message, Spin } from "antd";
import axios from "axios";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";

const RegisterModal = ({
  setShowRegModal,
  setShowLoginModal,
  setIsOtpComp,
  user,
  setUser,
  isEmailVerified,
}) => {
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    let errMsg = "";

    if (name === "username") {
      errMsg = validateUsername(value);
    } else if (name === "email") {
      errMsg = validateEmail(value);
    } else if (name === "password") {
      errMsg = validatePassword(value);
    } else if (name === "confirmPassword") {
      errMsg = validateConfirmPassword(value, user.password);
    }
    else {
      errMsg = ""
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      setErrors((prev) => ({
        ...prev,
        email: "Please verify your email",
      }));
      setTouched((prev) => ({
        ...prev,
        email: true,
      }));
      return;
    }

    try {
      setRegisterLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/register/", user);
      if (res.status === 200) {
        setShowRegModal(false);
        message.success(res.data.message);
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    const isEmailError = validateEmail(user.email);

    if (isEmailError) {
      setErrors((prev) => ({
        ...prev,
        email: isEmailError,
      }));

      setTouched((prev) => ({
        ...prev,
        email: true,
      }));

      return;
    }

    try {
      setVerifyLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/send-otp/", {
        email: user.email,
      });
      console.log(res);
      setIsOtpComp(true);
    } catch (err) {
      message.error(err.response?.data?.error || "OTP verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center font-semibold text-[#003366] p-8">
          Register
        </h1>
        <div>
          <label>
            <span className="text-red-600">*</span>Username:
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            className="mt-1"
          />
          {errors.username && touched.username ? (
            <span className="formError">{errors.username}</span>
          ) : null}
        </div>

        <div className="my-6">
          <label>
            <span className="text-red-600">*</span>Email:
          </label>
          <div className="flex relative">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              onBlur={handleBlur}
              disabled={isEmailVerified}
              className="mt-1"
            />
            <button
              type="button"
              className={`formButton absolute h-full right-0 top-0 !w-20 ${
                isEmailVerified ? "cursor-not-allowed hover:bg-[#003366]" : ""
              }`}
              onClick={handleEmailVerification}
              disabled={isEmailVerified || verifyLoading}
            >
              {verifyLoading ? (
                <Spin size="small" />
              ) : isEmailVerified ? (
                "Verified"
              ) : (
                "Verify"
              )}
            </button>
          </div>
          {errors.email && touched.email ? (
            <span className="formError">{errors.email}</span>
          ) : null}
        </div>

        <div className="my-6">
          <label>
            <span className="text-red-600">*</span>Password:
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            className="mt-1"
          />
          {errors.password && touched.password ? (
            <span className="formError">{errors.password}</span>
          ) : null}
        </div>

        <div className="my-6">
          <label>
            <span className="text-red-600">*</span>Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            className="mt-1"
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <span className="formError">{errors.confirmPassword}</span>
          ) : null}
        </div>

        <button type="submit" className="formButton">
          {registerLoading ? <Spin size="small" /> : "Register"}
        </button>
      </form>
      <div className="text-center text-[#003366] font-normal m-2">
        Already have an account?&nbsp;
        <button
          className="font-black hover:underline"
          onClick={() => {
            setShowRegModal(false);
            setShowLoginModal(true);
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default RegisterModal;

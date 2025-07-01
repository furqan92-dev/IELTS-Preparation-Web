import { useState } from "react";
import { message, Spin } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { validatePassword } from "../../../utils/validation";

const ChangePassword = ({ forgetEmail, setIsChangePassComp, setIsOtpComp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState("");

  const handleChangePassword = async () => {
    const isPasswordError = validatePassword(password);

    if (isPasswordError) {
      setError(isPasswordError);
      setTouched(true);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://127.0.0.1:8000/reset-password/${forgetEmail}/`,
        {
          password: password,
        }
      );
      if (res.status === 200) {
        message.success(res.data.message);
        setIsChangePassComp(false);
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-8 items-center">
        <button
          onClick={() => {
            setIsChangePassComp(false);
            setIsOtpComp(true);
          }}
        >
          <FaArrowLeftLong className="size-8 text-[#003366]" />
        </button>
        <h1 className="text-[#003366] text-2xl">Change Password</h1>
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5"
        />
        {error && touched ? <span className="formError">{error}</span> : null}
      </div>
      <button
        onClick={handleChangePassword}
        className="bg-[#003366] text-[#d2e8e3] rounded-lg p-2 w-full mt-5"
      >
        {isLoading ? <Spin size="small" /> : "Change Password"}
      </button>
    </>
  );
};

export default ChangePassword;

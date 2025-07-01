import { useState } from "react";
import { message, Spin } from "antd";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { validateEmail } from "../../../utils/validation";

const ForgetPassword = ({
  setIsOtpComp,
  setIsForgetPassComp,
  forgetEmail,
  setForgetEmail,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState("");

  const handleEmailVerification = async () => {
    const isEmailError = validateEmail(forgetEmail);

    if (isEmailError) {
      setError(isEmailError);
      setTouched(true);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/send-otp/", {
        email: forgetEmail,
      });
      if (res.status === 200) {
        message.success(res.data.message);
        setIsOtpComp(true);
        setIsForgetPassComp(false);
      }
    } catch (err) {
      message.error(err.response?.data?.error || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-8 items-center">
        <button onClick={() => setIsForgetPassComp(false)}>
          <FaArrowLeftLong className="size-8 text-[#003366]" />
        </button>
        <h1 className="text-[#003366] text-2xl">Forget Password</h1>
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={forgetEmail}
          placeholder="Enter Your Email"
          onChange={(e) => setForgetEmail(e.target.value)}
          className="mt-5"
        />
        {error && touched ? <span className="formError">{error}</span> : null}
      </div>
      <button
        className="bg-[#003366] text-[#d2e8e3] rounded-lg p-2 w-full mt-5"
        onClick={handleEmailVerification}
      >
        {isLoading ? <Spin size="small" /> : "Verify"}
      </button>
    </>
  );
};

export default ForgetPassword;

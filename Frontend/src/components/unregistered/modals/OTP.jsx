import { useEffect, useRef, useState } from "react";
import { Input, message, Spin } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

const OTP = ({
  setIsOtpComp,
  user,
  setIsEmailVerified,
  isForgetPassword,
  setIsChangePassComp,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    for (let i = 0; i < paste.length; i++) {
      newOtp[i] = paste[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = paste[i];
      }
    }
    setOtp(newOtp);
    if (paste.length === 6) {
      handleVerify(paste.join(""));
    }
  };

  const handleVerify = async (otpCode) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/verify-otp/", {
        email: user.email,
        otp: otpCode,
      });
      if (res.status === 200) {
        message.success(res.data.message);
        setIsOtpComp(false);

        if (isForgetPassword) {
          setIsChangePassComp(true);
        } else {
          setIsEmailVerified(true);
        }
      }
    } catch (err) {
      message.error(err.response?.data?.error || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/send-otp/", {
        email: user.email,
      });
      if (res.status === 200) {
        message.success(res.data.message);
        setTimer(120);
      }
    } catch (err) {
      message.error(err.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="leading-[80px]">
      <div className="flex gap-8 items-center">
        <button onClick={() => setIsOtpComp(false)}>
          <FaArrowLeftLong className="size-8 text-[#003366]" />
        </button>
        <h1 className="text-[#003366] text-2xl">Email Verification</h1>
      </div>
      <div
        className="flex justify-center items-center gap-5 mt-5"
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <Input
            key={index}
            maxLength={1}
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-12 text-center"
          />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-[#003366] font-semibold">
          {timer > 0
            ? `OTP will be expire in ${formatTime(timer)}. You cannot Resend`
            : "OTP has expired. You can Resend Now"}
        </p>
        <div className="flex items-center gap-2">
          <p>Didn't get code?&nbsp;</p>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`w-28 h-9 rounded-lg shadow-2xl font-semibold text-base ${
              timer > 0
                ? "hover:bg-[#003366] bg-[#003366] text-white cursor-not-allowed"
                : "bg-[#003366] hover:bg-[#1a4473] text-white"
            }`}
          >
            {loading ? <Spin size="small" /> : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;

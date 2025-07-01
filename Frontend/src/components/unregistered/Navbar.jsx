import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Modal } from "antd";
import RegisterModal from "./modals/RegisterModal";
import LoginModal from "./modals/LoginModal";
import OTP from "./modals/OTP";
import ForgetPassword from "./modals/ForgetPassword";
import ChangePassword from "./modals/ChangePassword";

const Navbar = ({ showRegModal, setShowRegModal }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOtpComp, setIsOtpComp] = useState(false);
  const [isForgetPassComp, setIsForgetPassComp] = useState(false);
  const [isChangePassComp, setIsChangePassComp] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  return (
    <nav className="fixed top-0 backdrop-blur-md bg-white flex justify-between w-full z-20 text-sm">
      <div>
        <img src="IELTSLogo.png" alt="IELTS Logo" className="h-14" />
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setShowRegModal(true)}
          className="text-[#003366] px-5 py-2 hover:underline"
        >
          Register
        </button>
        <div className="bg-[#003366] text-white rounded-s-full pl-2 pr-10">
          <FaCircleUser className="inline-block size-6" />
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-5 py-2 hover:underline"
          >
            Login
          </button>
        </div>
      </div>

      <Modal
        open={showRegModal}
        onCancel={() => {
          setShowRegModal(false);
          setIsOtpComp(false);
          setIsEmailVerified(false);
        }}
        width={400}
        footer={null}
      >
        {isOtpComp ? (
          <OTP
            setIsOtpComp={setIsOtpComp}
            user={user}
            setIsEmailVerified={setIsEmailVerified}
          />
        ) : (
          <RegisterModal
            setShowRegModal={setShowRegModal}
            setShowLoginModal={setShowLoginModal}
            setIsOtpComp={setIsOtpComp}
            user={user}
            setUser={setUser}
            isEmailVerified={isEmailVerified}
          />
        )}
      </Modal>
      <Modal
        open={showLoginModal}
        onCancel={() => {
          setShowLoginModal(false);
          setIsForgetPassComp(false);
          setIsOtpComp(false);
        }}
        width={400}
        footer={null}
      >
        {isForgetPassComp ? (
          <ForgetPassword
            setIsOtpComp={setIsOtpComp}
            setIsForgetPassComp={setIsForgetPassComp}
            forgetEmail={forgetEmail}
            setForgetEmail={setForgetEmail}
          />
        ) : isOtpComp ? (
          <OTP
            setIsOtpComp={setIsOtpComp}
            user={{ email: forgetEmail }}
            setIsEmailVerified={setIsEmailVerified}
            isForgetPassword={true}
            setIsChangePassComp={setIsChangePassComp}
          />
        ) : isChangePassComp ? (
          <ChangePassword
            forgetEmail={forgetEmail}
            setIsChangePassComp={setIsChangePassComp}
            setIsOtpComp={setIsOtpComp}
          />
        ) : (
          <LoginModal
            setShowRegModal={setShowRegModal}
            setShowLoginModal={setShowLoginModal}
            setIsForgetPassComp={setIsForgetPassComp}
          />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;

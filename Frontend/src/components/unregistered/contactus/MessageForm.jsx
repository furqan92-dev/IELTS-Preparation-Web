import { useState } from "react";
import "animate.css";
import { Waypoint } from "react-waypoint";
import { message, Spin } from "antd";
import axios from "axios";

const MessageForm = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [messageFormData, setMessageFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { id, value } = e.target;

    setMessageFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !messageFormData.email ||
      !messageFormData.subject ||
      !messageFormData.message
    ) {
      message.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/send-email/",
        messageFormData
      );
      if (res.status === 200) {
        message.success(res.data.message);
        setMessageFormData({
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      message.error(err.res.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row">
      {contextHolder}
      <Waypoint onEnter={() => setIsMessageVisible(true)} />

      {/* Left Section (Text) */}
      <div
        className={`md:w-1/2 mt-10 ${
          isMessageVisible ? "animate__animated animate__fadeInLeft" : ""
        }`}
      >
        <h2 className="text-[#003366] text-center p-0 font-black">
          Message Us
        </h2>
        <p className="w-4/5 mt-5 mx-auto text-center md:text-left">
          Have questions or need assistance? We're here to help you anytime.
          Fill out the form and we'll get back to you soon. Your feedback
          matters to us!
        </p>
      </div>

      {/* Right Section (Form) */}
      <div
        className={`md:w-1/2 ${
          isMessageVisible ? "animate__animated animate__fadeInRight" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-[#0f6466] w-4/5 md:w-2/3 mx-auto rounded-3xl mt-10 md:mt-0"
        >
          <div>
            <label htmlFor="email" className="text-[#f5f6f8] block mb-1">
              Email:
            </label>
            <input
              id="email"
              value={messageFormData.email}
              type="Email"
              onChange={handleChangeInput}
              className="bg-slate-900 text-[#f5f6f8] w-full p-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="subject" className="text-[#f5f6f8] block mb-1">
              Subject:
            </label>
            <input
              id="subject"
              value={messageFormData.subject}
              type="text"
              onChange={handleChangeInput}
              className="bg-slate-900 text-[#f5f6f8] w-full p-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="text-[#f5f6f8] block mb-1">
              Message:
            </label>
            <textarea
              id="message"
              value={messageFormData.message}
              type="text"
              rows={6}
              onChange={handleChangeInput}
              className="bg-slate-900 text-[#f5f6f8] w-full p-2 rounded-lg focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#003366] hover:bg-[#1a4473] text-[#f5f6f8] rounded-lg py-2 px-5 mt-5 shadow-2xl transition-all duration-200 ease-in-out active:scale-90"
          >
            {loading ? <Spin size="small" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;

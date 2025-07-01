import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Card = ({ isAboutSectionVisible, animationName, animationDelay, img, role, name, bio }) => {
  console.log("Card Rendered");

  return (
    <div className={`${isAboutSectionVisible ? "animate__animated " + animationName : ""} relative w-96 shadow-2xl border-8 rounded-[10%] p-5 bg-slate-300`} style={{ animationDelay }}>
      <img src={img} alt="" className="h-60 rounded-3xl mx-auto mt-2" />
      <p className="text-center m-2 text-slate-500 italic">{role}</p>
      <h4 className="text-center font-black text-[#003366] underline p-5">{name}</h4>
      <p className="text-center">{bio}</p>
      <div className="flex justify-center my-5 gap-3 bg-[#003366] text-white p-5 w-full">
        <FaTwitter />
        <FaFacebookF />
        <FaInstagram />
        <FaLinkedinIn />
      </div>
    </div>
  );
}

export default Card;
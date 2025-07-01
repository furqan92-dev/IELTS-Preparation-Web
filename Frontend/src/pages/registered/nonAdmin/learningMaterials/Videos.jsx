import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";
import ReactPlayer from "react-player";

import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const { Search } = Input;

const Pdfs = () => {
  const location = useLocation();
  const [searchBook, setSearchBook] = useState("");
  const [videos, setVideo] = useState([]);

  const materialType = location.state?.materialType || "default";

  console.log(materialType);

  const fetchBook = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/retrieve-video/${materialType}/`
      );
      console.log(res.data);
      setVideo(res.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <div className="bg-[#003366] w-full h-80 my-28 flex justify-center items-center">
        <h1 className="text-white text-7xl">{materialType} Videos</h1>
      </div>
      <div className="flex justify-end mx-24 mb-10">
        <Search
          placeholder="Search here..."
          enterButton={
            <button className="bg-[#003366] text-white h-[32.2px] px-4 rounded-r-md">
              Search
            </button>
          }
          value={searchBook}
          onChange={(e) => {
            setSearchBook(e.target.value);
          }}
          className="w-72"
        />
      </div>
      <div className="grid grid-cols-4 gap-20 mx-20 justify-center">
        {videos.map((video, index) => (
          <div key={index} className="">
            <h5 className="mb-2 font-semibold text-center text-[#003366]">
              {video.title}
            </h5>
            <ReactPlayer
              url={video.file}
              controls
              width="100%"
              height="200px"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Pdfs;

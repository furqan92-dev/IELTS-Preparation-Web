import { Link, Outlet } from "react-router-dom";
import { FaFilePdf, FaBook, FaHeadphones, FaMicrophone } from "react-icons/fa";
import { PiFilePptFill } from "react-icons/pi";
import { BiSolidVideos } from "react-icons/bi";
import { FaBookOpenReader } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";

const Cards = ({ materialType }) => {
  const materialCardsData = [
    {
      path: "/books",
      icon: (className) => <FaBook className={className} />,
      type: "Books",
    },
    {
      path: "/pdfs",
      icon: (className) => <FaFilePdf className={className} />,
      type: "PDFs",
    },
    {
      path: "/ppts",
      icon: (className) => <PiFilePptFill className={className} />,
      type: "PPTs",
    },
    {
      path: "/videos",
      icon: (className) => <BiSolidVideos className={className} />,
      type: "Videos",
    },
  ];

  const testCardsData = [
    {
      path: "/tests/listening-tests",
      icon: (className) => <FaHeadphones className={className} />,
      type: "Listening",
    },
    {
      path: "/tests/reading-tests",
      icon: (className) => <FaBookOpenReader className={className} />,
      type: "Reading",
    },
    {
      path: "/tests/writing-tests",
      icon: (className) => <TfiWrite className={className} />,
      type: "Writing",
    },
    {
      path: "/tests/speaking-tests",
      icon: (className) => <FaMicrophone className={className} />,
      type: "Speaking",
    },
  ];

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-40 p-6 mt-10">
        {(materialType?.trim() ? materialCardsData : testCardsData).map(
          (item, index) => (
            <Link
              key={index}
              to={item.path}
              state={{ materialType: materialType }}
              className="w-96 h-72 bg-[#003366] rounded-lg shadow flex flex-col items-center justify-center text-xl font-bold text-white"
            >
              {item.icon("h-32 w-32 mb-4")}
              <h1>{item.type}</h1>
            </Link>
          )
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Cards;

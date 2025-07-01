import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";

import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const { Search } = Input;

const Books = ({serMaterialsrc, setMaterialTitle}) => {
  const location = useLocation();
  const [searchBook, setSearchBook] = useState("");
  const [books, setBooks] = useState([]);

  const materialType = location.state?.materialType || "default";

  console.log(materialType);

  const fetchBook = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/retrieve-book/${materialType}/`
      );
      console.log(res);
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const openFullPDF = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <>
      <div className="bg-[#003366] w-full h-80 my-28 flex justify-center items-center">
        <h1 className="text-white text-7xl">{materialType} Books</h1>
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
          onChange={(e) => setSearchBook(e.target.value)}
          className="w-72"
        />
      </div>
      <div className="grid grid-cols-4 gap-20 mx-20 justify-center">
        {books.map((book, index) => (
          <div key={index} className="">
            <h5 className="mb-2 font-semibold text-center text-[#003366]">
              {book.title}
            </h5>

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div
                className="h-72 overflow-hidden cursor-pointer hover:shadow-md"
                onClick={() => {
                  openFullPDF(book.file)
                  setMaterialTitle(book.title)
                  serMaterialsrc(book.file)
                }}
                style={{
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <Viewer
                    fileUrl={book.file}
                    defaultScale={SpecialZoomLevel.PageFit}
                    initialPage={0}
                    renderPage={(props) => {
                      if (props.pageIndex === 0) {
                        return props.canvasLayer.children;
                      } else {
                        return null;
                      }
                    }}
                  />
                </div>
              </div>
            </Worker>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;

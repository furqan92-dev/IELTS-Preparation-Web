import { useState } from "react";
import { Input } from "antd";
import CambridgeBook1 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-1-Practice-Test.jpg";
import CambridgeBook2 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-02-Academic.jpg";
import CambridgeBook3 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-Practice-Tests-for-IELTS-3.jpg";
import CambridgeBook4 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-4.jpg";
import CambridgeBook5 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS5-with-Answers.jpg";
import CambridgeBook6 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-6.jpg";
import CambridgeBook7 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-7.jpg";
import CambridgeBook8 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-8.jpg";
import CambridgeBook9 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-9.jpg";
import CambridgeBook10 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-10.jpg";
import CambridgeBook11 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-Practice-Test-For-IELTS-11-Academic.jpg";
import CambridgeBook12 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-12-Academic.jpg";
import CambridgeBook13 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/IELTS-Cambridge-13.jpg";
import CambridgeBook14 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-14-General-Training.jpg";
import CambridgeBook15 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-15-General-Training.jpg";
import CambridgeBook16 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-16-General-Training.jpg";
import CambridgeBook18 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/IELTS-Cambridge-Book-18.jpg";
import CambridgeBook19 from "../../../../assets/images/registered/nonAdmin/cambridgeBooks/Cambridge-IELTS-19-Academic-PDF.jpg";
import CambridgePDF1 from "../../../../assets/cambridgeBooks/Cambridge-IELTS-1-Practice-Test.pdf";
import CambridgePDF2 from "../../../../assets/cambridgeBooks/Cambridge-IELTS-02-Academic.pdf";
import CambridgePDF3 from "../../../../assets/cambridgeBooks/Cambridge-Practice-Tests-for-IELTS-3.pdf";
import CambridgePDF4 from "../../../../assets/cambridgeBooks/Cambridge-IELTS-4.pdf";
import CambridgePDF5 from "../../../../assets/cambridgeBooks/Cambridge-IELTS5-with-Answers.pdf";
import CambridgePDF6 from "../../../../assets/cambridgeBooks/Cambridge-ielts-6.pdf";
import CambridgePDF7 from "../../../../assets/cambridgeBooks/Cambridge-ielts-7.pdf";
import CambridgePDF8 from "../../../../assets/cambridgeBooks/cambridge-ielts-8.pdf";
import CambridgePDF9 from "../../../../assets/cambridgeBooks/Cambridge-IELTS-9.pdf";
import CambridgePDF10 from "../../../../assets/cambridgeBooks/CAMBRIDGE-IELTS-10.pdf";
import CambridgePDF11 from "../../../../assets/cambridgeBooks/Cambridge-Practice-Test-For-IELTs-11-Academic.pdf";
import CambridgePDF12 from "../../../../assets/cambridgeBooks/Cambridge-IELTS-12-Academic.pdf";
import CambridgePDF13 from "../../../../assets/cambridgeBooks/IELTS-Cambridge-13.pdf";
import CambridgePDF14 from "../../../../assets/cambridgeBooks/Cambridge_IELTS_14_General_Training.pdf";
import CambridgePDF15 from "../../../../assets/cambridgeBooks/Cambridge_IELTS_15_General_Training.pdf";
import CambridgePDF16 from "../../../../assets/cambridgeBooks/Cambridge_IELTS_16_General_Training.pdf";
import CambridgePDF19 from "../../../../assets/cambridgeBooks/Cambridge-IELTS-19-Academic-PDF.pdf";
import CambridgePDF18 from "../../../../assets/cambridgeBooks/IELTS Cambridge Book 18.pdf";

const { Search } = Input;

const IELTSOverview = () => {
  const booksImage = [
    { name: "Cambridge IELTS 1", image: CambridgeBook1, pdf: CambridgePDF1 },
    { name: "Cambridge IELTS 2", image: CambridgeBook2, pdf: CambridgePDF2 },
    { name: "Cambridge IELTS 3", image: CambridgeBook3, pdf: CambridgePDF3 },
    { name: "Cambridge IELTS 4", image: CambridgeBook4, pdf: CambridgePDF4 },
    { name: "Cambridge IELTS 5", image: CambridgeBook5, pdf: CambridgePDF5 },
    { name: "Cambridge IELTS 6", image: CambridgeBook6, pdf: CambridgePDF6 },
    { name: "Cambridge IELTS 7", image: CambridgeBook7, pdf: CambridgePDF7 },
    { name: "Cambridge IELTS 8", image: CambridgeBook8, pdf: CambridgePDF8 },
    { name: "Cambridge IELTS 9", image: CambridgeBook9, pdf: CambridgePDF9 },
    {
      name: "Cambridge IELTS 10",
      image: CambridgeBook10,
      pdf: CambridgePDF10,
    },
    {
      name: "Cambridge IELTS 11",
      image: CambridgeBook11,
      pdf: CambridgePDF11,
    },
    {
      name: "Cambridge IELTS 12",
      image: CambridgeBook12,
      pdf: CambridgePDF12,
    },
    {
      name: "Cambridge IELTS 13",
      image: CambridgeBook13,
      pdf: CambridgePDF13,
    },
    {
      name: "Cambridge IELTS 14",
      image: CambridgeBook14,
      pdf: CambridgePDF14,
    },
    {
      name: "Cambridge IELTS 15",
      image: CambridgeBook15,
      pdf: CambridgePDF15,
    },
    {
      name: "Cambridge IELTS 16",
      image: CambridgeBook16,
      pdf: CambridgePDF16,
    },
    {
      name: "Cambridge IELTS 18",
      image: CambridgeBook18,
      pdf: CambridgePDF18,
    },
    {
      name: "Cambridge IELTS 19",
      image: CambridgeBook19,
      pdf: CambridgePDF19,
    },
  ];
  const [searchBook, setSearchBook] = useState("");

  const filteredBooks = booksImage.filter((book) =>
    book.name.toLowerCase().includes(searchBook.toLowerCase())
  );

  return (
    <>
      <div className="bg-[#003366] w-full h-80 my-28 flex justify-center items-center">
        <h1 className="text-white text-7xl">Cambridge IELTS Books</h1>
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
        {filteredBooks.map((bookImage, index) => (
          <div key={index} className="p-2 shadow rounded">
            <a href={bookImage.pdf} target="_blank" rel="noopener noreferrer">
              <h3 className="text-[#003366] mb-5">{bookImage.name}</h3>
              <img
                src={bookImage.image}
                alt={bookImage.name}
                className="w-full h-auto rounded"
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default IELTSOverview;

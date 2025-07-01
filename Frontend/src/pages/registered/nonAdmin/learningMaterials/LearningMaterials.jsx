import { Link } from "react-router-dom";
import ListeningImg from "../../../../assets/images/registered/nonAdmin/learningMaterials/ListeningImg.png";
import ReadingImg from "../../../../assets/images/registered/nonAdmin/learningMaterials/ReadingImg.png";
import SpeakingImg from "../../../../assets/images/registered/nonAdmin/learningMaterials/SpeakingImg.png";
import WritingImg from "../../../../assets/images/registered/nonAdmin/learningMaterials/WritingImg.png";
import PastPapers from "../../../../assets/images/registered/nonAdmin/learningMaterials/PastPapers.png";
import IELTSOverview from "../../../../assets/images/registered/nonAdmin/learningMaterials/IELTSOverview.png";

const materialCirclesData = [
  { title: "Listening", path: "/listening-materials", image: ListeningImg },
  { title: "Reading", path: "/reading-materials", image: ReadingImg },
  { title: "Writing", path: "/writing-materials", image: WritingImg },
  { title: "Speaking", path: "/speaking-materials", image: SpeakingImg },
  { title: "Past Papers", path: "/past-papers", image: PastPapers },
  { title: "IELTS Overview", path: "/ielts-overview", image: IELTSOverview },
];
3;
const LearningMaterials = () => {
  return (
    <>
      <div className="mt-20 grid grid-cols-4 grid-rows-2 gap-20">
        {materialCirclesData.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={item.title === "Past Papers" ? "col-start-2" : ""}
          >
            <img
              src={item.image}
              className="size-52 mx-auto bg-[#003366] text-white rounded-full p-5"
            />
            <h4 className="text-center shadow-2xl rounded-3xl p-0 px-10 border-4 border-white text-[#0f6466]">
              {item.title}
            </h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default LearningMaterials;

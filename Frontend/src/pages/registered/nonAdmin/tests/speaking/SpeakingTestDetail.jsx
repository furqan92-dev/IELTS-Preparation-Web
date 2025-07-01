import { Link } from "react-router-dom";
import speakingTestImage from "../../../../../assets/images/registered/nonAdmin/tests/SpeakingTest.jpg"

const SpeakingTestDetail = () => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Heading */}
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Speaking</h1>

      {/* Duration */}
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Duration:</h2>
        <p className="text-gray-600">11 to 14 minutes</p>
      </div>

      <div className="flex">
      <div className="w-[75%]">
      {/* Speaking Test Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Speaking Test - Introduction:</h2>
        <p className="text-gray-600 mb-4">
          The IELTS Speaking Test assesses your ability to communicate in English through a face-to-face interview. 
          It lasts 11-14 minutes and is the same for both Academic and General Training candidates. The test is recorded 
          and divided into three parts to evaluate your fluency, vocabulary, grammar, and pronunciation.
        </p>
      </div>

      {/* Structure */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Structure:</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-4">
          <li>
            <span className="font-medium">Part 1: Introduction and Interview</span>
            <ul className="list-[circle] pl-6 mt-2 space-y-2">
              <li>→ The examiner asks general questions about you (home, family, work, studies, interests).</li>
              <li>→ Lasts about 4-5 minutes.</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Part 2: Long Turn (Cue Card)</span>
            <ul className="list-[circle] pl-6 mt-2 space-y-2">
              <li>→ You are given a topic and have 1 minute to prepare.</li>
              <li>→ Then you speak for 1-2 minutes on the topic.</li>
              <li>→ Examiner may ask a quick follow-up question.</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Part 3: Discussion</span>
            <ul className="list-[circle] pl-6 mt-2 space-y-2">
              <li>→ A two-way discussion related to the Part 2 topic.</li>
              <li>→ Focuses on expressing opinions, discussing abstract ideas.</li>
              <li>→ Lasts about 4-5 minutes.</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Test Link */}
      <div className="flex justify-center">
      <Link to="/tests/speaking-tests/1" className="bg-[#003366] text-white rounded-full px-5 py-2 text-lg font-medium text-gray-700">Speaking Test</Link>
      </div>
      </div>

      {/* Image placeholder - replace with your actual image */}

      <div className="w-[25%]">
        <img 
          src={speakingTestImage} 
          alt="IELTS Speaking Test Introduction" 
          className="w-96 h-96 rounded-lg border border-gray-200"
        />
      </div>
      </div>
    </div>
  );
};

export default SpeakingTestDetail;
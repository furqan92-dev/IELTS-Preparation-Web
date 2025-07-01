import { Link } from "react-router-dom";
import readingTestImage from "../../../../../assets/images/registered/nonAdmin/tests/ReadingTestsImage.jpg";
import { READING_TEST } from "../../../../../constants/StaticConstants";

const ReadingTestDetail = () => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md max-w-6xl">
      <h1 className="text-3xl font-bold w-56 mx-auto text-white text-center bg-[#003366] rounded-full py-2 px-5 mb-6">
        Reading
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Test Format
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>60 minutes to complete the test</li>
              <li>3 reading passages with increasing difficulty</li>
              <li>40 questions total</li>
              <li>Academic and General Training versions available</li>
            </ul>
          </div>

          <div className="mb-8 bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Question Types
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Multiple choice</li>
              <li>Identifying information (True/False/Not Given)</li>
              <li>Matching headings</li>
              <li>Summary completion</li>
              <li>Sentence completion</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-6 mt-8">
            {READING_TEST.map((testQuestions, index) => (
              <Link
                key={testQuestions.id}
                to={`/tests/reading-tests/${testQuestions.id}`}
                className="text-lg font-medium text-white bg-[#003366] px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Test {index + 1}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="sticky top-4">
            <img
              src={readingTestImage}
              alt="IELTS Reading Test"
              className="w-full h-auto rounded-lg shadow-md border border-gray-200"
            />
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Tips for Success</h3>
              <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                <li>Skim the passage first to understand the main idea</li>
                <li>Look for keywords in questions</li>
                <li>Manage your time wisely</li>
                <li>Practice with authentic materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTestDetail;
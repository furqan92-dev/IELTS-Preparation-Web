import { Link } from "react-router-dom";
import writingTestImage from "../../../../../assets/images/registered/nonAdmin/tests/WritingTest1.jpg";

const WritingTestDetail = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white bg-[#003366] rounded-full py-2 px-6 inline-block">
          Writing Test
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Test Overview */}
          <div className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Test Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-medium text-blue-600">Task 1 (Academic)</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Describe visual information</li>
                  <li>150 words minimum</li>
                  <li>20 minutes recommended</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-medium text-blue-600">Task 2 (Essay)</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Write an essay response</li>
                  <li>250 words minimum</li>
                  <li>40 minutes recommended</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scoring Criteria */}
          <div className="mb-8 bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Scoring Criteria</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-green-700">Task Achievement/Response</h4>
                  <p className="text-green-600">How well you address the task requirements</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-green-700">Coherence & Cohesion</h4>
                  <p className="text-green-600">Organization and linking of ideas</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-green-700">Lexical Resource</h4>
                  <p className="text-green-600">Range and accuracy of vocabulary</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-green-700">Grammatical Range & Accuracy</h4>
                  <p className="text-green-600">Range and accuracy of grammar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/tests/writing-tests/1"
              className="text-lg font-medium text-white bg-[#003366] px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Writing Test 1
            </Link>
            <Link
              to="/tests/writing-tests/2"
              className="text-lg font-medium text-white bg-[#003366] px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Writing Test 2
            </Link>
            <Link
              to="/tests/writing-tests/3"
              className="text-lg font-medium text-white bg-[#003366] px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Writing Test 3
            </Link>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="sticky top-4 space-y-4">
            <img
              src={writingTestImage}
              alt="IELTS Writing Test"
              className="w-full rounded-lg shadow-md border border-gray-200"
            />
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Writing Tips</h3>
              <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                <li>Plan your essay before writing</li>
                <li>Use paragraphs to organize ideas</li>
                <li>Vary your sentence structures</li>
                <li>Proofread for errors</li>
                <li>Practice with a timer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingTestDetail;
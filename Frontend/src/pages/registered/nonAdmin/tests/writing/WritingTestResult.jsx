import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const WritingTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [testData, setTestData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setTestData({
        testId: location.state.testId,
        userAnswers: location.state.userAnswers,
        wordCounts: location.state.wordCounts,
        testContent: location.state.testContent
      });
      setLoading(false);
    } else {
      navigate("/tests/writing-tests");
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">No Results Found</h2>
        <p className="mt-4">Please complete a writing test to view results.</p>
        <button
          onClick={() => navigate("/tests/writing-tests")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Writing Tests
        </button>
      </div>
    );
  }

  // Prepare data for charts
  const task1RadarData = [
    { subject: 'Task Achievement', A: result.task1.bands.TA, fullMark: 9 },
    { subject: 'Coherence', A: result.task1.bands.CC, fullMark: 9 },
    { subject: 'Lexical Resource', A: result.task1.bands.LR, fullMark: 9 },
    { subject: 'Grammar', A: result.task1.bands.GRA, fullMark: 9 },
  ];

  const task2RadarData = [
    { subject: 'Task Response', A: result.task2.bands.TA, fullMark: 9 },
    { subject: 'Coherence', A: result.task2.bands.CC, fullMark: 9 },
    { subject: 'Lexical Resource', A: result.task2.bands.LR, fullMark: 9 },
    { subject: 'Grammar', A: result.task2.bands.GRA, fullMark: 9 },
  ];

  const bandComparisonData = [
    { name: 'Task 1', band: result.task1.total_band },
    { name: 'Task 2', band: result.task2.total_band },
    { name: 'Overall', band: result.combined_overall_band }
  ];

  const getBandDescriptor = (band) => {
    const descriptors = {
      9: "Expert",
      8.5: "Very Good",
      8: "Good",
      7.5: "Competent",
      7: "Adequate",
      6.5: "Modest",
      6: "Limited",
      5.5: "Basic",
      5: "Minimal",
      4.5: "Weak",
      4: "Very Weak"
    };
    return descriptors[band] || "N/A";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold">Writing Test {testData.testId} Results</h1>
          <p className="mt-2 opacity-90">Your IELTS Writing Test Performance</p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "overview" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("task1")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "task1" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Task 1 Details
            </button>
            <button
              onClick={() => setActiveTab("task2")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "task2" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Task 2 Details
            </button>
            <button
              onClick={() => setActiveTab("answers")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "answers" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Your Answers
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Overall Score Card */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Overall Score</h2>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center mb-6 md:mb-0">
                    <div className="text-5xl font-bold text-blue-600">
                      {result.combined_overall_band}
                    </div>
                    <div className="text-lg text-blue-700">
                      {getBandDescriptor(result.combined_overall_band)} Level
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={bandComparisonData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 9]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="band" fill="#3b82f6" name="Band Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Task Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task 1 Card */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Task 1 Score</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold">{result.task1.total_band}</span>
                      <span className="text-gray-500"> / 9</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Word Count: {testData.wordCounts.task1}
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={task1RadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 9]} />
                        <Radar name="Task 1" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Task 2 Card */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Task 2 Score</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold">{result.task2.total_band}</span>
                      <span className="text-gray-500"> / 9</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Word Count: {testData.wordCounts.task2}
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={task2RadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 9]} />
                        <Radar name="Task 2" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {result.combined_overall_band >= 7 ? (
                    <>
                      <p className="text-yellow-700">
                        <span className="font-bold">Excellent work!</span> You're performing at a high level. 
                        To maintain your skills:
                      </p>
                      <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                        <li>Continue practicing with a variety of question types</li>
                        <li>Refine your vocabulary with academic phrases</li>
                        <li>Work on reducing minor grammatical errors</li>
                      </ul>
                    </>
                  ) : result.combined_overall_band >= 5.5 ? (
                    <>
                      <p className="text-yellow-700">
                        <span className="font-bold">Good effort!</span> You're approaching Band 7. 
                        Focus on:
                      </p>
                      <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                        <li>Improving task response by fully addressing all parts of the question</li>
                        <li>Using a wider range of vocabulary</li>
                        <li>Practicing complex sentence structures</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-yellow-700">
                        <span className="font-bold">Areas for improvement:</span> Focus on:
                      </p>
                      <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                        <li>Understanding the question requirements fully</li>
                        <li>Building your basic grammar and vocabulary</li>
                        <li>Practicing organizing your ideas logically</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "task1" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Task 1 Detailed Evaluation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task 1 Image */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Task 1 Visual</h3>
                  <img 
                    src={testData.testContent.task1.image} 
                    alt="Task 1 Visual" 
                    className="w-full border border-gray-200 rounded-lg"
                  />
                </div>

                {/* Task 1 Criteria */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Evaluation Criteria</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-bold text-blue-800">Task Achievement: {result.task1.bands.TA}/9</h4>
                      <p className="text-blue-700">{result.task1.feedback.TA}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-bold text-green-800">Coherence & Cohesion: {result.task1.bands.CC}/9</h4>
                      <p className="text-green-700">{result.task1.feedback.CC}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-bold text-purple-800">Lexical Resource: {result.task1.bands.LR}/9</h4>
                      <p className="text-purple-700">{result.task1.feedback.LR}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-bold text-yellow-800">Grammar: {result.task1.bands.GRA}/9</h4>
                      <p className="text-yellow-700">{result.task1.feedback.GRA}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "task2" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Task 2 Detailed Evaluation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task 2 Question */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Task 2 Question</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">{testData.testContent.task2.title}</p>
                    <p className="text-gray-700">{testData.testContent.task2.instruction}</p>
                  </div>
                </div>

                {/* Task 2 Criteria */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Evaluation Criteria</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-bold text-blue-800">Task Response: {result.task2.bands.TA}/9</h4>
                      <p className="text-blue-700">{result.task2.feedback.TA}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-bold text-green-800">Coherence & Cohesion: {result.task2.bands.CC}/9</h4>
                      <p className="text-green-700">{result.task2.feedback.CC}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-bold text-purple-800">Lexical Resource: {result.task2.bands.LR}/9</h4>
                      <p className="text-purple-700">{result.task2.feedback.LR}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-bold text-yellow-800">Grammar: {result.task2.bands.GRA}/9</h4>
                      <p className="text-yellow-700">{result.task2.feedback.GRA}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "answers" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Answers</h2>
              
              {/* Task 1 Answer */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Task 1 Answer</h3>
                <div className="mb-4">
                  <p className="font-medium mb-2">Question:</p>
                  <p className="text-gray-700 mb-4">{testData.testContent.task1.title}</p>
                  <p className="text-gray-600">{testData.testContent.task1.instruction}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans">{testData.userAnswers.task1}</pre>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Word Count: {testData.wordCounts.task1}
                </div>
              </div>

              {/* Task 2 Answer */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Task 2 Answer</h3>
                <div className="mb-4">
                  <p className="font-medium mb-2">Question:</p>
                  <p className="text-gray-700 mb-4">{testData.testContent.task2.title}</p>
                  <p className="text-gray-600">{testData.testContent.task2.instruction}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans">{testData.userAnswers.task2}</pre>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Word Count: {testData.wordCounts.task2}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
          <button
            onClick={() => navigate("/tests/writing-tests")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Back to Writing Tests
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingTestResult;
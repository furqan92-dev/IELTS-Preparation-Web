import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReadingTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [testDetails, setTestDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setTestDetails({
        id: location.state.testId,
        questions: location.state.testQuestions,
        userAnswers: location.state.userAnswers
      });
    } else {
      navigate("/tests/reading-tests");
    }
  }, [location, navigate]);

  const toggleQuestionExpand = (questionNumber) => {
    setExpandedQuestions(prev =>
      prev.includes(questionNumber)
        ? prev.filter(q => q !== questionNumber)
        : [...prev, questionNumber]
    );
  };

  if (!result) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = {
    labels: ["Your Score", "Total Questions"],
    datasets: [
      {
        label: "Reading Test Performance",
        data: [result.score, 40],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Reading Test Score Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
      },
    },
  };

  // Calculate section scores
  const calculateSectionScores = () => {
    const sections = {};
    let currentQuestion = 1;
    
    ['part1', 'part2', 'part3'].forEach(part => {
      if (testDetails.questions[part]?.multipleChoice) {
        const count = testDetails.questions[part].multipleChoice.length;
        const correct = result.results.slice(currentQuestion - 1, currentQuestion - 1 + count)
          .filter(q => q.is_correct).length;
        
        sections[part] = {
          correct,
          total: count,
          percentage: Math.round((correct / count) * 100)
        };
        currentQuestion += count;
      }
    });

    return sections;
  };

  const sectionScores = calculateSectionScores();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold">Reading Test {testDetails.id} Results</h1>
          <p className="mt-2 opacity-90">Your IELTS Reading Test Performance</p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "summary" 
                  ? "border-blue-500 text-blue-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "details" 
                  ? "border-blue-500 text-blue-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Question Details
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "analysis" 
                  ? "border-blue-500 text-blue-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Section Analysis
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "summary" && (
            <div className="space-y-6">
              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800">Score</h3>
                  <p className="text-4xl font-bold text-blue-600 mt-2">
                    {result.score}/40
                  </p>
                  <p className="text-blue-500 mt-1">
                    {Math.round((result.score / 40) * 100)}% Correct
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800">Band Score</h3>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {result.band_score}
                  </p>
                  <p className="text-green-500 mt-1">
                    {result.band_score >= 7 ? "Good" : result.band_score >= 5.5 ? "Average" : "Needs Improvement"}
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <h3 className="text-lg font-semibold text-purple-800">Performance</h3>
                  <p className="text-4xl font-bold text-purple-600 mt-2">
                    {result.score >= 30 ? "Strong" : result.score >= 20 ? "Moderate" : "Weak"}
                  </p>
                  <p className="text-purple-500 mt-1">
                    {result.score >= 30 ? "Excellent reading skills!" : "Keep practicing!"}
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Bar data={chartData} options={chartOptions} />
              </div>

              {/* Band Score Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Band Score Interpretation</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Band</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">9</td>
                        <td className="px-6 py-4 whitespace-nowrap">Expert</td>
                        <td className="px-6 py-4">Fully operational command of English</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">7-8</td>
                        <td className="px-6 py-4 whitespace-nowrap">Good</td>
                        <td className="px-6 py-4">Operational command with occasional inaccuracies</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">5-6</td>
                        <td className="px-6 py-4 whitespace-nowrap">Competent</td>
                        <td className="px-6 py-4">Effective command despite inaccuracies</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">3-4</td>
                        <td className="px-6 py-4 whitespace-nowrap">Limited</td>
                        <td className="px-6 py-4">Basic competence in familiar situations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Question-by-Question Results</h3>
              <div className="space-y-4">
                {result.results.map((question, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      question.is_correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleQuestionExpand(question.question_number)}
                    >
                      <div>
                        <span className="font-medium">Question {question.question_number}: </span>
                        {question.is_correct ? (
                          <span className="text-green-600">Correct</span>
                        ) : (
                          <span className="text-red-600">Incorrect</span>
                        )}
                      </div>
                      <svg
                        className={`w-5 h-5 transform transition-transform ${
                          expandedQuestions.includes(question.question_number) ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {expandedQuestions.includes(question.question_number) && (
                      <div className="mt-3 space-y-2 pl-5">
                        <p>
                          <span className="font-medium">Your answer:</span>{" "}
                          <span className={question.is_correct ? "text-green-600" : "text-red-600"}>
                            {question.user_answer || "(No answer)"}
                          </span>
                        </p>
                        {!question.is_correct && (
                          <p>
                            <span className="font-medium">Correct answer:</span>{" "}
                            <span className="text-green-600">{question.correct_answer}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Section Performance Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(sectionScores).map(([part, score], index) => (
                  <div key={part} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Part {index + 1}</h4>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${score.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-gray-700">
                      {score.correct} / {score.total} correct ({score.percentage}%)
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      {index === 0 && "Basic reading comprehension with everyday topics."}
                      {index === 1 && "Workplace-related reading materials."}
                      {index === 2 && "Complex texts of general interest."}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="text-lg font-semibold text-yellow-800 mb-3">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {result.score >= 30 ? (
                    <>
                      <li>Your reading skills are excellent! Maintain your practice with challenging materials.</li>
                      <li>Focus on time management to ensure you can complete all sections comfortably.</li>
                    </>
                  ) : result.score >= 20 ? (
                    <>
                      <li>Focus on improving your skimming and scanning techniques.</li>
                      <li>Practice identifying keywords in questions and matching them to the text.</li>
                      <li>Work on time management to ensure you can answer all questions.</li>
                    </>
                  ) : (
                    <>
                      <li>Build your vocabulary with common IELTS reading topics.</li>
                      <li>Practice basic reading comprehension with simpler texts first.</li>
                      <li>Learn to identify different question types and their strategies.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
          <button
            onClick={() => navigate("/tests/reading-tests")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Back to Reading Tests
          </button>
          <div className="space-x-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Print Results
            </button>
            <button
              onClick={() => navigate("/tests")}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Try Another Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTestResult;
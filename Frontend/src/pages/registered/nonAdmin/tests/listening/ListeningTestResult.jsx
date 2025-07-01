import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ListeningTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [testId, setTestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.result && location.state?.testId) {
      setResult(location.state.result);
      setTestId(location.state.testId);
      setLoading(false);
    } else {
      navigate('/tests/listening-tests');
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
        <p className="mt-4">Please complete a test to view results.</p>
        <button
          onClick={() => navigate("/tests/listening-tests")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Tests
        </button>
      </div>
    );
  }

  const chartData = {
    labels: ['Your Score', 'Total Questions'],
    datasets: [
      {
        label: 'Score',
        data: [result.score, 40],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Listening Test Score Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold">Listening Test {testId} Results</h1>
          <p className="mt-2 opacity-90">Your IELTS Listening Test Performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">Score</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {result.score}/40
            </p>
            <p className="text-blue-500 mt-1">
              {Math.round((result.score / 40) * 100)}% Correct
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100">
            <h3 className="text-lg font-semibold text-green-800">Band Score</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {result.band_score}
            </p>
            <p className="text-green-500 mt-1">
              {result.band_score >= 7 ? "Good" : result.band_score >= 5.5 ? "Average" : "Needs Improvement"}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 shadow-sm border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-800">Performance</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              {result.score >= 30 ? "Strong" : result.score >= 20 ? "Moderate" : "Weak"}
            </p>
            <p className="text-purple-500 mt-1">
              {result.score >= 30 ? "You're doing great!" : result.score >= 20 ? "Keep practicing!" : "More practice needed"}
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/tests/listening-tests")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Back to Tests
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

export default ListeningTestResult;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SpeakingTestResult = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/speaking/overall-band/');
        setResults(response.data);
      } catch (err) {
        setError('Failed to fetch results. Please try again later.');
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-700 mb-6">You haven't completed any speaking tests yet.</p>
          <button
            onClick={() => navigate('/tests/speaking-tests')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Take a Speaking Test
          </button>
        </div>
      </div>
    );
  }

  // Prepare data for the doughnut chart
  const chartData = {
    labels: ['Fluency', 'Grammar', 'Vocabulary', 'Pronunciation', 'Relevance'],
    datasets: [
      {
        label: 'Score',
        data: [
          results.part1_band || 0,
          results.part2_band || 0,
          results.part3_band || 0,
          results.overall_band || 0,
          9 // Max score for reference
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const bandDescriptions = {
    9: "Expert user - Has fully operational command of the language.",
    8: "Very good user - Has fully operational command with only occasional unsystematic inaccuracies.",
    7: "Good user - Has operational command though with occasional inaccuracies.",
    6: "Competent user - Has generally effective command despite some inaccuracies.",
    5: "Modest user - Has partial command, coping with overall meaning in most situations.",
    4: "Limited user - Basic competence is limited to familiar situations.",
    3: "Extremely limited user - Conveys and understands only general meaning.",
    2: "Intermittent user - No real communication is possible.",
    1: "Non-user - Essentially has no ability to use the language.",
    0: "Did not attempt the test."
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Speaking Test Results
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Detailed analysis of your speaking performance
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800">Overall Band Score</h2>
                <p className="text-gray-600 mt-2">
                  {bandDescriptions[Math.floor(results.overall_band)] || ''}
                </p>
              </div>
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-5xl font-bold text-blue-600">
                    {results.overall_band.toFixed(1)}
                  </span>
                </div>
                <div className="absolute -bottom-2 left-0 right-0 text-center text-sm font-medium text-gray-500">
                  Band Score
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Part 1: Introduction</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-blue-600">
                {results.part1_band ? results.part1_band.toFixed(1) : 'N/A'}
              </div>
              {results.part1_band && (
                <div className="w-16 h-16">
                  <Doughnut 
                    data={{
                      labels: ['Score', 'Remaining'],
                      datasets: [{
                        data: [results.part1_band, 9 - results.part1_band],
                        backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                        borderWidth: 0
                      }]
                    }} 
                    options={{ cutout: '70%' }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Part 2: Long Turn</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-green-600">
                {results.part2_band ? results.part2_band.toFixed(1) : 'N/A'}
              </div>
              {results.part2_band && (
                <div className="w-16 h-16">
                  <Doughnut 
                    data={{
                      labels: ['Score', 'Remaining'],
                      datasets: [{
                        data: [results.part2_band, 9 - results.part2_band],
                        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                        borderWidth: 0
                      }]
                    }} 
                    options={{ cutout: '70%' }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Part 3: Discussion</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-purple-600">
                {results.part3_band ? results.part3_band.toFixed(1) : 'N/A'}
              </div>
              {results.part3_band && (
                <div className="w-16 h-16">
                  <Doughnut 
                    data={{
                      labels: ['Score', 'Remaining'],
                      datasets: [{
                        data: [results.part3_band, 9 - results.part3_band],
                        backgroundColor: ['rgba(153, 102, 255, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                        borderWidth: 0
                      }]
                    }} 
                    options={{ cutout: '70%' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Doughnut 
                  data={{
                    labels: ['Fluency', 'Remaining'],
                    datasets: [{
                      data: [results.fluency || 0, 9 - (results.fluency || 0)],
                      backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                      borderWidth: 0
                    }]
                  }} 
                  options={{ cutout: '70%' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Fluency</h3>
              <p className="text-2xl font-bold text-blue-600">{results.fluency?.toFixed(1) || 'N/A'}</p>
              <p className="text-sm text-gray-500 mt-1">Speaks smoothly with minimal hesitation</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Doughnut 
                  data={{
                    labels: ['Grammar', 'Remaining'],
                    datasets: [{
                      data: [results.grammar || 0, 9 - (results.grammar || 0)],
                      backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                      borderWidth: 0
                    }]
                  }} 
                  options={{ cutout: '70%' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Grammar</h3>
              <p className="text-2xl font-bold text-red-500">{results.grammar?.toFixed(1) || 'N/A'}</p>
              <p className="text-sm text-gray-500 mt-1">Uses accurate grammatical structures</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Doughnut 
                  data={{
                    labels: ['Vocabulary', 'Remaining'],
                    datasets: [{
                      data: [results.vocabulary || 0, 9 - (results.vocabulary || 0)],
                      backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                      borderWidth: 0
                    }]
                  }} 
                  options={{ cutout: '70%' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Vocabulary</h3>
              <p className="text-2xl font-bold text-teal-500">{results.vocabulary?.toFixed(1) || 'N/A'}</p>
              <p className="text-sm text-gray-500 mt-1">Uses wide range of words appropriately</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Doughnut 
                  data={{
                    labels: ['Pronunciation', 'Remaining'],
                    datasets: [{
                      data: [results.pronunciation || 0, 9 - (results.pronunciation || 0)],
                      backgroundColor: ['rgba(255, 206, 86, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                      borderWidth: 0
                    }]
                  }} 
                  options={{ cutout: '70%' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Pronunciation</h3>
              <p className="text-2xl font-bold text-yellow-500">{results.pronunciation?.toFixed(1) || 'N/A'}</p>
              <p className="text-sm text-gray-500 mt-1">Clear and understandable speech</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Doughnut 
                  data={{
                    labels: ['Relevance', 'Remaining'],
                    datasets: [{
                      data: [results.relevance || 0, 9 - (results.relevance || 0)],
                      backgroundColor: ['rgba(153, 102, 255, 0.7)', 'rgba(200, 200, 200, 0.3)'],
                      borderWidth: 0
                    }]
                  }} 
                  options={{ cutout: '70%' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Relevance</h3>
              <p className="text-2xl font-bold text-purple-500">{results.relevance?.toFixed(1) || 'N/A'}</p>
              <p className="text-sm text-gray-500 mt-1">Answers questions fully and appropriately</p>
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Improvement Tips</h2>
          <div className="space-y-4">
            {results.overall_band < 6 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Focus on Basics</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        • Practice speaking simple sentences with correct grammar<br />
                        • Work on basic vocabulary for common topics<br />
                        • Listen to native speakers and imitate their pronunciation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {results.overall_band >= 6 && results.overall_band < 7 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Intermediate Level Tips</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        • Expand your range of vocabulary with synonyms and idioms<br />
                        • Practice speaking for longer periods without hesitation<br />
                        • Work on linking words to connect ideas smoothly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {results.overall_band >= 7 && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Advanced Level Tips</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        • Refine your pronunciation to sound more natural<br />
                        • Use complex grammatical structures accurately<br />
                        • Develop the ability to discuss abstract topics fluently
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {results.fluency < 6 && (
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-purple-800">Fluency Focus</h3>
                    <div className="mt-2 text-sm text-purple-700">
                      <p>
                        • Record yourself speaking and identify hesitation points<br />
                        • Practice thinking in English to reduce translation time<br />
                        • Use fillers like "well", "you know" less frequently
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {results.pronunciation < 6 && (
              <div className="bg-pink-50 border-l-4 border-pink-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-pink-800">Pronunciation Focus</h3>
                    <div className="mt-2 text-sm text-pink-700">
                      <p>
                        • Practice minimal pairs (ship/sheep, bad/bed)<br />
                        • Record and compare your speech with native speakers<br />
                        • Focus on word stress and sentence rhythm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/tests/speaking-tests')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-200"
          >
            Take Another Test
          </button>
          <button
            onClick={() => navigate('/learning-materials')}
            className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-full transition duration-200"
          >
            View Learning Materials
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingTestResult;
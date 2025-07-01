import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReadingTestPart from "./ReadingTestPart";
import { READING_TEST } from "../../../../../constants/StaticConstants";
import axios from "axios";

const ReadingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPart, setCurrentPart] = useState("1");
  const [userAnswers, setUserAnswers] = useState({
    part1: {},
    part2: {},
    part3: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parts = {
    "1": "part1",
    "2": "part2",
    "3": "part3",
  };

  const testQuestions = READING_TEST.find(test => test.id === parseInt(id));

  if (!testQuestions) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Test Not Found</h2>
          <p className="mb-4">The requested reading test could not be found.</p>
          <button 
            onClick={() => navigate('/tests/reading-tests')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Reading Tests
          </button>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (part, answers) => {
    setUserAnswers(prev => ({
      ...prev,
      [part]: answers
    }));
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) return cookieValue;
    }
    return null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Flatten all answers
      const flattenedAnswers = {};
      let questionNumber = 1;
      
      Object.values(userAnswers).forEach(partAnswers => {
        Object.entries(partAnswers).forEach(([qNum, answer]) => {
          flattenedAnswers[questionNumber] = answer;
          questionNumber++;
        });
      });

      // Get correct answers
      const correctAnswers = {};
      questionNumber = 1;
      
      Object.values(testQuestions).forEach(part => {
        if (part.multipleChoice) {
          part.multipleChoice.forEach(question => {
            correctAnswers[questionNumber] = question.correctAnswers;
            questionNumber++;
          });
        }
      });

      const payload = {
        test_number: id,
        correct_answers: correctAnswers,
        user_answers: flattenedAnswers
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/api/reading/submit/',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
          }
        }
      );

      navigate('/reading-test-result', {
        state: {
          result: response.data,
          testId: id,
          testQuestions: testQuestions,
          userAnswers: flattenedAnswers
        }
      });

    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header with submit button */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Reading Test {id} - Part {currentPart}
        </h1>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg font-medium shadow ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </header>

      {/* Main test content */}
      <main className="pb-24"> {/* Extra padding for fixed navigation */}
        <ReadingTestPart
          part={parts[currentPart]}
          testQuestions={testQuestions}
          mcqs={userAnswers[parts[currentPart]]}
          setMcqs={(answers) => handleAnswerChange(parts[currentPart], answers)}
        />
      </main>

      {/* Fixed part navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-center space-x-4 p-3">
          {['1', '2', '3'].map(part => (
            <button
              key={part}
              onClick={() => setCurrentPart(part)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                currentPart === part
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Part {part}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ReadingTest;
import { useState, useEffect } from "react";
import axios from "axios";
import audio from "../../../../../assets/audios/ListeningTest1.mp3";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ListeningTest = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const testQuestions = location.state?.testQuestions;

  const [answers, setAnswers] = useState({
    fillInTheBlanks: Array(10).fill(""),
    multipleChoice: Array(20).fill(""),
    trueFalse: Array(10).fill(false),
  });

  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (section, index, value) => {
    const newAnswers = { ...answers };
    newAnswers[section][index] = value;
    setAnswers(newAnswers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await submitAnswers();
  };

  const submitAnswers = async () => {
    const formattedAnswers = {};
    const correctAnswers = {};

    answers.fillInTheBlanks.forEach((ans, index) => {
      formattedAnswers[(index + 1).toString()] = ans.trim();
      correctAnswers[(index + 1).toString()] =
        testQuestions.fillInTheBlanks[index]?.correctAnswers;
    });

    answers.multipleChoice.forEach((ans, index) => {
      formattedAnswers[(index + 11).toString()] = ans;
      correctAnswers[(index + 11).toString()] =
        testQuestions.multipleChoice[index]?.correctAnswers;
    });

    answers.trueFalse.forEach((ans, index) => {
      formattedAnswers[(index + 31).toString()] = ans ? "True" : "False";
      correctAnswers[(index + 31).toString()] =
        testQuestions.trueFalse[index]?.correctAnswers;
    });

    const payload = {
      test_number: testQuestions.id,
      correct_answers: correctAnswers,
      user_answers: formattedAnswers,
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/listening/submit/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );
      
      navigate('/listening-test-result', { 
        state: { 
          result: response.data,
          testId: id,
          testQuestions: testQuestions 
        }
      });
      
      return true;
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      return false;
    }
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const success = await submitAnswers();

    if (!success) {
      alert("Submission failed. Please check your answers and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          IELTS Listening Test {id}
        </h1>
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold">
          Time Remaining: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Listening Audio</h2>
        <audio controls className="w-full max-w-md mx-auto mb-2">
          <source src={audio} type="audio/mpeg" />
        </audio>
        <p className="text-sm text-gray-600 italic">
          Listen carefully before answering. You will hear each recording only once.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-4">
            <h2 className="text-lg font-semibold">
              Section 1: Fill in the Blanks (Questions 1-10)
            </h2>
          </div>
          <div className="space-y-4">
            {testQuestions?.fillInTheBlanks?.map((question, index) => (
              <div key={`fib-${index}`} className="flex items-start space-x-3">
                <span className="font-medium text-gray-700 min-w-[28px]">{index + 1}.</span>
                <div className="flex-1">
                  <p className="mb-2 text-gray-800">{question.question}</p>
                  <input
                    type="text"
                    className="w-full border-b-2 border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                    value={answers.fillInTheBlanks[index]}
                    onChange={(e) =>
                      handleInputChange("fillInTheBlanks", index, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-4">
            <h2 className="text-lg font-semibold">
              Section 2: Multiple Choice (Questions 11-30)
            </h2>
          </div>
          <div className="space-y-5">
            {testQuestions?.multipleChoice?.map((q, index) => (
              <div key={`mcq-${index}`} className="space-y-2">
                <p className="font-medium text-gray-800">
                  {index + 11}. {q.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                  {q.options.map((option, optIndex) => (
                    <label
                      key={`opt-${index}-${optIndex}`}
                      className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="radio"
                        name={`q-${index + 11}`}
                        value={option.charAt(0)}
                        checked={
                          answers.multipleChoice[index] === option.charAt(0)
                        }
                        onChange={() =>
                          handleInputChange("multipleChoice", index, option.charAt(0))
                        }
                        className="mt-1 h-4 w-4"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-4">
            <h2 className="text-lg font-semibold">
              Section 3: True/False (Questions 31-40)
            </h2>
          </div>
          <div className="space-y-4">
            {testQuestions?.trueFalse?.map((item, index) => (
              <div key={`tf-${index}`} className="flex items-start space-x-3">
                <span className="font-medium text-gray-700 min-w-[28px]">{index + 31}.</span>
                <div className="flex-1">
                  <p className="mb-3 text-gray-800">{item.statement}</p>
                  <div className="flex space-x-6 ml-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`tf-${index}`}
                        value="True"
                        checked={answers.trueFalse[index] === true}
                        onChange={() =>
                          handleInputChange("trueFalse", index, true)
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-gray-700">True</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`tf-${index}`}
                        value="False"
                        checked={answers.trueFalse[index] === false}
                        onChange={() =>
                          handleInputChange("trueFalse", index, false)
                        }
                        required
                        className="h-4 w-4"
                      />
                      <span className="text-gray-700">False</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#003366] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Answers"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListeningTest;
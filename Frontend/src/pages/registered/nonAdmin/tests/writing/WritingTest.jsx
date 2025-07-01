import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WritingTest1Image from "../../../../../assets/images/registered/nonAdmin/tests/HospitalMapComparison.jpg";
import WritingTest2Image from "../../../../../assets/images/registered/nonAdmin/tests/WritingTest2.jpg";
import WritingTest3Image from "../../../../../assets/images/registered/nonAdmin/tests/WritingTest3.jpg";


const WritingTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    task1: "",
    task2: ""
  });
  const [wordCounts, setWordCounts] = useState({
    task1: 0,
    task2: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  // Test content based on test ID
  const testContent = {
    1: {
      task1: {
        title: "The chart below shows the percentage of people accessing news via different media in one country in 2013, 2015, and 2017.",
        instruction: "Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150,
        image: WritingTest1Image
      },
      task2: {
        title: "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?",
        instruction: "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
        minWords: 250
      }
    },
    2: {
      task1: {
        title: "The diagrams below show the changes that have taken place at West Park Secondary School since its construction in 1950.",
        instruction: "Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150,
        image: WritingTest2Image
      },
      task2: {
        title: "Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime.",
        instruction: "Discuss both views and give your opinion.",
        minWords: 250
      }
    },
    3: {
      task1: {
        title: "The plans below show the layout of a university's sports centre now, and how it will look after redevelopment.",
        instruction: "Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150,
        image: WritingTest3Image
      },
      task2: {
        title: "In spite of the advances made in agriculture, many people around the world still go hungry. Why is this the case? What can be done about this problem?",
        instruction: "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
        minWords: 250
      }
    }
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update word count
    const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
    setWordCounts(prev => ({
      ...prev,
      [name]: wordCount
    }));
  };

  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await submitAnswers();
    alert("Time is up! Your answers have been automatically submitted.");
  };

  const submitAnswers = async () => {
    const payload = {
      test_set: parseInt(id),
      task1: answers.task1,
      task2: answers.task2
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/writing/evaluate/",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      navigate("/writing-test-result", {
        state: {
          result: response.data,
          testId: id,
          userAnswers: answers,
          wordCounts: wordCounts,
          testContent: testContent[id]
        }
      });

    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    submitAnswers();
  };

  const currentTest = testContent[id] || testContent[1];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          IELTS Writing Test {id}
        </h1>
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold">
          Time Remaining: {formatTime(timeLeft)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Task 1 Section */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">
                Task 1: Academic Writing
              </h2>
              <p className="mb-4 text-gray-700">
                {currentTest.task1.title}
              </p>
              <p className="mb-4 text-gray-600">
                {currentTest.task1.instruction}
                <span className="font-bold"> Write at least {currentTest.task1.minWords} words.</span>
              </p>
              
              <div className="mb-4">
                <textarea
                  name="task1"
                  value={answers.task1}
                  onChange={handleChange}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your Task 1 response here..."
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    Word Count: {wordCounts.task1}
                  </span>
                  <span className={`text-sm ${
                    wordCounts.task1 < currentTest.task1.minWords ? "text-red-500" : "text-green-500"
                  }`}>
                    {wordCounts.task1 < currentTest.task1.minWords 
                      ? `Minimum ${currentTest.task1.minWords} words required` 
                      : "Word count OK"}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img 
                src={currentTest.task1.image} 
                alt="Task 1 Visual" 
                className="max-h-96 object-contain border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Task 2 Section */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Task 2: Essay Writing
          </h2>
          <p className="mb-4 text-gray-700">
            {currentTest.task2.title}
          </p>
          <p className="mb-4 text-gray-600">
            {currentTest.task2.instruction}
            <span className="font-bold"> Write at least {currentTest.task2.minWords} words.</span>
          </p>
          
          <div className="mb-4">
            <textarea
              name="task2"
              value={answers.task2}
              onChange={handleChange}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your Task 2 response here..."
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                Word Count: {wordCounts.task2}
              </span>
              <span className={`text-sm ${
                wordCounts.task2 < currentTest.task2.minWords ? "text-red-500" : "text-green-500"
              }`}>
                {wordCounts.task2 < currentTest.task2.minWords 
                  ? `Minimum ${currentTest.task2.minWords} words required` 
                  : "Word count OK"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritingTest;
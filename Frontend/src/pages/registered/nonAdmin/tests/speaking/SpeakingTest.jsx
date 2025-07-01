import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IELTSSpeakingTest = () => {
  // State management
  const [testStage, setTestStage] = useState('welcome');
  const [questions, setQuestions] = useState({ part1: [], part2: [], part3: [] });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPart, setCurrentPart] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [overallBand, setOverallBand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  
  // Refs
  const recorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const currentPartRef = useRef(currentPart);
  const questionIndexRef = useRef(questionIndex);

  // Navigation
  const navigate = useNavigate();

  // API configuration
  const API_URL = 'http://localhost:8000';

  // Initialize speech recognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  useEffect(() => {
    if (questions?.part1?.length > 0 && testStage === 'part1') {
      setCurrentQuestion(questions.part1[0]);
      startQuestionTimer(questions.part1[0].time);
    }
  }, [questions]);

  useEffect(() => {
    currentPartRef.current = currentPart;
  }, [currentPart]);

  useEffect(() => {
    questionIndexRef.current = questionIndex;
  }, [questionIndex]);

  // Fetch questions from backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/speaking/questions/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  };

  // Start the test
  const startTest = async () => {
    setLoading(true);
    try {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setCurrentPart('part1');
      setCurrentQuestion(fetchedQuestions.part1[0]);
      setTestStage('part1');
      setQuestionIndex(0);
      startQuestionTimer(fetchedQuestions.part1[0].time);
    } catch (error) {
      alert('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timer management
  const startQuestionTimer = (duration) => {
    clearInterval(timerRef.current);
    setTimer(duration);

    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeEnd = () => {
    const part = currentPartRef.current;
    const index = questionIndexRef.current;
    const currentPartQuestions = questions?.[part] || [];

    if (currentPartQuestions.length === 0) {
      finishTest();
      return;
    }

    if (index + 1 < currentPartQuestions.length) {
      const nextQuestionIndex = index + 1;
      setQuestionIndex(nextQuestionIndex);
      setCurrentQuestion(currentPartQuestions[nextQuestionIndex]);
      startQuestionTimer(currentPartQuestions[nextQuestionIndex].time);
    } else {
      if (part === 'part1' && questions.part2?.length > 0) {
        setCurrentPart('part2');
        setCurrentQuestion(questions.part2[0]);
        setQuestionIndex(0);
        setTestStage('part2-prep');
        startQuestionTimer(questions.part2[0].prep_time || 60);
      } else if (part === 'part2' && questions.part3?.length > 0) {
        setCurrentPart('part3');
        setCurrentQuestion(questions.part3[0]);
        setQuestionIndex(0);
        setTestStage('part3');
        startQuestionTimer(questions.part3[0].time || 45);
      } else {
        finishTest();
      }
    }
  };

  // Handle recording
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new MediaRecorder(stream);
      
      recorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      recorderRef.current.onstop = processRecording;
      recorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Microphone access denied. Please enable permissions.');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
      recorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  // Process recording
  const processRecording = () => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      evaluateResponse(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      const manualText = prompt('Could not transcribe audio. Please type your response:');
      if (manualText) evaluateResponse(manualText);
    };
    
    recognition.start();
  };

  // Evaluate response
  const evaluateResponse = async (responseText) => {
    if (!responseText.trim()) {
      alert('Empty response detected. Please try again.');
      proceedToNext();
      return;
    }

    setLoading(true);
    try {
      let endpoint;
      switch(currentPart) {
        case 'part1': endpoint = `${API_URL}/api/speaking/part1/evaluate/`; break;
        case 'part2': endpoint = `${API_URL}/api/speaking/part2/evaluate/`; break;
        case 'part3': endpoint = `${API_URL}/api/speaking/part3/evaluate/`; break;
        default: throw new Error('Invalid test part');
      }

      const response = await axios.post(endpoint, {
        question: currentQuestion.question,
        response: responseText
      });

      setEvaluationResults(prev => [...prev, {
        ...response.data,
        part: currentPart,
        question: currentQuestion.question
      }]);
    } catch (error) {
      console.error('Evaluation error:', error);
      alert('Evaluation failed. Please try again.');
    } finally {
      setLoading(false);
      proceedToNext();
    }
  };

  // Test progression
  const proceedToNext = () => {
    if (currentPart === 'part1') {
      if (questionIndex < questions.part1.length - 1) {
        const nextIndex = questionIndex + 1;
        setQuestionIndex(nextIndex);
        setCurrentQuestion(questions.part1[nextIndex]);
        startQuestionTimer(questions.part1[nextIndex].time);
      } else {
        setTestStage('part2-prep');
        startQuestionTimer(questions.part2[0]?.prep_time || 60);
        setNotes('');
      }
    } 
    else if (currentPart === 'part2') {
      setTestStage('part3');
      setCurrentPart('part3');
      setQuestionIndex(0);
      setCurrentQuestion(questions.part3[0]);
      startQuestionTimer(questions.part3[0]?.time || 45);
    }
    else if (currentPart === 'part3') {
      if (questionIndex < questions.part3.length - 1) {
        const nextIndex = questionIndex + 1;
        setQuestionIndex(nextIndex);
        setCurrentQuestion(questions.part3[nextIndex]);
        startQuestionTimer(questions.part3[nextIndex].time);
      } else {
        finishTest();
      }
    }
  };

  const startPart2 = () => {
    setTestStage('part2');
    setCurrentPart('part2');
    setCurrentQuestion(questions.part2[0]);
    startQuestionTimer(questions.part2[0]?.time || 120);
  };

  const finishTest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/speaking/overall-band/`);
      setOverallBand(response.data);
      navigate('/speaking-test-result');
    } catch (error) {
      console.error('Results error:', error);
      alert('Could not load final results.');
    } finally {
      setLoading(false);
    }
  };

  // UI Components
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">IELTS Speaking Test</h1>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full mb-8">
        <p className="text-lg mb-4">This test consists of three parts:</p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <strong className="text-blue-600 mr-2">Part 1:</strong>
            <span>Introduction and Interview (4-5 minutes)</span>
          </li>
          <li className="flex items-start">
            <strong className="text-blue-600 mr-2">Part 2:</strong>
            <span>Long Turn (3-4 minutes)</span>
          </li>
          <li className="flex items-start">
            <strong className="text-blue-600 mr-2">Part 3:</strong>
            <span>Discussion (4-5 minutes)</span>
          </li>
        </ul>
      </div>
      <button 
        onClick={startTest} 
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Start Test'}
      </button>
    </div>
  );

  const QuestionScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between w-full max-w-3xl mb-8">
        <div></div>
        <div className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          {currentPart === "part1"
            ? "Part 1: Introduction and Interview"
            : currentPart === "part2"
            ? "Part 2: Long Turn"
            : currentPart === "part3"
            ? "Part 3: Discussion"
            : ""}
        </div>
        <div>
          <button onClick={() => handleTimeEnd(questions)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 w-full disabled:opacity-50">
            {timer <= 0 ? "Next button" : `${timer}s remaining`}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">{currentQuestion?.question}</h3>
      </div>

      <div className="w-full max-w-3xl">
        {!isRecording ? (
          <button 
            onClick={startRecording}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 w-full disabled:opacity-50"
            disabled={loading}
          >
            Start Recording
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4 text-red-600 font-medium">
              <span className="animate-pulse h-3 w-3 rounded-full bg-red-600 mr-2"></span>
              Recording...
            </div>
            <button 
              onClick={stopRecording}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 w-full disabled:opacity-50"
              disabled={loading}
            >
              Stop Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const Part2Preparation = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Part 2 Preparation</h2>
      <div className="bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-full mb-8">
        Preparation time: {timer}s
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{questions.part2[0]?.question}</h3>
        <p className="text-blue-600 font-medium">
          You will speak for {questions.part2[0]?.time || 120} seconds
        </p>
      </div>

      <div className="w-full max-w-3xl mb-8">
        <label className="block text-gray-700 font-medium mb-2">Make notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your ideas here..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button 
        onClick={startPart2}
        disabled={timer > 0}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 disabled:opacity-50 w-full max-w-3xl"
      >
        {timer > 0 ? `Preparation time remaining... (${timer}s)` : 'Begin Speaking'}
      </button>
    </div>
  );

  // Main render
  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-white text-lg">Processing...</p>
        </div>
      )}

      {testStage === 'welcome' && <WelcomeScreen />}
      {['part1', 'part2', 'part3'].includes(testStage) && <QuestionScreen />}
      {testStage === 'part2-prep' && <Part2Preparation />}
    </div>
  );
};

export default IELTSSpeakingTest;
import { Radio, Cascader } from "antd";
import { useEffect, useRef } from "react";

const ReadingTestPart = ({ part, testQuestions, mcqs, setMcqs }) => {
  const passageRef = useRef(null);
  
  // Scroll to top when part changes
  useEffect(() => {
    if (passageRef.current) {
      passageRef.current.scrollTo(0, 0);
    }
  }, [part]);

  const handleMcqChange = (e, index) => {
    setMcqs({
      ...mcqs,
      [index + 1]: e.target.value,
    });
  };

  const handleSummaryChange = (e, index) => {
    setMcqs({
      ...mcqs,
      [index + 1]: e.target.value,
    });
  };

  const handleMatchingChange = (value, index) => {
    setMcqs({
      ...mcqs,
      [index + 1]: value[0], // Cascader returns array, we take first value
    });
  };

  // Calculate question numbering
  const calculateQuestionNumbers = () => {
    let mcqStart = 1;
    let summaryStart = mcqStart + (testQuestions[part]?.multipleChoice?.length || 0);
    let matchingStart = summaryStart + (testQuestions[part]?.summaryCompletion?.correctAnswers?.length || 0);

    return { mcqStart, summaryStart, matchingStart };
  };

  const { mcqStart, summaryStart, matchingStart } = calculateQuestionNumbers();

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-180px)]">
      {/* Passage Section */}
      <div 
        ref={passageRef}
        className="md:w-1/2 p-6 overflow-y-auto bg-white border-r border-gray-200"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          {testQuestions[part]?.title}
        </h2>
        <div className="prose max-w-none">
          {testQuestions[part]?.passage?.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-justify">{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Questions Section */}
      <div className="md:w-1/2 p-6 overflow-y-auto">
        {/* Multiple Choice Questions */}
        {testQuestions[part]?.multipleChoice?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Questions {mcqStart}-{mcqStart + testQuestions[part].multipleChoice.length - 1}
            </h3>
            <p className="mb-4 text-gray-600">
              Choose the correct letter <strong>A, B, C</strong> or <strong>D</strong>.
            </p>

            {testQuestions[part].multipleChoice.map((question, index) => (
              <div key={index} className="mb-6">
                <p className="font-medium text-gray-800 mb-2">
                  {mcqStart + index}. {question.question}
                </p>
                <Radio.Group
                  onChange={(e) => handleMcqChange(e, index)}
                  value={mcqs[index + 1]}
                  className="flex flex-col gap-3"
                >
                  {question.options.map((option, optIndex) => (
                    <Radio 
                      key={optIndex} 
                      value={optIndex + 1}
                      className="radio-custom"
                    >
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            ))}
          </div>
        )}

        {/* Summary Completion */}
        {testQuestions[part]?.summaryCompletion && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Questions {summaryStart}-{summaryStart + testQuestions[part].summaryCompletion.correctAnswers.length - 1}
            </h3>
            <p className="mb-4 text-gray-600">
              Complete the summary using words from the passage.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              {testQuestions[part].summaryCompletion.summary
                .split('______')
                .map((text, index) => (
                  <span key={index}>
                    {text}
                    {index < testQuestions[part].summaryCompletion.correctAnswers.length && (
                      <input
                        type="text"
                        value={mcqs[summaryStart + index] || ''}
                        onChange={(e) => handleSummaryChange(e, summaryStart + index - 1)}
                        className="inline-block mx-1 px-2 py-1 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-24"
                      />
                    )}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Sentence Matching */}
        {testQuestions[part]?.sentenceMatching && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Questions {matchingStart}-{matchingStart + testQuestions[part].sentenceMatching.questions.length - 1}
            </h3>
            <p className="mb-4 text-gray-600">
              Match each statement with the correct option.
            </p>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Options:</h4>
              {testQuestions[part].sentenceMatching.options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} rounded mb-2`}
                >
                  <span className="font-bold mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {testQuestions[part].sentenceMatching.questions.map((question, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="font-bold mt-1">{matchingStart + index}.</span>
                  <div className="flex-1">
                    <p className="mb-2">{question}</p>
                    <Cascader
                      options={testQuestions[part].sentenceMatching.options.map((_, idx) => ({
                        value: String.fromCharCode(65 + idx),
                        label: String.fromCharCode(65 + idx),
                      }))}
                      onChange={(value) => handleMatchingChange(value, matchingStart + index - 1)}
                      value={mcqs[matchingStart + index] ? [mcqs[matchingStart + index]] : undefined}
                      placeholder="Select option"
                      className="w-32"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingTestPart;
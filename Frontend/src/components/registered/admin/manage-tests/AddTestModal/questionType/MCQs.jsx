import { useState } from "react";
import { Form, Input, Radio } from "antd";
import AddQuestionButton from "./common/AddQuestionButton";

const MCQs = ({ questions, setQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleQuestionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) =>
    setCurrentQuestion((prev) => {
      const updatedOptions = prev.options.map((opt, i) =>
        i === index ? value : opt
      );

      const wasCorrectAnswer = prev.correctAnswer === prev.options[index];
      return {
        ...prev,
        options: updatedOptions,
        correctAnswer: wasCorrectAnswer ? "" : prev.correctAnswer,
      };
    });

  const handleCorrectAnswerChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswer: e.target.value,
    }));
  };

  return (
    <ul>
      <li className="border px-4 rounded-md shadow">
        <Form.Item
          label={`Multiple Choice Question ${currentIndex + 1}/10`}
          name={`mcq-question-${currentIndex}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="text"
            name={`mcq-question-${currentIndex}`}
            placeholder="Question"
            className="w-full border px-3 py-2 mb-4"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
          />
        </Form.Item>

        {currentQuestion.options.map((option, index) => (
          <div key={index} className="my-2 flex flex-col gap-1">
            <Form.Item
              label={`Option ${index + 1}`}
              name={`option-${currentIndex}-${index}`}
            >
              <Input
                type="text"
                name={`option-${currentIndex}-${index}`}
                placeholder={`Option ${index + 1}`}
                className="w-full border px-3 py-1"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </Form.Item>
          </div>
        ))}

        <Form.Item
          label="Select Correct Option"
          name={`correctAnswer-${currentIndex}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Radio.Group
            value={currentQuestion.correctAnswer}
            onChange={handleCorrectAnswerChange}
          >
            {currentQuestion.options.map((option, index) => (
              <Radio key={index} value={option}>
                {option || `Option ${index + 1}`}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <AddQuestionButton
          currentIndex={currentIndex}
          currentQuestion={currentQuestion}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestion={setCurrentQuestion}
          questions={questions}
          setQuestions={setQuestions}
          questionType="mcqs"
        />
      </li>
    </ul>
  );
};

export default MCQs;

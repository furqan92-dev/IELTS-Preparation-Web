import { useState } from "react";
import { Form, Input, Radio } from "antd";
import AddQuestionButton from "./common/AddQuestionButton";

const TrueFalse = ({ questions, setQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    correctAnswer: "",
  });

  const handleQuestionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

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
          label={`True/False Question ${currentIndex + 1}/10`}
          name={`truefalse-question-${currentIndex}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="text"
            name={`truefalse-question-${currentIndex}`}
            placeholder="Question"
            className="w-full border px-3 py-2 mb-4"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
          />
        </Form.Item>
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
            <Radio key={0} value="True">
              True
            </Radio>
            <Radio key={1} value="False">
              False
            </Radio>
          </Radio.Group>
        </Form.Item>
        <AddQuestionButton
          currentIndex={currentIndex}
          currentQuestion={currentQuestion}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestion={setCurrentQuestion}
          questions={questions}
          setQuestions={setQuestions}
          questionType="truefalse"
        />
      </li>
    </ul>
  );
};

export default TrueFalse;

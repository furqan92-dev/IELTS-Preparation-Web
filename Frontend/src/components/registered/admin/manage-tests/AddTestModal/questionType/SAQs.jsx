import { useState } from "react";
import { Form, Input } from "antd";
import AddQuestionButton from "./common/AddQuestionButton";

const SAQs = ({ questions, setQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
  });

  const handleQuestionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  return (
    <ul>
      <li className="border px-4 rounded-md shadow">
        <Form.Item
          label={`Short Question Answer ${currentIndex + 1}/10`}
          name={`saq-question-${currentIndex}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="text"
            name={`saq-question-${currentIndex}`}
            placeholder="Question"
            className="w-full border px-3 py-2 mb-4"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
          />
        </Form.Item>
        <AddQuestionButton
          currentIndex={currentIndex}
          currentQuestion={currentQuestion}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestion={setCurrentQuestion}
          questions={questions}
          setQuestions={setQuestions}
          questionType="saq"
        />
      </li>
    </ul>
  );
};

export default SAQs;

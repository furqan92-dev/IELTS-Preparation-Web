import { useState } from "react";
import { Form, Input, Button, Pagination } from "antd";
import AddQuestionButton from "./common/AddQuestionButton";

const Blanks = ({ questions, setQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleBlankIndex, setVisibleBlankIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    correctAnswers: [],
  });

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    const blankMatches = value.match(/\[\[blank\]\]/g) || [];
    const blankCount = blankMatches.length;

    setCurrentQuestion((prev) => {
      let updatedAnswers = [...prev.correctAnswers];

      if (blankCount < updatedAnswers.length) {
        updatedAnswers.length = blankCount;
      } else {
        while (updatedAnswers.length < blankCount) {
          updatedAnswers.push("");
        }
      }

      return {
        ...prev,
        question: value,
        correctAnswers: updatedAnswers,
      };
    });

    setVisibleBlankIndex((prev) => {
      if (blankCount === 0) return 0;
      if (prev >= blankCount) return blankCount - 1;
      return prev;
    });
  };

  const handleInsertBlank = () => {
    setCurrentQuestion((prev) => {
      const updatedQuestion = {
        ...prev,
        question: prev.question + " [[blank]] ",
        correctAnswers: [...prev.correctAnswers, ""],
      };

      setVisibleBlankIndex(updatedQuestion.correctAnswers.length - 1);

      return updatedQuestion;
    });
  };

  const handleCorrectAnswerChange = (e) => {
    const updatedAnswers = [...currentQuestion.correctAnswers];
    updatedAnswers[visibleBlankIndex] = e.target.value;

    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswers: updatedAnswers,
    }));
  };

  return (
    <ul>
      <li className="border px-4 rounded-md shadow">
        <Form.Item
          label={`Fill in the Blanks Question ${currentIndex + 1}/10`}
          name={`blank-question-${currentIndex}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="text"
            name={`blank-question-${currentIndex}`}
            placeholder="Question"
            className="w-full border px-3 py-2 mb-2"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
          />
          <Button
            style={{
              backgroundColor: "#003366",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "2px solid #1a4473",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1a4473";
              e.target.style.borderColor = "#003366";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#003366";
              e.target.style.borderColor = "#1a4473";
            }}
            onClick={handleInsertBlank}
          >
            Insert Blank
          </Button>
        </Form.Item>

        {currentQuestion.correctAnswers.length > 0 && (
          <>
            <Form.Item
              label={`Correct Answer for Blank ${visibleBlankIndex + 1}`}
              name={`correctAnswer-${currentIndex}-${visibleBlankIndex}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                type="text"
                value={currentQuestion.correctAnswers[visibleBlankIndex]}
                placeholder={`Answer for Blank ${visibleBlankIndex + 1}`}
                onChange={handleCorrectAnswerChange}
              />
            </Form.Item>

            <Pagination
              current={visibleBlankIndex + 1}
              total={currentQuestion.correctAnswers?.length || 0}
              pageSize={1}
              onChange={(page) => setVisibleBlankIndex(page - 1)}
              className="mt-2 flex justify-end"
              size="small"
            />
          </>
        )}

        <AddQuestionButton
          currentIndex={currentIndex}
          currentQuestion={currentQuestion}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestion={setCurrentQuestion}
          questions={questions}
          setQuestions={setQuestions}
          questionType="blanks"
        />
      </li>
    </ul>
  );
};

export default Blanks;

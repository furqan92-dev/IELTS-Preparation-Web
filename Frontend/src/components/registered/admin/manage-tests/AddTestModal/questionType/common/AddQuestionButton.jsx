import { useState } from "react";
import { Form, Button, message } from "antd";

const AddQuestionButton = ({
  currentIndex,
  currentQuestion,
  setCurrentIndex,
  setCurrentQuestion,
  questions,
  setQuestions,
  questionType,
}) => {
  const [allSaved, setAllSaved] = useState(false);

  const handleAddQuestion = () => {
    const { question, correctAnswer } = currentQuestion;

    if (!question.trim())
      return message.error("Question field must be filled.");

    if (
      (questionType === "blanks" || questionType === "sentenceCompletion") &&
      !question.includes("[[blank]]")
    ) {
      message.error("Please insert the blank using the 'Insert Blank' button.");
      return;
    }

    if (
      [
        ...(currentQuestion.options || []),
        ...(currentQuestion.optionsPerBlank || []).flat(),
      ].some((opt) => !opt.trim())
    ) {
      return message.error("All option fields must be filled.");
    }

    if (questionType === "sentenceCompletion") {
      if (
        !currentQuestion.correctAnswers ||
        !Array.isArray(currentQuestion.correctAnswers) ||
        currentQuestion.correctAnswers.some((ans) => !ans || !ans.trim())
      ) {
        return message.error("All blanks must have correct answers.");
      }
    } else if (questionType === "mcqs" || questionType === "truefalse") {
      if (!correctAnswer || !correctAnswer.trim()) {
        return message.error("Correct answer must be provided.");
      }
    } else if (questionType === "blanks") {
      if (
        !currentQuestion.correctAnswers ||
        currentQuestion.correctAnswers.some((ans) => !ans || !ans.trim())
      ) {
        return message.error("All blanks must have correct answers.");
      }
    }

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = currentQuestion;
    setQuestions(updatedQuestions);

    if (currentIndex < 9) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentQuestion({
        question: "",
        ...(questionType === "mcqs" || questionType === "truefalse"
          ? { options: ["", "", "", ""], correctAnswer: "" }
          : {}),
        ...(questionType === "blanks" ? { correctAnswers: [] } : {}),
      });
    } else {
      message.success("All questions saved!");
      setAllSaved(true);
    }
  };

  return (
    <Form.Item>
      <Button
        style={{
          backgroundColor: "#003366",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "2px solid #1a4473",
        }}
        onMouseEnter={(e) => {
          if (!allSaved) {
            e.target.style.backgroundColor = "#1a4473";
            e.target.style.borderColor = "#003366";
          }
        }}
        onMouseLeave={(e) => {
          if (!allSaved) {
            e.target.style.backgroundColor = "#003366";
            e.target.style.borderColor = "#1a4473";
          }
        }}
        onClick={handleAddQuestion}
        disabled={allSaved}
      >
        {!allSaved ? "Add Question" : "All Question Saved"}
      </Button>
    </Form.Item>
  );
};

export default AddQuestionButton;

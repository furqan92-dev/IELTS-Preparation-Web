import { useState } from "react";
import { Form, Input, Button, Radio, Pagination } from "antd";
import AddQuestionButton from "./common/AddQuestionButton";

const SentenceCompletion = ({ questions, setQuestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    optionsPerBlank: [],
    correctAnswers: [],
  });
  const [visibleBlankIndex, setVisibleBlankIndex] = useState(0);

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    const blankMatches = value.match(/\[\[blank\]\]/g) || [];
    const blankCount = blankMatches.length;

    setCurrentQuestion((prev) => {
      let newOptions = [...prev.optionsPerBlank];
      let newAnswers = [...prev.correctAnswers];

      if (blankCount < newOptions.length) {
        newOptions.length = blankCount;
        newAnswers.length = blankCount;
      }

      while (newOptions.length < blankCount) {
        newOptions = [...newOptions, ["", "", "", ""]];
        newAnswers = [...newAnswers, null];
      }

      return {
        ...prev,
        question: value,
        optionsPerBlank: newOptions,
        correctAnswers: newAnswers,
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
        optionsPerBlank: [...prev.optionsPerBlank, ["", "", "", ""]],
        correctAnswers: [...prev.correctAnswers, null],
      };

      const newBlankIndex = updatedQuestion.optionsPerBlank.length - 1;
      setVisibleBlankIndex(newBlankIndex);

      return updatedQuestion;
    });
  };

  const handleOptionChange = (blankIndex, optionIndex, value) => {
    const updatedOptions = [...currentQuestion.optionsPerBlank];
    updatedOptions[blankIndex][optionIndex] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      optionsPerBlank: updatedOptions,
    }));
  };

  const handleCorrectAnswerChange = (blankIndex, value) => {
    const updatedCorrectAnswers = [...currentQuestion.correctAnswers];
    updatedCorrectAnswers[blankIndex] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswers: updatedCorrectAnswers,
    }));
  };

  return (
    <ul>
      <li className="border px-4 rounded-md shadow">
        <Form.Item
          label={`Sentence Completion Question ${currentIndex + 1}/10`}
          name={`sentenceCompletion-question-${currentIndex}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="text"
            name={`sentenceCompletion-question-${currentIndex}`}
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
        {currentQuestion.optionsPerBlank?.length > 0 && (
          <>
            <div className="mb-4 border p-2 rounded-md bg-gray-50">
              <strong className="block mb-2">
                Options for Blank {visibleBlankIndex + 1}
              </strong>

              {currentQuestion.optionsPerBlank[visibleBlankIndex] &&
                currentQuestion.optionsPerBlank[visibleBlankIndex].map(
                  (option, optionIndex) => (
                    <Form.Item
                      key={optionIndex}
                      label={`Option ${optionIndex + 1}`}
                      name={`option-${currentIndex}-${visibleBlankIndex}-${optionIndex}`}
                      className="mb-1"
                    >
                      <Input
                        type="text"
                        value={option}
                        placeholder={`Option ${optionIndex + 1}`}
                        onChange={(e) =>
                          handleOptionChange(
                            visibleBlankIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                      />
                    </Form.Item>
                  )
                )}

              <Form.Item
                label="Select Correct Option"
                name={`correctAnswer-${currentIndex}-${visibleBlankIndex}`}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  value={currentQuestion.correctAnswers[visibleBlankIndex]}
                  onChange={(e) =>
                    handleCorrectAnswerChange(visibleBlankIndex, e.target.value)
                  }
                >
                  {currentQuestion.optionsPerBlank[visibleBlankIndex].map(
                    (option, index) => (
                      <Radio key={index} value={option}>
                        {option || `Option ${index + 1}`}
                      </Radio>
                    )
                  )}
                </Radio.Group>
              </Form.Item>
            </div>

            <Pagination
              current={visibleBlankIndex + 1}
              total={currentQuestion.optionsPerBlank.length}
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
          questionType="sentenceCompletion"
        />
      </li>
    </ul>
  );
};

export default SentenceCompletion;

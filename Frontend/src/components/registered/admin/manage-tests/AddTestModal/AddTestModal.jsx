import { useState } from "react";
import { Select, Form, Modal as AntModal, message } from "antd";
import Blanks from "./questionType/Blanks";
import MCQs from "./questionType/MCQs";
import TrueFalse from "./questionType/TrueFalse";
import SentenceCompletion from "./questionType/SentenceCompletion";
import SentenceMatching from "./questionType/SentenceMatching";
import SAQs from "./questionType/SAQs";
import DiagramLabeling from "./questionType/DiagramLabeling";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddTestModal = ({ isModalOpen, handleCancelModal }) => {
  
  const [formData, setFormData] = useState({
    name: "",
    testType: "",
  });
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState([]);

  const handleFormChange = (name, value) => {
    if (name === "testType") {
      setFormData({
        ...formData,
        testType: value,
      });
      setQuestionType([]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setQuestionType([...questionType, value]);
    }
  };

  console.log(questionType);

  const handleAddTest = async () => {
    let accessToken = localStorage.getItem("access token");
    const decoded = jwtDecode(accessToken);

    console.log(decoded.username);

    // if (questions.length !== 40) {
    //   message.error("Total questions must be exactly 40.");
    //   return;
    // }

    const payload = {
      ...formData,
      creator: decoded.username,
      date_created: new Date().toISOString().split("T")[0],
      last_updated: new Date().toISOString().split("T")[0],
      attemptUsers: [],
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/tests/", payload)
      if(res.status === 201) {
        message.success("Success");
      }
    } catch(error) {
      message.error("Something Went Wrong");
    }
  };

  return (
    <AntModal
      title={<span className="text-[#003366] text-2xl">Add Test</span>}
      open={isModalOpen}
      onOk={handleAddTest}
      okButtonProps={{
        className: "bg-[#003366] hover:!bg-[#1a4473]",
      }}
      onCancel={handleCancelModal}
      okText="Add"
    >
      <Form>
        <Form.Item label="Name">
          <input
            type="text"
            value={formData.name ?? ""}
            onChange={(e) => handleFormChange("name", e.target.value)}
            placeholder="Enter Test Name"
          />
        </Form.Item>

        <Form.Item label="Select Test Type" name="testType">
          <Select
            value={formData.testType}
            onChange={(value) => handleFormChange("testType", value)}
            placeholder="Select Test Type"
            options={[
              { value: "Listening", label: "Listening" },
              { value: "Reading", label: "Reading" },
              { value: "Writing", label: "Writing" },
              { value: "Speaking", label: "Speaking" },
            ]}
          />
        </Form.Item>

        {formData.testType && (
          <Form.Item label="Select Question Type" name="Question Type">
            <Select
              value={questionType ?? undefined}
              onChange={(value) => handleFormChange("questionType", value)}
              placeholder="Select Question Type"
              options={
              formData.testType === "Listening"
                ? [
                    { value: "Multiple Choice Questions", label: "Multiple Choice Questions" },
                    { value: "Fill in the blanks", label: "Fill in the blanks" },
                    { value: "True/False", label: "True/False" },
                  ]
                : formData.testType === "Reading"
                ? [
                    { value: "Multiple Choice Questions", label: "Multiple Choice Questions" },
                    { value: "Sentence Completion", label: "Sentence Completion" },
                    { value: "Sentence Matching", label: "Sentence Matching" },
                  ]
                : formData.testType === "Writing"
                ? [
                    { value: "Plan/Map/Diagram Labeling", label: "Plan/Map/Diagram Labeling" },
                  ]
                : formData.testType === "Speaking"
                ? [
                    { value: "Short Answer Questions", label: "Short Answer Questions" }
                  ]
                : []
              }
            />
          </Form.Item>
        )}
        {formData.questionType === "Multiple Choice Questions" ? (
          <MCQs questions={questions} setQuestions={setQuestions} />
        ) : formData.questionType === "Fill in the blanks" ? (
          <Blanks questions={questions} setQuestions={setQuestions} />
        ) : formData.questionType === "True/False" ? (
          <TrueFalse questions={questions} setQuestions={setQuestions} />
        ) : formData.questionType === "Sentence Completion" ? (
          <SentenceCompletion questions={questions} setQuestions={setQuestions} />
        ) : formData.questionType === "Sentence Matching" ? (
          <SentenceMatching questions={questions} setQuestions={setQuestions} />
        ) : formData.questionType === "Plan/Map/Diagram Labeling" ? (
          <DiagramLabeling questions={questions} setQuestions={setQuestions} />
        ) : formData.questionType === "Short Answer Questions" ? (
          <SAQs questions={questions} setQuestions={setQuestions} />
        ) : null}
      </Form>
    </AntModal>
  );
};

export default AddTestModal;

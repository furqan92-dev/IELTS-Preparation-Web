import { useState } from "react";

const DiagramLabeling = ({ questions, setQuestions }) => {
  const [image, setImage] = useState(null);
  const [labels, setLabels] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const labelId = String.fromCharCode(65 + labels.length);

    const newLabel = {
      x,
      y,
      label: labelId,
      correctAnswer: "",
    };

    setLabels((prev) => [...prev, newLabel]);
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...labels];
    updated[index].correctAnswer = value;
    setLabels(updated);
  };

  return (
    <ul>
      <li className="border px-4 rounded-md shadow">
        <input type="file" onChange={handleImageChange} />
        {image && (
          <div className="relative inline-block" onClick={handleImageClick}>
            <img src={image} alt="Label Diagram" style={{ maxWidth: "100%" }} />
            {labels.map((label, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: label.y,
                  left: label.x,
                  transform: "translate(-50%, -50%)",
                  background: "red",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {label.label}
              </div>
            ))}
          </div>
        )}
        {labels.map((label, index) => (
          <div key={index}>
            <label>
              Correct Answer for {label.label}:
              <input
                type="text"
                value={label.correctAnswer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
      </li>
    </ul>
  );
};

export default DiagramLabeling;

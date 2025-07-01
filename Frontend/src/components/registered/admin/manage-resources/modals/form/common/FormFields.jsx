import { message, Select } from "antd";
import { useRef } from "react";

const FormFields = ({ formData, setFormData, resource }) => {
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (resource === "Video" && file && !file.type.startsWith("video/")) {
      message.error("Please upload a valid video file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFormData((prev) => ({ ...prev, file: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, file: file || null }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTextChange}
          />
        </div>
        <div className="mt-5">
          <Select
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            className="w-full outline-none"
            placeholder="Select Book Type"
            options={[
              { value: "Listening", label: "Listening" },
              { value: "Speaking", label: "Speaking" },
              { value: "Reading", label: "Reading" },
              { value: "Writing", label: "Writing" },
            ]}
          />
        </div>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          accept={resource === "Video" ? "video/*" : "*"}
          ref={fileInputRef}
          className="mt-5"
        />
      </form>
    </>
  );
};

export default FormFields;

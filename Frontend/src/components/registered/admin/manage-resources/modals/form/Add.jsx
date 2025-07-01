import { message, Modal } from "antd";
import { useState } from "react";
import FormFields from "./common/FormFields";
import axios from "axios";

const Add = ({ open, onCancel, resource }) => {
  const [addFormData, setAddFormData] = useState({
    title: "",
    type: "",
    file: null,
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addFormData.title || !addFormData.type || !addFormData.file) {
      message.error("Please fill out all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", addFormData.title);
      formData.append("type", addFormData.type);
      formData.append("file", addFormData.file);
      const addBookResponse = await axios.post(
        `http://127.0.0.1:8000/add-${resource.toLowerCase()}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (addBookResponse.status === 201) {
        const notification = `IELTS ${resource} added in your Learning Materials`;
        const notificationResponse = await axios.post(
          "http://127.0.0.1:8000/add-notification/",
          {
            notification: notification,
            type: resource,
          }
        );
        if (
          notificationResponse.status === 200 ||
          notificationResponse.status === 201
        ) {
          message.success(addBookResponse.data.message);
        }
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Something went wrong");
    }
    setAddFormData({
      title: "",
      type: "",
      file: null,
    });
  };

  return (
    <>
      <Modal
        title={<span className="text-[#003366] text-2xl">Add {resource}</span>}
        open={open}
        onOk={handleAdd}
        onCancel={onCancel}
      >
        <FormFields
          formData={addFormData}
          setFormData={setAddFormData}
          resource={resource}
        />
      </Modal>
    </>
  );
};

export default Add;

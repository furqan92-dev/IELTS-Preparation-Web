import { useState } from "react";
import FormFields from "./common/FormFields";
import { Modal, Select, message } from "antd";
import axios from "axios";

const Edit = ({ open, resource, onCancel, resourceList }) => {
  const [editFormData, setEditFormData] = useState({
    title: "",
    type: "",
    file: "",
  });
  const [selectedItem, setSelectedItem] = useState("");

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.type || !editFormData.file) {
      message.error("Please fill out all fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", editFormData.title);
      formData.append("type", editFormData.type);
      formData.append("file", editFormData.file);
      const editBookResponse = await axios.put(
        `http://127.0.0.1:8000/edit-${resource.toLowerCase()}/${selectedItem}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (editBookResponse.status === 200) {
        const notification = `IELTS ${resource} edited in your Learning Materials`;
        const NotificationResponse = await axios.post(
          "http://127.0.0.1:8000/add-notification/",
          {
            notification: notification,
            type: resource,
          }
        );
        if (NotificationResponse.status === 201) {
          message.success(res.data.message);
        }
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Something went wrong");
    }
    setEditFormData({
      title: "",
      type: "",
      file: "",
    });
  };

  return (
    <>
      <Modal
        title={<span className="text-[#003366] text-2xl">Edit {resource}</span>}
        open={open}
        onCancel={onCancel}
        onOk={handleEdit}
      >
        <FormFields
          formData={editFormData}
          setFormData={setEditFormData}
          resource={resource}
        />
        <Select
          className="w-full outline-none"
          onChange={(value) => setSelectedItem(value)}
          defaultValue={{
            value: "BooksTitle",
            label: "Please select the book you want to edit",
          }}
          options={resourceList?.map((item, index) => ({
            key: index.toString(),
            value: item,
            label: item,
          }))}
        />
      </Modal>
    </>
  );
};

export default Edit;

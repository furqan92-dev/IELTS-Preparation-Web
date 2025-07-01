import { message, Modal, Select } from "antd";
import axios from "axios";
import { useState } from "react";

const Delete = ({
  open,
  onCancel,
  resource, 
  resourceList
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/delete-${resource.toLowerCase()}/${selectedItem}/`);
      if(res.status===204) {
        const notification = `One ${resource} deleted in your courses`;
        const resNotification = await axios.post("http://127.0.0.1:8000/add-notification/", {
          notification: notification
        });
        if(resNotification.status===201) {
          messageApi.open({
            type: "success",
            content: res.data.message,
          })
        }
      }
    } catch(err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.error || "Something went wrong"
      })
    }
  }

  return (
    <>
      { contextHolder }
      <Modal
        title={<span className='text-[#003366] text-2xl'>Delete {resource}</span>}
        open={open}
        onOk={handleDelete}
        onCancel={onCancel}
        okText="Delete"
        okButtonProps={{
          className: 'bg-red-500 hover:bg-red-400',
        }}>
        <Select
          className="w-full outline-none my-5"
          onChange={(value) => setSelectedItem(value)}
          placeholder={`Please Select the ${resource} you want to delete`}
          options={resourceList?.map((item, index) => ({
            key: index.toString(),
            value: item,
            label: item,
          }))}
        />
      </Modal>
    </>
  )
}

export default Delete;
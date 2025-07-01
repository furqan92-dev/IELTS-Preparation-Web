import { Modal } from "antd";
import UserLogsTable from "./UserLogsTable";

const UserLogsModal = ({ isModalOpen, setIsModalOpen, userLogData }) => {
  return (
    <Modal
      title={<span className="text-[#003366] text-2xl">Log Activities</span>}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <UserLogsTable userLogData={userLogData} />
    </Modal>
  );
};

export default UserLogsModal;

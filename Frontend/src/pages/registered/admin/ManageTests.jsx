import { useState, useEffect } from "react";
import { Input, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import TestTable from "../../../components/registered/admin/manage-tests/TestTable";
import AddTestModal from "../../../components/registered/admin/manage-tests/AddTestModal/AddTestModal";
import { testTypeFilterItems } from "../../../constants/DynamicConstants";
import { useAdminAccess } from "../../../hooks/useAdminAccess";
import axios from "axios";

const { Search } = Input;

const ManageTests = () => {
  const [data, setData] = useState([]);
  const [testNameSearch, setTestNameSearch] = useState("");
  const [testTypeFilter, setTestTypeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const authorized = useAdminAccess();
  const accessToken = localStorage.getItem("access token");

  if (!authorized || !accessToken) {
    return null;
  }

  console.log(selectedRowKeys);

  const handleDelete = () => {
    console.log("vhjk")
    selectedRowKeys.map((id) => {
      data.map(async (user) => {
        if (id === user.id) {
          console.log(id)
          const res = await axios.delete(
            `http://127.0.0.1:8000/delete-test/${user.name}/`
          );
          if (res.status === 200) {
            message.success(res.data.message);
          }
        }
      });
    });

    const filteredData = data.filter((row) => {
      return !selectedRowKeys.includes(row.id);
    });

    const users = filteredData.map((user, index) => ({
      ...user,
      id: index + 1,
    }));

    setData(users);
  };

  const handleCancelModal = () => setIsModalOpen(false);

  return (
    <div className="pt-20">
      <h1 className="bg-white text-[#003366] ml-56 mb-10">Tests</h1>
      <div className="flex gap-2 justify-end items-center mb-2 mr-2">
        <Search
          placeholder="Search here..."
          enterButton={
            <button className="bg-[#003366] text-white h-[32.2px] px-4 rounded-r-md">
              Search
            </button>
          }
          value={testNameSearch}
          onChange={(e) => {
            setTestNameSearch(e.target.value);
          }}
          className="w-72"
        />
        <button
          onClick={handleDelete}
          className="bg-[#003366] hover:bg-[#275180] text-[#d2e8e3] rounded-lg py-[6px] px-8"
        >
          Delete
        </button>
        <button
          className="bg-[#003366] hover:bg-[#275180] text-[#d2e8e3] rounded-lg py-[6px] px-8 mr-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Test
        </button>
      </div>
      <TestTable
        data={data}
        setData={setData}
        testNameSearch={testNameSearch}
        testTypeFilter={testTypeFilter}
        setTestTypeFilter={setTestTypeFilter}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <AddTestModal
        isModalOpen={isModalOpen}
        handleCancelModal={handleCancelModal}
      />
    </div>
  );
};

export default ManageTests;

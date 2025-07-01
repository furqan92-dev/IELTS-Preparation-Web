import { useState } from "react";
import { message, Input, Dropdown } from "antd";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import UserTable from "../../../components/registered/admin/manage-users/UserTable";
import { userStatusFilterItems } from "../../../constants/DynamicConstants";
import { useAdminAccess } from "../../../hooks/useAdminAccess";

const { Search } = Input;

const ManageUsers = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const authorized = useAdminAccess();
  const accessToken = localStorage.getItem("access token");

  if (!authorized || !accessToken) {
    return null;
  }

  const handleDelete = () => {
    selectedRowKeys.map((id) => {
      data.map(async (user) => {
        if (id == user.id) {
          const res = await axios.delete(
            `http://127.0.0.1:8000/dashboard/user/delete/${user.username}/`
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

  return (
    <div className="pt-20">
      <h1 className="bg-white text-[#003366] ml-56 mb-10">Users</h1>
      <div className="flex gap-2 justify-end items-center mr-2">
        <Search
          placeholder="Search here..."
          enterButton={
            <button className="bg-[#003366] text-white h-[32.2px] px-4 rounded-r-md">
              Search
            </button>
          }
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
          className="w-72"
        />
        <button
          onClick={handleDelete}
          className="bg-[#003366] hover:bg-[#275180] text-[#d2e8e3] rounded-lg py-[6px] px-8 mr-4"
        >
          Delete
        </button>
      </div>
      <UserTable
        accessToken={accessToken}
        data={data}
        selectedRowKeys={selectedRowKeys}
        setData={setData}
        setSelectedRowKeys={setSelectedRowKeys}
        searchUser={searchUser}
      />
    </div>
  );
};

export default ManageUsers;

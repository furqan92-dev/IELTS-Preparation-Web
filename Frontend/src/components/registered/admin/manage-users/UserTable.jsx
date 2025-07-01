import { message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../../../../utils/refreshAccessToken";
import { userTableColumns } from "../../../../constants/DynamicConstants";
import UserLogsModal from "./UserLogsModal";

const UserTable = ({
  data,
  selectedRowKeys,
  setData,
  setSelectedRowKeys,
  searchUser,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLogData, setUserLogData] = useState([]);
  const [logData, setLogData] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("");
  const [filteredRole, setFilteredRole] = useState("");

  const requestDashboard = async (accessToken) => {
    return await axios.get("http://127.0.0.1:8000/dashboard/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  const fetchUsersData = async () => {
    let accessToken = localStorage.getItem("access token");

    try {
      const [resDashboard, resLogs] = await Promise.all([
        requestDashboard(accessToken),
        axios.get("http://127.0.0.1:8000/retrieve-log-activities/"),
      ]);
      if (resDashboard.status === 200 && resLogs.status === 200) {
        const logs = resLogs.data;
        setLogData(logs);

        const users = resDashboard.data.users.map((user, index) => {
          const userLogs = logs.find(
            (log) => log.username_or_email === user.username
          );
          const lastActivity =
            userLogs?.activities?.[userLogs.activities.length - 1];
          const isActive =
            lastActivity && (!lastActivity.logout || !lastActivity.login);

          return {
            ...user,
            id: index + 1,
            role: user.is_staff ? "Admin" : "User",
            status: isActive ? "active" : "deactive",
            logactivities: "view Logs",
          };
        });

        setData(users);
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        return message.error(
          err?.response?.data?.error || "Something went wrong."
        );
      }

      accessToken = await refreshAccessToken();
      if (!accessToken) {
        message.error("JWT Token expired. Please login again.");
        return navigate("/");
      }

      fetchUsersData();
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  const handleShowLogs = (username) => {
    const entry = logData.find((item) => item.username_or_email === username);

    if (!entry) {
      message.error("No Log Data of this user");
      return;
    }

    const entryActivities = entry?.activities;
    let timesArr = [];
    if (typeof entryActivities === "string") {
      const fixed = entryActivities.replace(/'/g, '"');
      try {
        timesArr = JSON.parse(fixed);
      } catch (e) {
        console.error(
          "JSON parse error after replace:",
          e,
          "fixed string:",
          fixed
        );
        timesArr = [];
      }
    } else if (Array.isArray(entryActivities)) {
      timesArr = entryActivities;
    }

    const rows = timesArr.map((t, i) => ({
      id: i + 1,
      login: t.login,
      logout: t.logout,
    }));

    setUserLogData(rows);
    setIsModalOpen(true);
  };

  return (
    <>
      <div style={{ marginLeft: "13%", width: "calc(100% - 13%)", padding: "20px" }}>
        <Table
          size="small"
          rowSelection={rowSelection}
          columns={userTableColumns(searchUser, filteredStatus, filteredRole, handleShowLogs)}
          dataSource={data}
          rowKey="id"
          onChange={(pagination, filters) => {
            setUserStatus(filters.status || null);
            setFilteredRole(filters.role || null);
          }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: "#f2f2f2",
                    color: "#898989", 
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "13px",
                    ...props.style,
                  }}
                />
              ),
            },
            body: {
              cell: (props) => (
                <td {...props} className="text-[13px] px-2 py-1" />
              ),
            },
          }}
        />
      </div>

      <UserLogsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userLogData={userLogData}
      />
    </>
  );
};

export default UserTable;

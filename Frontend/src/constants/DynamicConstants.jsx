import { Tag } from "antd";

export const userTableColumns = (searchUser, filteredStatus, filteredRole, handleShowLogs) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    filteredValue: [searchUser],
    onFilter: (value, record) => {
      return (
        String(record.username).toLowerCase().includes(value.toLowerCase()) ||
        String(record.email).toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    filters: [
      { text: 'User', value: 'User' },
      { text: 'Admin', value: 'Admin' },
    ],
    filteredValue: filteredRole || null,
    onFilter: (value, record) => record.role === value,
    render: (role) => (
      <div className="text-center">
        <Tag color={role === "User" ? "blue" : "red"}>{role.toUpperCase()}</Tag>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      { text: 'active', value: 'active' },
      { text: 'deactive', value: 'deactive' },
    ],
    filteredValue: filteredStatus || null,
    onFilter: (value, record) => record.status === value,
    render: (status) => (
      <div className="text-center">
        <Tag color={status === "active" ? "blue" : "red"}>
          {status.toUpperCase()}
        </Tag>
      </div>
    ),
  },
  {
    title: "Log Activities",
    dataIndex: "logactivities",
    key: "logactivities",
    render: (text, record) => (
      <div style={{ textAlign: "center" }}>
        <button
          className="text-blue-500 hover:text-blue-400"
          onClick={() => {
            handleShowLogs(record.username);
          }}
        >
          {text}
        </button>
      </div>
    ),
  },
];

export const userStatusFilterItems = (setUserStatus) => [
  {
    key: "1",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setUserStatus("active")}
      >
        Active Users
      </button>
    ),
  },
  {
    key: "2",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setUserStatus("deactive")}
      >
        Deactive Users
      </button>
    ),
  },
  {
    key: "5",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setUserStatus("")}
      >
        All Users
      </button>
    ),
  },
];

export const testTableColumns = (testNameSearch, testTypeFilter) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    filteredValue: [testNameSearch],
    onFilter: (value, record) => {
      return String(record.name).toLowerCase().includes(value.toLowerCase());
    },
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Test Type",
    dataIndex: "testType",
    key: "testType",
    align: "center",
    filters: [
      { text: 'Listening', value: 'Listening' },
      { text: 'Reading', value: 'Reading' },
      { text: 'Writing', value: 'Writing' },
      { text: 'Speaking', value: 'Speaking' },
    ],
    filteredValue: testTypeFilter || null,
    onFilter: (value, record) => record.testType === value,
  },
  {
    title: "Question Type",
    dataIndex: "question type",
    key: "question type",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Creater",
    dataIndex: "creater",
    key: "creater",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    key: "dateCreated",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    align: "center",
    filteredValue: null,
  },
  {
    title: "Users Attempted",
    dataIndex: "usersAttempted",
    key: "usersAttempted",
    filteredValue: null,
    render: (text) => (
      <div style={{ textAlign: "center", color: "#1677ff" }}>
        <button>{text}</button>
      </div>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    filteredValue: null,
    render: (text) => (
      <div style={{ textAlign: "center", color: "#1677ff" }}>
        <button>{text}</button>
      </div>
    ),
  },
  {
    title: "Preview",
    dataIndex: "preview",
    key: "preview",
    align: "center",
    filteredValue: null,
  },
];

export const testTypeFilterItems = (setTestType) => [
  {
    key: "1",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setTestType("listening")}
      >
        Listening
      </button>
    ),
  },
  {
    key: "2",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setTestType("Reading")}
      >
        Reading
      </button>
    ),
  },
  {
    key: "5",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setTestType("Speaking")}
      >
        Speaking
      </button>
    ),
  },
  {
    key: "5",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setTestType("Writing")}
      >
        Writing
      </button>
    ),
  },
  {
    key: "6",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => setTestType("")}
      >
        All Tests
      </button>
    ),
  },
];

export const resourceTypeFilterItems = (setResourceType) => [
  {
    key: "1",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => {
          setResourceType("Listening");
        }}
      >
        Listening
      </button>
    ),
  },
  {
    key: "2",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => {
          setResourceType("Speaking");
        }}
      >
        Speaking
      </button>
    ),
  },
  {
    key: "3",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => {
          setResourceType("Reading");
        }}
      >
        Reading
      </button>
    ),
  },
  {
    key: "4",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => {
          setResourceType("Writing");
        }}
      >
        Writing
      </button>
    ),
  },
  {
    key: "4",
    label: (
      <button
        className="hover:bg-[#003366] hover:text-[#d2e8e3] w-full px-5 py-2"
        onClick={() => {
          setResourceType("");
        }}
      >
        All Books
      </button>
    ),
  },
];

import { USER_LOGS_TABLE_COLUMNS } from "../../../../constants/StaticConstants";
import { Table } from "antd";

const UserLogsTable = ({ userLogData }) => {
  return (
    <Table
      rowKey="id"
      dataSource={userLogData}
      columns={USER_LOGS_TABLE_COLUMNS}
      components={{
        header: {
          cell: (props) => (
            <th
              {...props}
              style={{
                backgroundColor: "#003366",
                color: "#d2e8e3",
                fontWeight: "bold",
                textAlign: "center",
                ...props.style,
              }}
            />
          ),
        },
      }}
    />
  );
};

export default UserLogsTable;

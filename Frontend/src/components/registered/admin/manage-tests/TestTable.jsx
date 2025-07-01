import { message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { testTableColumns } from "../../../../constants/DynamicConstants";

const TestTable = ({ data, setData, testNameSearch, testTypeFilter, setTestTypeFilter, selectedRowKeys, setSelectedRowKeys }) => {

  const fetchData = async () => {
    const res = await axios.get("http://127.0.0.1:8000/retrieve-test/");
    const tests = res.data.map((test, index) => {
      return {
        ...test,
        id: index + 1,
        dateCreated: test.date_created,
        usersAttempted: "Users",
        actions: "Edit",
      };
    });
    console.log(tests)
    setData(tests);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  return (
    <div style={{ marginLeft: "13%", width: "calc(100% - 13%)", padding: "20px" }}>
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={testTableColumns(testNameSearch, testTypeFilter)}
        dataSource={data}
        rowKey="id"
        onChange={(pagination, filters) => {
          setTestTypeFilter(filters.testType || null);
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
  );
};

export default TestTable;

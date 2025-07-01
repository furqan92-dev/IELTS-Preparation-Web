import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { RESOURCES_VIEW_TABLE } from "../../../../../../constants/StaticConstants";

const TableComp = ({ resource, setResourceList, setTotalResource }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/retrieve-${resource.toLowerCase()}/`
    );
    console.log(res.data);
    setData(res.data);
    const resourceList = res.data.map((item) => item.title);
    setResourceList(resourceList);
    setTotalResource(res.data.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table
        columns={RESOURCES_VIEW_TABLE}
        dataSource={data}
        pagination={{ pageSize: 5 }}
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
    </>
  );
};

export default TableComp;

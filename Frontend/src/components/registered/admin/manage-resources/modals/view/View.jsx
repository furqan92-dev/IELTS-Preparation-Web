import { useState } from "react";
import { Dropdown, Modal, Input } from "antd";
import TableComp from "./TableComp";
import { DownOutlined } from "@ant-design/icons";
import { resourceTypeFilterItems } from "../../../../../../constants/DynamicConstants";

const { Search } = Input;

const View = ({
  open,
  onCancel,
  resource,
  setResourceList,
  setTotalResource,
}) => {
  const [searchResource, setSearchBook] = useState("");
  const [resourceType, setResourceType] = useState("");

  return (
    <>
      <Modal
        title={
          <span className="text-[#003366] text-2xl">Show All {resource}s</span>
        }
        open={open}
        onCancel={onCancel}
        footer={null}
        width="auto"
      >
        <div className="flex gap-2 justify-end items-center mb-2 mr-2">
          <Search
            placeholder="Search here..."
            enterButton={
              <button className="bg-[#003366] text-white h-[32.2px] px-4 rounded-r-md">
                Search
              </button>
            }
            value={searchResource}
            onChange={(e) => {
              setSearchBook(e.target.value);
            }}
            className="w-72"
          />
          <Dropdown
            menu={{ items: resourceTypeFilterItems(setResourceType) }}
            trigger={["click"]}
          >
            <button className="bg-[#003366] hover:bg-[#275180] text-[#d2e8e3] rounded-lg py-[6px] px-8 gap-1 flex items-center">
              Book Type
              <DownOutlined />
            </button>
          </Dropdown>
        </div>
        <TableComp
          resource={resource}
          setResourceList={setResourceList}
          setTotalResource={setTotalResource}
          searchResource={searchResource}
          resourceType={resourceType}
        />
      </Modal>
    </>
  );
};

export default View;

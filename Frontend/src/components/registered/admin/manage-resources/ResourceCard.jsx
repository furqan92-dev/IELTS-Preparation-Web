import { Card as AntCard } from "antd";
import { useState } from "react";
import Add from "./modals/form/Add";
import View from "./modals/view/View";
import Edit from "./modals/form/Edit";
import Delete from "./modals/Delete";

const ResourceCard = ({ resource }) => {
  const [activeModal, setActiveModal] = useState("");
  const [resourceList, setResourceList] = useState([]);
  const [totalResource, setTotalResource] = useState(0);

  const handleCancel = () => setActiveModal("");

  return (
    <>
      <AntCard
        title={<span className="text-[#003366] text-2xl">{resource}s</span>}
        className="shadow-2xl w-96 border-4 border-[#003366] "
      >
        <h1 className="text-[#003366]">{totalResource}</h1>
        <div className="flex justify-end gap-1 mt-5">
          <button
            onClick={() => setActiveModal("add")}
            className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-1 rounded-lg"
          >
            Add
          </button>
          <button
            onClick={() => setActiveModal("view")}
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-1 rounded-lg"
          >
            Show
          </button>
          <button
            onClick={() => setActiveModal("edit")}
            className="bg-green-500 hover:bg-green-400 text-white px-5 py-1 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => setActiveModal("delete")}
            className="bg-red-500 hover:bg-red-400 text-white px-5 py-1 rounded-lg"
          >
            Delete
          </button>
        </div>
      </AntCard>
      <Add
        open={activeModal === "add"}
        onCancel={handleCancel}
        resource={resource}
      />
      <View
        open={activeModal === "view"}
        onCancel={handleCancel}
        resource={resource}
        setResourceList={setResourceList}
        setTotalResource={setTotalResource}
      />
      <Edit
        open={activeModal === "edit"}
        resource={resource}
        onCancel={handleCancel}
        resourceList={resourceList}
      />
      <Delete
        open={activeModal === "delete"}
        onCancel={handleCancel}
        resource={resource}
        resourceList={resourceList}
      />
    </>
  );
};

export default ResourceCard;

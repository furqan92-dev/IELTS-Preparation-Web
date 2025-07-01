import ResourceCard from "../../../components/registered/admin/manage-resources/ResourceCard";
import { message } from "antd";
import { useAdminAccess } from "../../../hooks/useAdminAccess";

const ManageResources = () => {
  const authorized = useAdminAccess();
  const accessToken = localStorage.getItem("access token");

  if (!authorized || !accessToken) {
    return null;
  }

  return (
    <div className="pt-20">
      <h1 className="bg-white text-[#003366] ml-56 mb-10">Resources</h1>
      <div className="flex justify-center gap-40 mt-10">
        <ResourceCard resource="Book" />
        <ResourceCard resource="Ppt" />
      </div>
      <div className="flex justify-center gap-40 mt-28">
        <ResourceCard resource="Pdf" />
        <ResourceCard resource="Video" />
      </div>
    </div>
  );
};

export default ManageResources;

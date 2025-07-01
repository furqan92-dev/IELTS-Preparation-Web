import HomeImg from "../../../assets/images/registered/admin/home.jpg";
import { useAdminAccess } from "../../../hooks/useAdminAccess";

const Home = () => {
  const authorized = useAdminAccess();
  const accessToken = localStorage.getItem("access token");

  if (!authorized || !accessToken) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={HomeImg} alt="" className="size-96" />
      <h1 className="text-[#003366] font-black">Admin Management System</h1>
    </div>
  );
};

export default Home;

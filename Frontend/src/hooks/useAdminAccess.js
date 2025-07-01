import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../utils/refreshAccessToken";

export const useAdminAccess = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      let accessToken = localStorage.getItem("access token");

      if (!accessToken) {
        setAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode(accessToken);
        if (!decoded.is_staff) {
          setAuthorized(false);
          return;
        }
        setAuthorized(true);
      } catch (e) {
        try {
          accessToken = await refreshAccessToken();
          if (!accessToken) {
            setAuthorized(false);
            return;
          }
          const decoded = jwtDecode(accessToken);
          if (!decoded.is_staff) {
            setAuthorized(false);
            return;
          }
          setAuthorized(true);
        } catch (err) {
          setAuthorized(false);
        }
      }
    };

    checkAccess();
  }, []);

  useEffect(() => {
    if (authorized === false) {
      navigate("/");
    }
  }, [authorized, navigate]);

  return authorized;
};

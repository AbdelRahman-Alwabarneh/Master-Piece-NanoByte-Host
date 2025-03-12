import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/checkAuth`,
          {
            withCredentials: true,
          }
        );

        if (response.data.authenticated) {
          navigate("/");
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return children;
};

export default AuthRedirect;

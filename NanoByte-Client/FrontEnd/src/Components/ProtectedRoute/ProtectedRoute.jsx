import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { clearUserProfile } from "../../Redux/Slice/profileSlice";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/checkAuth`,
          { withCredentials: true }
        );
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      dispatch(clearUserProfile());
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/LogIn");
    }
  }, [isAuthenticated, navigate, dispatch, location.pathname]);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return children;
};

export default ProtectedRoute;

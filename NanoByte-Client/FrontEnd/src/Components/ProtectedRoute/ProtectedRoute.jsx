import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from "react-redux";
import { clearUserProfile  } from "../../Redux/Slice/profileSlice";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/checkAuth', { withCredentials: true });
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
      navigate('/LogIn');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <Loading/>;
  }

  return children;
};

export default ProtectedRoute;

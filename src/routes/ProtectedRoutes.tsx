import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function OnlyUserPrivateRoute() {
  const { currentUser } = useSelector((state) => state.authentication);

  return currentUser && currentUser.user.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default OnlyUserPrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoute = () => {
  const data = useSelector((data) => data.Data.userData.token);

  if (data) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;

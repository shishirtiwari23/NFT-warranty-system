import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/" />;
  }

  return component;
};

export default PrivateRoute;

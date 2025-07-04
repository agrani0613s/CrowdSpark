// components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


export default PrivateRoute;

// export default function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />; // Redirect if not logged in
//   }

//   return children; // Render page if logged in
// }

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
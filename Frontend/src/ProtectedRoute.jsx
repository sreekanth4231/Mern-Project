import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const student = JSON.parse(localStorage.getItem("student")); // Changed from "card" to "student"

  if (!student) return <Navigate to={"/student"} />; // Redirect to student registration/login

  return <>{children}</>;
};

export default ProtectedRoute;

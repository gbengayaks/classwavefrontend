import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth); // Get the user from Redux state

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, allow access to the protected route
  return children;
};

export default ProtectedRoute;

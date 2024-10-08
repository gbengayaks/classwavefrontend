import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth); // Get the user from Redux state
  //const token = useSelector((state) => state.auth.user.data.token) ;
   const token = localStorage.getItem('token');
  //console.log(token);

  if ((!user || !token)) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/" />;
  }

  // If user is authenticated, allow access to the protected route
  return children;
};

export default ProtectedRoute;

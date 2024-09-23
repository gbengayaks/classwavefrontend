import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ActivateAccount from './components/ActivateAccount';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/activate" element={<ActivateAccount />} />
        
        {/* Protected Dashboard route with nested routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes inside dashboard */}
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './components/login';
// import Register from './components/Register';
// import ActivateAccount from './components/ActivateAccount';
// import Dashboard from './components/Dashboard';
// import { useSelector } from 'react-redux';

// const App = () => {
//   const { token } = useSelector((state) => state.auth);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/activate" element={<ActivateAccount />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;





// import React from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: {token ? <Navigate to="/dashboard" /> : <Login />}
//   },
//   {
//     path: "/register",
//     element: <Register />
//   },


// ]);


// function App() {
//   const { token } = useSelector((state) => state.auth);
//   return (
//     <>
//       <RouterProvider router= {router} />
//     </>
//   )
// }

// export default App





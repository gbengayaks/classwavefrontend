import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/preAuth/Register';
import Login from './components/preAuth/Login';
import ActivateAccount from './components/preAuth/ActivateAccount';
import Dashboard from './components/postAuth/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ChangePasswordForm from './components/postAuth/ChangePasswordForm';
import RequestResetCodeForm from './components/preAuth/RequestResetCodeForm';
import RequestPasswordForm from './components/preAuth/RequestPasswordForm';
import ProfilePictureUpload from './components/postAuth/ProfilePictureUpload';
// import AddSchool from './school/AddSchool';
import AddSchool from './addschool/AddSchool';
import ProfileUpdate from './components/postAuth/ProfileUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/requestCode" element={<RequestResetCodeForm />} />
        <Route path="/requestForm" element={<RequestPasswordForm />} />


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
          <Route path="changepassword" element={<ChangePasswordForm />} />
          <Route path="pictureupload" element={<ProfilePictureUpload />} />
          <Route path="profileupdate" element={<ProfileUpdate />} />
          <Route path="addschool" element={<AddSchool />} />
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





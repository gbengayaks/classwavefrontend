import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;



// import React from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />
//   },
//   {
//     path: "/create",
//     element: <Create />
//   },
//   {
//     path: "/edit/:id",
//     element: <Update />
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





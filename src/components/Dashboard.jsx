import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>{user.data.userDetails.firstName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
          <ul className="space-y-4">
            <li>
            <Link
                to="changepassword"
                className="block py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Change password
              </Link>
              <Link
                to="profile"
                className="block py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="settings"
                className="block py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="analytics"
                className="block py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Analytics
              </Link>
            </li>
          </ul>
        </aside>

        {/* Content Area */}
        <section className="flex-grow bg-gray-100 p-6">
          {/* Content rendered by React Router */}
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;





// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// function getUser(){
//   let user = localStorage.getItem('token');
//   if (user) {
//     user = JSON.parse(user);
//     console.log(user.userDetails.firstName);
//   } else{
//     user = null;
//   }
//   return user
// }

// const Dashboard = () => {
//   const [user, setUser] = useState(getUser());

//   return (
//     <div>
//     <div>Welcome to Dashboard</div>
        
//         <div className='text-blue-800 text-2xl flex items-center justify-center min-h-screen bg-gray-100'>
      
//       {user ? (
//         <div>
//           <h1>Hello, {user.userDetails.firstName} {user.userDetails.lastName}</h1>

//         </div>
//       ): (
//         alert('You are bot permitted here')
//       )}
//     </div>
//   </div>
//   )
// }

// export default Dashboard



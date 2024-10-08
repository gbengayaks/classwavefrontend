import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((result) => {
      if (result.payload.status === 200) {
        alert('Login successful');
        navigate('/dashboard'); // Redirect to the dashboard on successful login
       } else {
        alert('Invalid login details');
       }

    });
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-[#0173B1] p-3 flex justify-center items-center">
          <h4 className="flex text-center font-bold text-white w-[90%] items-center justify-center uppercase">
            CLASSWAVE SCHOOL MANAGER
          </h4>
        </div>
        <div className="flex justify-center items-center mt-3">
          <h4 className="text-2xl text-[#0173B1] font-bold">LOGIN</h4>
        </div>
        {error && <p className="bg-red-400 my-3 rounded-lg p-2 mx-auto text-white text-center w-[50%]">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              autoComplete="password" 
              {...register('password', { required: 'Password is required' })}
            
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? <p className="text-white text-center">Login...</p> :"LOGIN"}
            
          </button>
          <div className="text-center mx-auto">Not register,
            <a href="/register" className="text-blue-700 "> click here</a>
          </div>
          <div className="text-center mx-auto">Forgot Password,    
            <a href="/requestCode" className="text-blue-700 "> click here</a>
            
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;

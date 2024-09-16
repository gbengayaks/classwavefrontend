import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser } from '../features/auth/registerSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { loading, error } = useSelector((state) => state.register);

  const onSubmit = (data) => {
    //console.log(data);
    dispatch(registerUser(data)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        navigate('/'); // Redirect to login on successful registration
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
          <h4 className="text-2xl text-[#0173B1] font-bold">REGISTER</h4>
        </div>
        
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
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="schoolDetails" className="block text-sm font-medium text-gray-700">School Details</label>
            <input
              type="text"
              id="schoolDetails"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('schoolDetails', { required: 'School deetails are required' })}
            />
            {errors.schoolDetails && <p className="text-red-500 text-xs mt-1">{errors.schoolDetails.message}</p>}
          </div>

          {loading && <p className="text-blue-500 text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={loading}
          >
            REGISTER
          </button>
          <div className="text-center mx-auto">Already Register,    
            <a href="/" className="text-blue-700 "> click here to Login</a>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Register;


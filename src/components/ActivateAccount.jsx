import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { activateEmail, clearMessages } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ActivateAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const { token, loading, error, success } = useSelector(state => state.auth);

    // Clear any messages when component mounts/unmounts
  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]); 

    const onSubmit = (data) => {
      //console.log(data);
      dispatch(activateEmail(data)).then((action) => {
          navigate('/'); // Redirect to the login on successful login
       
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
            <h4 className="text-2xl text-[#0173B1] font-bold">ACTIVATE ACCOUNT</h4>
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
              <label htmlFor="emailCode" className="block text-sm font-medium text-gray-700">Activation Code</label>
              <input
                type="text"
                id="emailCode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('emailCode', { required: 'Activation code code is required' })}
              />
              {errors.emailCode && <p className="text-red-500 text-xs mt-1">{errors.emailCode.message}</p>}
            </div>
  
            {loading && <p className="text-blue-500 text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
  
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              disabled={loading}
            >
              ACTIVATE
            </button>
            <div className="text-center mx-auto">Not Register,    
              <a href="/register" className="text-blue-700 "> click here to Register</a>
            </div>
          </form>
        </div>
      </div>
  
    );
  };

  export default ActivateAccount;
  
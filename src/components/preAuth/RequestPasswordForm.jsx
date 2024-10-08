import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/auth/authSlice';

const ResetPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);
  //const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  const onSubmit = (data) => {
    dispatch(resetPassword({
      email: data.email,
      resetCode: data.resetCode,
      password: data.password,
    }));
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
        <h4 className="text-2xl text-[#0173B1] font-bold uppercase">Reset Password</h4>
      </div>
      {error && <p className="bg-red-400 my-3 rounded-lg p-2 mx-auto text-white text-center w-[50%]">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
             placeholder="Email"
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
          <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">Reset Code</label>
          <input
            type="text"
            id="resetCode"
            placeholder="Reset Code"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('resetCode', { required: 'Reset code is required' })}
          />
          {errors.resetCode && <p className="text-red-500 text-xs mt-1">{errors.resetCode.message}</p>}
        </div>
        
        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? <p className="text-white text-center">Requesting...</p> :"LOGIN"}
          
        </button>
        <div className="text-center mx-auto">Home,    
          <a href="/" className="text-blue-700 "> click here</a>
        </div>
      </form>
    </div>
  </div>



    // <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
    //   <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      
    //   <input 
    //     {...register('email', { required: 'Email is required' })}
    //     placeholder="Email"
    //     className="w-full p-2 border border-gray-300 rounded mb-4"
    //   />
    //   {errors.email && <p className="text-red-500">{errors.email.message}</p>}

    //   <input 
    //     {...register('resetCode', { required: 'Reset code is required' })}
    //     placeholder="Reset Code"
    //     className="w-full p-2 border border-gray-300 rounded mb-4"
    //   />
    //   {errors.resetCode && <p className="text-red-500">{errors.resetCode.message}</p>}
      
    //   <input 
    //     {...register('password', { required: 'Password is required' })}
    //     placeholder="New Password"
    //     type="password"
    //     className="w-full p-2 border border-gray-300 rounded mb-4"
    //   />
    //   {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      
    //   <button 
    //     type="submit" 
    //     className={`w-full p-2 bg-blue-500 text-white font-semibold rounded ${loading ? 'opacity-50' : ''}`} 
    //     disabled={loading}
    //   >
    //     {loading ? 'Resetting...' : 'Reset Password'}
    //   </button>
      
    //   {success && <p className="text-green-500 mt-4">{success}</p>}
    //   {error && <p className="text-red-500 mt-4">{error}</p>}
    // </form>
  );
};

export default ResetPasswordForm;

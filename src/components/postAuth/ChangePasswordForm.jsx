import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  //const email = useSelector((state) => state.auth.user.data.userDetails.email) 
  

  const onSubmit = (data) => {
    dispatch(changePassword({
      password: data.password,
    })).then((result) => {
      if (result.payload.status === 200) {
        alert('Password changed sussessfully');
        navigate('/'); // Redirect to the dashboard on successful login
       } else {
        alert('Invalid login details')
       };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      
      <input 
        {...register('email')}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
        autoComplete='username'
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input 
        {...register('password', { required: 'New password is required' })}
        placeholder="New Password"
        type="password"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        autoComplete="password" 
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <input 
        {...register('confirmPassword', { 
          required: 'Confirm password is required',
          validate: (value) => value === watch('password') || 'Passwords do not match',
        })}
        placeholder="confirm Password"
        type="password"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        autoComplete="confirm-password" 
      />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      
      <button 
        type="submit" 
        className={`w-full p-2 bg-blue-500 text-white font-semibold rounded ${loading ? 'opacity-50' : ''}`} 
        disabled={loading}
      >
        {loading ? 'Changing...' : 'Change Password'}
      </button>
      
       {/* {success && <p className="text-green-500 mt-4">{success}</p>}  */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default ChangePasswordForm;

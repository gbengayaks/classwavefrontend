import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../features/auth/authSlice';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { user, loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(updateProfile(data)).then((result) => {
      if (result.payload.status === 200) {
        alert('record updated successfully');
        navigate('/dashboard'); // Redirect to the dashboard on successful login
       } else {
        alert('Unsuccessful')
       };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl text-center font-bold mb-8">Profile Update</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        <input 
            {...register('firstName')}
            placeholder="First name"
            className="w-full p-2 border border-gray-300 rounded mb-4 "
            defaultValue={user.data.userDetails.firstName}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

          <input 
            {...register('lastName')}
            placeholder="last name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            defaultValue={user.data.userDetails.lastName}

          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

          <div>
            <select {...register("gender", { required: 'Gender is required' })} className="w-full p-2 border border-gray-300 rounded mb-4">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

          <input 
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            type='date'
            placeholder="Date of Birth"
            className="w-full p-2 border border-gray-300 rounded mb-4" 
            defaultValue={user.data.userDetails.dateOfBirth}
          />
          {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}

          <input 
            {...register('address')}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            defaultValue={user.data.userDetails.address}
          />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        
          <input 
            {...register('state')}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            defaultValue={user.data.userDetails.state}
          />
          {errors.state && <p className="text-red-500">{errors.state.message}</p>}

          <input 
            {...register('city')}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            defaultValue={user.data.userDetails.city}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}

          <input 
            {...register('country')}
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            defaultValue={user.data.userDetails.country}
          />
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}

          <input 
            {...register('phoneNumber')}
            placeholder="Phone number"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            defaultValue={user.data.userDetails.phoneNumber}
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>} 
          
        <div className='col-span-2'> 
          <button 
            type="submit" 
            className={`w-full p-2 bg-blue-500 text-white font-semibold rounded ${loading ? 'opacity-50' : ''}`} 
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
     
      {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  )
}

export default ProfileUpdate
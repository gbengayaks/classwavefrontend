import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
//import { registerUser } from '../../features/auth/authSlice';
//import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { loading, error } = useSelector((state) => state.auth);

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      
      {/* <input 
        {...register('firstName')}
        placeholder="First name"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
        
      />
      {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

      <input 
        {...register('lastName')}
        placeholder="last name"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"

      />
      {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

      <input 
        {...register('gender')}
        placeholder="Gender"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
    
      />
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

      <input 
        {...register('dateOfBirth')}
        type='date'
        placeholder="Date of Birth"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only" 
      />
      {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}

      <input 
        {...register('address')}
        placeholder="Address"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
      />
      {errors.address && <p className="text-red-500">{errors.address.message}</p>}
    
      <input 
        {...register('state')}
        placeholder="State"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
     
      />
      {errors.state && <p className="text-red-500">{errors.state.message}</p>}

      <input 
        {...register('city')}
        placeholder="City"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
       
      />
      {errors.city && <p className="text-red-500">{errors.city.message}</p>}

      <input 
        {...register('country')}
        placeholder="Country"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
        
      />
      {errors.country && <p className="text-red-500">{errors.country.message}</p>}

      <input 
        {...register('phoneNumber')}
        placeholder="Phone number"
        className="w-full p-2 border border-gray-300 rounded mb-4 sr-only"
        
      />
      {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>} */}

      <button 
        type="submit" 
        className={`w-full p-2 bg-blue-500 text-white font-semibold rounded ${loading ? 'opacity-50' : ''}`} 
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
      
       {/* {success && <p className="text-green-500 mt-4">{success}</p>}  */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  )
}

export default Profile
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addSchool } from '../features/auth/schoolSlice';
import SchoolDetail from './SchoolDetail';

const AddSchool = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  
  // Accessing the state from Redux store
  const { schoolDetail, loading, error } = useSelector((state) => state.school);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addSchool(data));  // Dispatch the Axios-based thunk
    reset();  // Reset the form after dispatch
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-6 uppercase">Add School</h2>

      {/* Display errors or loading state */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-blue-500 mb-4">Submitting...</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        
        {/* School Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Name</label>
          <input
            type="text"
            {...register('schoolName', { required: 'School Name is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolName && <span className="text-red-500 text-sm">{errors.schoolName.message}</span>}
        </div>

         {/* School Address */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Address</label>
          <input
            type="text"
            {...register('schoolAddress', { required: 'School  Address is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolAddress && <span className="text-red-500 text-sm">{errors.schoolAddress.message}</span>}
          {/* {errors.schoolAddress && <p className="text-red-500 text-xs mt-1">{errors.schoolAddress.message}</p>} */}
        </div>

         {/* School Phone */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Phone</label>
          <input
            type="text"
            {...register('schoolPhone', { required: 'School phone is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolPhone && <span className="text-red-500 text-sm">{errors.schoolPhone.message}</span>}
        </div>

         {/* School Email */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Email</label>
          <input
            type="email"
            {...register('schoolEmail', { required: 'School email is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolEmail && <span className="text-red-500 text-sm">{errors.schoolEmail.message}</span>}
        </div>

         {/* School Motto */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Motto</label>
          <input
            type="text"
            {...register('schoolMotto', { required: 'School motto is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolMotto && <span className="text-red-500 text-sm">{errors.schoolMotto.message}</span>}
        </div>

         {/* School Website */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Website</label>
          <input
            type="text"
            {...register('schoolWebsite', { required: 'School website is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolWebsite && <span className="text-red-500 text-sm">{errors.schoolWebsite.message}</span>}
        </div>

         {/* School Code */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Code</label>
          <input
            type="text"
            {...register('schoolCode', { required: 'School code is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolCode && <span className="text-red-500 text-sm">{errors.schoolCode.message}</span>}
        </div>

           {/* Postal code */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            {...register('postalCode', { required: 'Postal code is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
        </div>

         {/* city */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            {...register('city', { required: 'City is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
        </div>

         {/* state */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            {...register('state', { required: 'State is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
        </div>

        {/* Country */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            {...register('country', { required: 'Country is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
        </div>

        {/* logo */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">School Logo</label>
          <input
            type="file"
            {...register('schoolLogo', { required: 'School logo is required' })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.schoolLogo && <span className="text-red-500 text-sm">{errors.schoolLogo.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}  // Disable button during loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {/* Display the SchoolDetail component if submission was successful */}
        {schoolDetail && <SchoolDetail school={schoolDetail} />} 
    </div>
  );
};

export default AddSchool;

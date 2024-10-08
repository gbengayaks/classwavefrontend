import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitSchoolData } from './schoolSlice'; // Thunks from the slice
import { useNavigate } from 'react-router-dom';

const AddSchool = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoUrl, loading, error } = useSelector((state) => state.school); // Access Redux state
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [logoFile, setLogoFile] = useState(null);
  const token = useSelector((state) => state.auth.user.data.token);

   // Handle file input
   const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log('data', data);
    console.log('token', token);
    if (!logoFile) {
      alert('Please select a file first!');
      // // First, upload the logo
      // const result = dispatch(uploadSchoolLogo(logoFile));
      // if (result.meta.requestStatus === 'fulfilled') {
      //   // Add the logo URL to the form data
      //   const schoolData = {
      //     ...data,
      //     schoolLogo: result.payload, // Use the returned logo URL
      //   };
      //   // Submit the school data
      //   dispatch(submitSchoolData(schoolData)).then(() => {
      //     alert('School data submitted successfully');
      //     reset(); // Reset the form after successful submission
      //   });
      // } else {
      //   alert('Failed to upload school logo');
      // }
    } 

    dispatch(submitSchoolData({ data, file: logoFile, token: token })).then((result) => {
      
      if (result.payload.status === 200) {
        alert('School data submitted successfully');
        reset();
        //navigate("/dashboard"); // Redirect to the dashboard on successful login
       } else {
        alert('Error while changing profile picture');
        navigate("/dashboard");
       }
      });
      
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add School</h2>

      {/* Display errors or loading state */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-blue-500 mb-4">Submitting...</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* School Logo */}
        <div className="form-group">
          <label htmlFor="schoolLogo" className="block text-sm font-medium text-gray-700">School Logo</label>
          <input
            type="file"
            id="schoolLogo"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            onChange={handleLogoChange}
          />
        </div>

        {/* School Name */}
        <div className="form-group">
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
          <input
            type="text"
            id="schoolName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolName', { required: 'School Name is required' })}
          />
          {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>}
        </div>

        {/* School Motto */}
        <div className="form-group">
          <label htmlFor="schoolMotto" className="block text-sm font-medium text-gray-700">School Motto</label>
          <input
            type="text"
            id="schoolMotto"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolMotto', { required: 'School Name is required' })}
          />
          {errors.schoolMotto && <p className="text-red-500 text-xs mt-1">{errors.schoolMotto.message}</p>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="schoolAddress"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolAddress', { required: 'Address is required' })}
          />
          {errors.schoolAddress && <p className="text-red-500 text-xs mt-1">{errors.schoolAddress.message}</p>}
        </div>

        {/* State */}
        <div className="form-group">
          <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            id="state"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('state', { required: 'State is required' })}
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.schoolAddress.message}</p>}
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('city', { required: 'city is required' })}
          />
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            id="country"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('country', { required: 'Country is required' })}
          />
          {errors.schoolAddress && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="schoolEmail" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="schoolEmail"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolEmail', { required: 'Email is required' })}
          />
          {errors.schoolEmail && <p className="text-red-500 text-xs mt-1">{errors.schoolEmail.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="schoolPhone" className="block text-sm font-medium text-gray-700">School Phone</label>
          <input
            type="text"
            id="schoolPhone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolPhone', { required: 'Phone Number is required' })}
          />
          {errors.schoolPhone && <p className="text-red-500 text-xs mt-1">{errors.schoolPhone.message}</p>}
        </div>

        {/* postal Code */}
        <div className="form-group">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('postalCode', { required: 'postal Code is required' })}
          />
          {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
        </div>

        {/* School code */}
        <div className="form-group">
          <label htmlFor="schoolCode" className="block text-sm font-medium text-gray-700">School Code</label>
          <input
            type="text"
            id="schoolCode"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolCode', { required: 'School Code is required' })}
          />
          {errors.schoolCode && <p className="text-red-500 text-xs mt-1">{errors.schoolCode.message}</p>}
        </div>

        {/* School website */}
        <div className="form-group">
          <label htmlFor="schoolWebsite" className="block text-sm font-medium text-gray-700">School Website</label>
          <input
            type="text"
            id="schoolWebsite"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            {...register('schoolWebsite', { required: 'School website is required' })}
          />
          {errors.schoolCode && <p className="text-red-500 text-xs mt-1">{errors.schoolCode.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchool;

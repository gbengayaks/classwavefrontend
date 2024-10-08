import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePicture } from '../../features/auth/authSlice'; // Import the async thunk
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProfilePictureUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth); // Access status and error from Redux store
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const token = useSelector((state) => state.auth.user.data.token);
  const email = useSelector((state) => state.auth.user.data.userDetails.email);

  
  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = () => {
    if (!selectedFile) {
      alert('Please select a file first!');
    
    }

    // Dispatch the uploadProfilePicture action with email and selected file
    dispatch(uploadProfilePicture({ email, file: selectedFile, token: token })).then((result) => {
      if (result.payload.status === 200) {
        alert('Profile picture replaced successfully');
        navigate("/dashboard"); // Redirect to the dashboard on successful login
       } else {
        alert('Error while changing profile picture');
        navigate("/dashboard");
       };
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Profile Picture</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label> */}
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 p-2 rounded sr-only"
            defaultValue="clintonty@yahoo.ca"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Select Profile Picture:</label>
          <input type="file" id="file" onChange={handleFileChange} className="mt-1 block w-full" />
        </div>
        <button type="submit" 
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {status === 'loading' ? 'Uploading...' : 'Upload Picture'}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ProfilePictureUpload;

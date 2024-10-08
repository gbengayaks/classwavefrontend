import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to handle profile picture upload
export const uploadProfilePicture = createAsyncThunk(
  'profile/uploadProfilePicture',
  async ({ email, file, token }, { rejectWithValue }) => {
    try {
      
      // Step 1: Upload image to storage API
      const formData = new FormData();
      formData.append('myimage', file);
      formData.append('email', email);

      const storageResponse = await axios.put(
        'https://storage.michofat.com/addsingleimage',
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      // Check if storage upload was successful
      if (storageResponse.status === 200) {
        const profileImageUrl = storageResponse.data; // Assuming response.data contains the URL

         console.log(profileImageUrl);
        // Step 2: Send the profile picture URL to backend
        const classwaveBaseUrl = 'https://classwavebe.onrender.com/classwave/v1/uploadProfilePix'; // Your base URL

        const patchResponse = await axios.patch(classwaveBaseUrl,
          {
            email,
            profilePicture: profileImageUrl,
          },
          {
          headers: { 
            'Authorization': `Bearer ${token}`, 
          }
        }
        );

        if (patchResponse.status === 200) {
          return patchResponse.data;  // Return the success response
        } else {
          throw new Error('Failed to update profile picture on the backend.');
        }
      } else {
        throw new Error('Failed to upload image to storage.');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profilePicture: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profilePicture = action.payload;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { 
  resetUploadState } = profileSlice.actions;
export default profileSlice.reducer;

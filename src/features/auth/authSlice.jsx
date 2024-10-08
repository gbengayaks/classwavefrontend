import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import storageResponse from '../../utils/singleImageUpload';
import axios from 'axios';

// Initial state
const initialState = {
  user: null,
  loading: false,
  status: "",
  error: "",
  success: null,
  token: localStorage.getItem('token') || null,
};

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://classwave.michofat.com/classwave/v1/register', formData);
      return response.data; // Assume response contains user info and token
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Async thunk for activate account
export const activateEmail = createAsyncThunk(
  'auth/activateEmail',
  async (activationCode, { rejectWithValue }) => {
    //console.log(activationCode);
    try {
      const response = await axios.patch('https://classwave.michofat.com/classwave/v1/emailActivation', activationCode );
      console.log('result', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Activation failed');
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://classwave.michofat.com/classwave/v1/login', formData);
      const request = await response.data.data;
      localStorage.setItem('token', JSON.stringify(request));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message
      return rejectWithValue(message);
    }
  }
);

// Request reset code
export const requestResetCode = createAsyncThunk(
  'auth/requestResetCode',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://classwave.michofat.com/classwave/v1/requestResetCode', email);
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Reset password with code
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, resetCode, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://classwave.michofat.com/classwave/v1/resetPassword', { email, resetCode, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


//Async thunk for change password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ password}, {getState, rejectWithValue }) => {
    try {
      // Retrieve the token & email from the Redux state or localStorage
      const token = getState().auth.user.data.token;
      const email = getState().auth.user.data.userDetails.email;

      const response = await axios.post('https://classwave.michofat.com/classwave/v1/changePassword', { email, password }, {
        headers: {
          Authorization: `Bearer ${token}`, // attach the token
        },
      });

      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'password failed');
    }
  }
);

// Async thunk for uploading the profile picture
export const uploadProfilePicture = createAsyncThunk(
  'auth/uploadProfilePicture',
  async ({ email, file, token }, { rejectWithValue }) => {
    try {
      
      // Step 1: Upload image to storage API
      const formData = new FormData();
      formData.append('myimage', file);
      formData.append('email', email);

        // <storageResponse />

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
        const classwaveBaseUrl = 'https://classwave.michofat.com/classwave/v1'; // Your base URL

        const patchResponse = await axios.patch(
          `${classwaveBaseUrl}/uploadProfilePix`,
          {
            email,
            profilePicture: profileImageUrl,
          },
          {
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
        }
        );

        if (patchResponse.status === 200) {
          console.patchResponse.data;
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

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, {getState, rejectWithValue }) => {
    try {
      // Retrieve the token & email from the Redux state or localStorage
      const token = getState().auth.user.data.token;
      const response = await axios.patch('https://classwave.michofat.com/classwave/v1/editProfile', userData, {
        headers: {
          Authorization: `Bearer ${token}`, // attach the token
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = '';
      localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Persist token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },

    resetUploadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        // localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      // Handle activation
      .addCase(activateEmail.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(activateEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Account activated successfully';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(activateEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


    // Handle Login
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      if (state.user === action.payload) {
        state.success = 'Login successful';
      } 
      state.token = action.payload.token; // Assuming API returns user info after activation
  
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      //console.log(action.error.message);
      if (action.error.message === 'Rejected') {
        state.error = 'Sorry, account does not exist or has not been activated. Check your email for activation code';
      }
    })

    // Handle request reset code
      .addCase(requestResetCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestResetCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Reset code sent successfully!';
        state.error = null;
      })
      .addCase(requestResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send reset code.';
      })

    // Handle reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Password reset successfully!';
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reset password.';
      })

        //Handle password change 
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Password changed successfully!';
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to change password.';
      })

        //Handle Profile Picture upload
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = 'Profile picture replaced successfully';
        state.error = null;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Error while changing profile picture';
      })


      //Handle edit profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Error while updating profile';
      });
  },
});

export const { 
  logout, 
  setToken, 
  clearToken, 
  clearMessages, 
  resetUploadState } = authSlice.actions;
export default authSlice.reducer;

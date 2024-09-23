import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: "",
  success: null,
  token: localStorage.getItem('token') || null,
};

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://classwavebe.onrender.com/classwave/v1/register', formData);
        console.log(response.data.data.emailCode);
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
      const response = await axios.patch('https://classwavebe.onrender.com/classwave/v1/emailActivation', activationCode );
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
      const response = await axios.post('https://classwavebe.onrender.com/classwave/v1/login', formData);
      const request = await response.data.data;
      //console.log(request);
      localStorage.setItem('token', JSON.stringify(request));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);


//Async thunk for change password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://classwavebe.onrender.com/classwave/v1/changePassword', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'password failed');
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

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
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

    // Handle Password change
    .addCase(changePassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      if (state.user === action.payload) {
        state.success = 'Login successful';
      } 
      state.token = action.payload.token; // Assuming API returns user info after activation
  
    })
    .addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      //console.log(action.error.message);
      if (action.error.message === 'Rejected') {
        state.error = 'Sorry, account does not exist or has not been activated. Check your email for activation code';
      }
    })
    
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;

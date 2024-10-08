import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//initial State
const initialState = {
  logoUrl: null,
  loading: false,
  error: null,
  status: '',
};

// Thunk to upload the school logo
export const submitSchoolData = createAsyncThunk('school/submitSchoolData', 
  async ( {data, file, token}, { rejectWithValue }) => {
    console.log('dataItems', data);
    console.log('token', token);
    console.log('file', file);
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.put('https://storage.michofat.com/addsingleimage', 
      formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.status === 200) {
      const logoUrl = response.data; // Assuming response.data contains the URL

       console.log(logoUrl);

      // Step 2: Send the profile picture URL to backend
      const patchResponse = await axios.post(
        'https://classwave.michofat.com/classwave/v1/schoolManager/addschool',
        {
          data,
          schoolLogo: logoUrl,
        },
        {
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
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


// Thunk to submit the school data along with the logo URL

// export const submitSchoolData = createAsyncThunk('school/submitSchoolData', async (schoolData, { getState, rejectWithValue }) => {
//   try {
//     const token = getState().auth.user.data.token;
//     console.log(token);
//     const response = await axios.post('https://classwave.michofat.com/classwave/v1/schoolManager/addschool', schoolData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     const message = error.response?.data?.message || error.message;
//     return rejectWithValue(message);
//   }
// });

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle submitSchoolData
      .addCase(submitSchoolData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSchoolData.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful school submission
      })
      .addCase(submitSchoolData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;

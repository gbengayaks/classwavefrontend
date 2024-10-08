import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to handle the API submission using Axios
export const addSchool = createAsyncThunk(
  'school/addSchool',
  async (schoolData, { rejectWithValue }) => {


    try {
      const response = await axios.post('https://classwave.michofat.com/classwave/v1/schoolManager/addschool', schoolData);
      return response.data; // Return the data from the Axios response
    } catch (error) {
      // Axios error handling
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    schools: [],
    schoolDetail: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add additional synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolDetail = action.payload;
        state.schools.push(action.payload); // Optionally add the new school to the list
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;

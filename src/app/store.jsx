import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
//import { addSchool } from '../features/auth/schoolSlice';
import schoolReducer from '../addschool/schoolSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    school: schoolReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       ignoredActions: ['school/addSchool/pending', 'school/addSchool/fulfilled', 'school/addSchool/rejected'],
  //       // Ignore these paths in the state
  //       ignoredPaths: ['school.schoolDetail'],
  //     },
  //   }),
});

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './authslice/userSlice.js'

export const store = configureStore({
  reducer: {
    user : userReducer
  },
})
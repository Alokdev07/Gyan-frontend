import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload
    },
    logoutUser: (state) => {
      state.data = null
    },
  },
})

export const { addUser, logoutUser } = userSlice.actions
export default userSlice.reducer

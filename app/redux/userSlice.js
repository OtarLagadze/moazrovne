import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_uid: null,
  userEmail: null,
  userId: null,
  userCode: null,
  userFirstName: null,
  userLastName: null,
  userDisplayName: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user_uid = action.payload.user_uid
      state.userEmail = action.payload.userEmail
      state.userId = action.payload.userId
      state.userCode = action.payload.userCode
      state.userFirstName = action.payload.userFirstName
      state.userLastName = action.payload.userLastName
      state.userDisplayName = action.payload.userDisplayName
    },
    setLogOutUser: state => {
      state.user_uid = null
      state.userEmail = null
      state.userId = null
      state.userCode = null
      state.userFirstName = null
      state.userLastName = null
      state.userDisplayName = null
    }
  }
});

export const {
  setActiveUser,
  setLogOutUser
} = userSlice.actions

export const selectUser_uid = state => state.user.user_uid
export const selectUserEmail = state => state.user.userEmail
export const selectUserId = state => state.user.userId
export const selectUserCode = state => state.user.userCode
export const selectUserFirstName = state => state.user.userFirstName
export const selectUserLastName = state => state.user.userLastName
export const selectUserDisplayName = state => state.user.userDisplayName

export default userSlice.reducer
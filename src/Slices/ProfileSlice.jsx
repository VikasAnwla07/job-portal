// import { createSlice } from "@reduxjs/toolkit";
// import { updateProfile } from "../Services/ProfileService";
// const ProfileSlice = createSlice({
//   name: "profile",
//   initialState: {},
//   reducers: {
//     changeProfile: (state, action) => {
//       state = updateProfile(action.payload);
//       return action.payload;
//     },
//     setProfile: (state, action) => {
//       state = action.payload;
//       return state;
//     },
//   },
// });

// export const { changeProfile, setProfile } = ProfileSlice.actions;
// export default ProfileSlice.reducer;

// src/Slices/ProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { profile as defaultProfile } from "../Data/TalentData";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: defaultProfile, // initialize from local file
  reducers: {
    setProfile: (state, action) => {
      return action.payload;
    },
    changeProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProfile, changeProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;

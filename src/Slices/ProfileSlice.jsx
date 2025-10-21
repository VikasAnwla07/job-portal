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

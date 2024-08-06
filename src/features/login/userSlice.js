import { createSlice } from "@reduxjs/toolkit";


const initialStateValue = {
    name: "",
    email: "",
    uid: null
}

const userSlice = createSlice({
  name: "user",
  initialState: {value: {initialStateValue}},
  reducers: {
    login: (state, action) => {
        state.value = action.payload;
    },
    logout: (state) => {
        state.value = initialStateValue;
    },
  },
});

export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
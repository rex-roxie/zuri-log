import { createSlice } from "@reduxjs/toolkit";


const initialStateValue = {
    first_name: "",
    last_name: "",
    email: "",
    phone: 0,
    medical_card_number: 0,
    medical_card_expiry_date: "",
    truck_number: 0,
    driver_license_numbers: 0,
    driver_license_expiry_date: "",
    certification: "",
    citizenship: ""
}

const driverSlice = createSlice({
  name: "driver",
  initialState: {value: [{initialStateValue}]},
  reducers: {
    addDriver: (state, action) => {
        state.value = [...state.value, action.payload];
    },
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
import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "Userdata-storage",
  initialState: {
    _id: "",
    name: "",
    city: "",
    address: "",
    pincode: "",
    email: "",
    phone: "",
    type: "",
    token: "",
  },

  reducers: {
    userData: (state, action) => {
      // console.log("action: ", action);
      const { token, user } = action.payload;

      state.token = token;

      const { _id, address, city, email, name, phone, pincode, type } = user;

      state._id = _id;
      state.name = name;
      state.city = city;
      state.pincode = pincode;
      state.email = email;
      state.phone = phone;
      state.type = type;
      state.address = address;
      console.log("user state._id: ", state._id);
      console.log("user state.name: ", state.name);
      console.log("user state.city: ", state.city);
      console.log("user state.pincode: ", state.pincode);
      console.log("user state.email: ", state.email);
      console.log("user state.phone: ", state.phone);
      console.log("user state.type: ", state.type);
      console.log("user state.address: ", state.address);
    },
  },
});

export const { userData } = userDataSlice.actions;
export default userDataSlice.reducer;

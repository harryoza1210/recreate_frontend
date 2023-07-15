import { createSlice } from "@reduxjs/toolkit";

const workerDataSlice = createSlice({
  name: "workerdata-storage",
  initialState: {
    _id: "",
    name: "",
    city: "",
    State: "",
    pincode: "",
    email: "",
    phone: "",
    type: "",
    token: "",
    profession: "",
    workerExperience: "",
  },

  reducers: {
    workerData: (state, action) => {
      // console.log("action: ", action);
      const { token, user } = action.payload;

      state.token = token;

      const {
        _id,
        city,
        email,
        name,
        phone,
        pincode,
        type,
        profession,
        workerExperience,
      } = user;

      state._id = _id;
      state.name = name;
      state.city = city;
      state.pincode = pincode;
      state.email = email;
      state.phone = phone;
      state.type = type;
      state.State = user.state;
      state.profession = profession;
      state.workerExperience = workerExperience;
      console.log("worker state._id: ", state._id);
      console.log("worker state.name: ", state.name);
      console.log("worker state.city: ", state.city);
      console.log("worker state.pincode: ", state.pincode);
      console.log("worker state.email: ", state.email);
      console.log("worker state.phone: ", state.phone);
      console.log("worker state.type: ", state.type);
      console.log("state.State: ", state.State);
    },
  },
});

export const { workerData } = workerDataSlice.actions;
export default workerDataSlice.reducer;

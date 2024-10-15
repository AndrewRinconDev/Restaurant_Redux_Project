import { createSlice } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
  name: "usuarioSlice",
  initialState: {
    userData: {
      id: "",
      nombres: "",
      apellidos: "",
      role: "",
    },
  },
  reducers: {
    setUserDataAction: (state, action) => {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
    },
  },
});

export const { setUserDataAction } = usuarioSlice.actions;

export default usuarioSlice.reducer;

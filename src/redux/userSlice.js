import { createSlice } from "@reduxjs/toolkit";

const safeParse = (item) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState = {
  token: localStorage.getItem("token") || null,
  user: safeParse(localStorage.getItem("user")),
  parkingLot: safeParse(localStorage.getItem("parkingLot")),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // persist to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    setParkingLot(state, action) {
      state.parkingLot = action.payload.parkingLot;

      localStorage.setItem(
        "parkingLot",
        JSON.stringify(action.payload.parkingLot)
      );
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.parkingLot = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("parkingLot");
    },
  },
});

export const { setUser, setParkingLot, logout } = userSlice.actions;
export default userSlice.reducer;

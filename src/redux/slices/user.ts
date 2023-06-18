import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  accessToken: string;
  isAuth: boolean;
}

const initialState: IUser = { email: "", accessToken: "", isAuth: false };

interface Payload {
  email?: string;
  accessToken?: string;
  isAuth?: boolean;
}

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (
      state,
      { payload: { email, accessToken, isAuth } }: { payload: Payload }
    ) => {
      state.email = email ? email : state.email;
      state.accessToken = accessToken ? accessToken : state.accessToken;
      state.isAuth = typeof isAuth === "boolean" ? isAuth : state.isAuth;
    },
  },
});

export const { initUser } = userReducer.actions;
export default userReducer.reducer;

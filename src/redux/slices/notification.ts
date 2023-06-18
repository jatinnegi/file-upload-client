import { createSlice } from "@reduxjs/toolkit";

interface INotification {
  message: string;
}

const initialState: INotification = { message: "" };

interface Payload {
  message?: string;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    add: (state, { payload: { message } }: { payload: Payload }) => {
      if (!message || state.message.trim() !== "") return;

      state.message = message;
    },
    remove: (state) => {
      state.message = "";
    },
  },
});

export const { add, remove } = notificationSlice.actions;
export default notificationSlice.reducer;

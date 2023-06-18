import { createSlice } from "@reduxjs/toolkit";

interface Properties {
  name: string;
  size: number;
  items: number;
  type: string;
  createdAt: string;
  modifiedAt: string;
  shared: string[];
}

const initialState: Properties = {
  name: "",
  size: 0,
  items: 0,
  type: "",
  createdAt: "",
  modifiedAt: "",
  shared: [],
};

interface Payload {
  target?: Properties;
}

const propertiesReducer = createSlice({
  name: "properties",
  initialState,
  reducers: {
    initProperties: (state, { payload: { target } }: { payload: Payload }) => {
      if (!target) return;

      state.name = target.name;
      state.items = target.items;
      state.size = target.size;
      state.type = target.type;
      state.createdAt = target.createdAt;
      state.modifiedAt = target.modifiedAt;
      state.shared = state.shared;
    },
    resetProperties: (state) => {
      state.name = "";
      state.items = 0;
      state.size = 0;
      state.type = "";
      state.shared = [];
    },
  },
});

export const { initProperties, resetProperties } = propertiesReducer.actions;
export default propertiesReducer.reducer;

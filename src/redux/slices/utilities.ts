import { createSlice } from "@reduxjs/toolkit";

interface UtilitiesProps {
  path: string;
  isFolder: boolean;
  create: boolean;
  rename: boolean;
  delete: boolean;
}

const initialState: UtilitiesProps = {
  path: "",
  isFolder: false,
  create: false,
  rename: false,
  delete: false,
};

interface Payload {
  path: string;
  isFolder: boolean;
  create: boolean;
  rename: boolean;
  delete: boolean;
}

const utilitiesReducer = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    updateUtilities: (
      state,
      {
        payload: { path, isFolder, create, rename, delete: utilityDelete },
      }: { payload: Payload }
    ) => {
      state.path = path;
      state.isFolder = isFolder;
      state.create = create;
      state.rename = rename;
      state.delete = utilityDelete;
    },
  },
});

export const { updateUtilities } = utilitiesReducer.actions;
export default utilitiesReducer.reducer;

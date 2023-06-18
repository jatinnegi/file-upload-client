import { createSlice } from "@reduxjs/toolkit";

export interface WorkspaceProps {
  name: string;
  items: number;
  size: number;
  type: string;
  createdAt: string;
  modifiedAt: string;
}

interface UserWorkspace {
  path: string;
  files: WorkspaceProps[];
  folders: WorkspaceProps[];
}

const initialState: UserWorkspace = {
  path: "",
  files: [],
  folders: [],
};

interface Payload {
  path?: string;
  files?: WorkspaceProps[];
  folders?: WorkspaceProps[];
}

const workspaceReducers = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    initWorkspace: (
      state,
      { payload: { files, folders } }: { payload: Payload }
    ) => {
      if (!files || !folders) return;
      state.files = files;
      state.folders = folders;
    },
    updateWorkspace: (
      state,
      { payload: { files, folders } }: { payload: Payload }
    ) => {
      if (!files || !folders) return;

      state.files = [...state.files, ...files];
      state.folders = [...state.folders, ...folders];
    },
    setWorkspacePath: (state, { payload: { path } }: { payload: Payload }) => {
      if (typeof path === "undefined") return;
      state.path = path;
    },
  },
});

export const { initWorkspace, updateWorkspace, setWorkspacePath } =
  workspaceReducers.actions;
export default workspaceReducers.reducer;

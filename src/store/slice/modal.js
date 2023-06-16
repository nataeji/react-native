import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  title: "",
  content: "",
  contentType: "text",
  confirmFn: null,
  cancelFn: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.visible = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.contentType = action.payload.contentType === "" ? "text" : "element";
      state.confirmFn = action.payload.confirmFn;
      state.cancelFn = action.payload.cancelFn;
    },
    closeModal: (state, action) => {
      state.visible = false;
      state.title = "";
      state.content = "";
      state.contentType = "text";
      state.confirmFn = null;
      state.cancelFn = null;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;


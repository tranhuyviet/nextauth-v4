import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostPopulate } from "../../utils/types";

const initialState = {
  post: <IPostPopulate>{
    _id: "",
    content: "",
    createdAt: "",
    user: {
      _id: "",
      name: "",
      image: "",
    },
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    selectedPost: (state, action: PayloadAction<IPostPopulate>) => {
      state.post = action.payload;
    },
  },
});

export const { selectedPost } = postSlice.actions;
export default postSlice.reducer;

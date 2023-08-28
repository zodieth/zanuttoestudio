import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
    name: "detail",
    initialState: {
      isLoading: true,
      detail: [{}],
      detailCopy: [{}],
    },
  
    reducers: {
      addDetail: (state, action) => {
        // if(action.payload.length){
        //   console.log("EEEEEEE")
        //   state.detail = action.payload;
        // } else {
        //   state.detail = ...state.detail,action.payload;
        // }
        state.detail = action.payload;
        state.detailCopy = action.payload;
        state.isLoading = false;
      },
      editDetail: (state, action) => {
        const findDetail = state.detail.map((e) => {
          if (e._id === action.payload._id) {
            e = action.payload;
          }
          return e;
        });
        state.detailCopy = findDetail;
        state.detail = findDetail;
      },
      deleteDetail: (state, action) => {
        state.detail = state.detail.filter((e) => action.payload !== e._id);
        state.detailCopy = state.detailCopy.filter(
          (e) => action.payload !== e._id
        );
      },
    },
  });
  
  export const {
    addDetail,
    editDetail,
    deleteDetail,
  } = detailSlice.actions;

  export default detailSlice.reducer;

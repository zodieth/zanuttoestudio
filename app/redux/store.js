import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";
import detailSlice from "./features/detailSlice";

export default configureStore({
  reducer: {
    people: peopleSlice,
    detail: detailSlice
  },
});

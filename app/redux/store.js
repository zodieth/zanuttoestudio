import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";

export default configureStore({
  reducer: {
    people: peopleSlice,
  },
});

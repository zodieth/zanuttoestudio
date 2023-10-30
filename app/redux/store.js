import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";
import detailSlice from "./features/detailSlice";
import citaSlice from "./features/citaSlice";

export default configureStore({
  reducer: {
    people: peopleSlice,
    detail: detailSlice,
    citas: citaSlice
  },
});

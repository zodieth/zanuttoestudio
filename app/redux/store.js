import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./features/peopleSlice";
import detailSlice from "./features/detailSlice";
import citaSlice from "./features/citaSlice";
import calendarioSlice from "./features/calendarioSlice";

export default configureStore({
  reducer: {
    people: peopleSlice,
    detail: detailSlice,
    citas: citaSlice,
    calendario: calendarioSlice
  },
});

import { createSlice } from "@reduxjs/toolkit";


export const citaSlice = createSlice({
    name: "cita",
    initialState: {
      isLoading: true,
      cita: [{}],
      citaCopy: [{}],
    },
  
    reducers: {
      addCita: (state, action) => {
        state.cita = action.payload;
        state.citaCopy = action.payload;
        state.isLoading = false;
      },
      editCita: (state, action) => {
        const findCita = state.cita.map((e) => {
          if (e._id === action.payload._id) {
            e = action.payload;
          }
          return e;
        });
        state.citaCopy = findCita;
        state.cita = findCita;
      },
      deleteCita: (state, action) => {
        state.cita = state.cita.filter((e) => action.payload !== e._id);
        state.citaCopy = state.citaCopy.filter(
          (e) => action.payload !== e._id
        );
      },
    },
  });
  
  export const {
    addCita,
    editCita,
    deleteCita,
  } = citaSlice.actions;

  export default citaSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


export const calendarioSlice = createSlice({
    name: "calendario",
    initialState: {
      isLoading: true,
      calendario: [{}],
      calendarioCopy: [{}],
    },
  
    reducers: {
      addCalendario: (state, action) => {
        state.calendario = action.payload;
        state.calendarioCopy = action.payload;
        state.isLoading = false;
      },
      editCalendario: (state, action) => {
        const findCalendario = state.calendario.map((e) => {
          if (e._id === action.payload._id) {
            e = action.payload;
          }
          return e;
        });
        state.calendarioCopy = findCalendario;
        state.calendario = findCalendario;
      },
      deleteCalendario: (state, action) => {
        console.log(action.payload);

        state.calendario = state.calendario.filter((e) => action.payload !== e._id);
        state.calendarioCopy = state.calendarioCopy.filter(
          (e) => action.payload !== e._id
        );
      },
    },
  });
  
  export const {
    addCalendario,
    editCalendario,
    deleteCalendario,
  } = calendarioSlice.actions;

  export default calendarioSlice.reducer;
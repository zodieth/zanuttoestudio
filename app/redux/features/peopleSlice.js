import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    isLoading: true,
    people: [{}],
  },
  reducers: {
    addPeople: (state, action) => {
      state.people = action.payload;
      state.isLoading = false;
    },
    editPerson: (state, action) => {
      const findPerson = state.people.map((e) => {
        if (e._id === action.payload._id) {
          console.log(action.payload);
          e = action.payload;
        }
        return e;
      });

      state.people = findPerson;
    },
    deletePerson: (state, action) => {
      state.people = state.people.filter((e) => action.payload !== e._id);
    },
  },
});

export const { addPeople, editPerson, deletePerson } = peopleSlice.actions;

export default peopleSlice.reducer;

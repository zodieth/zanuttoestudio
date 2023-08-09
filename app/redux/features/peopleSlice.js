import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    isLoading: true,
    people: [{}],
    peopleCopy: [{}],
  },

  reducers: {
    addPeople: (state, action) => {
      state.people = action.payload;
      state.peopleCopy = action.payload;
      state.isLoading = false;
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    editPerson: (state, action) => {
      const findPerson = state.people.map((e) => {
        if (e._id === action.payload._id) {
          e = action.payload;
        }
        return e;
      });
      state.peopleCopy = findPerson;
      state.people = findPerson;
    },
    deletePerson: (state, action) => {
      state.people = state.people.filter((e) => action.payload !== e._id);
      state.peopleCopy = state.peopleCopy.filter(
        (e) => action.payload !== e._id
      );
    },
    filterStatus: (state, action) => {
      const people = [...state.peopleCopy];

      state.people = people.filter((e) =>
        action.payload === "todos" ? e : e.status.includes(action.payload)
      );
    },
  },
});

export const {
  addPeople,
  editPerson,
  deletePerson,
  filterStatus,
  changeLoading,
} = peopleSlice.actions;

export default peopleSlice.reducer;

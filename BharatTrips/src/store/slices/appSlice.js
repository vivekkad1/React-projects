import { createSlice } from "@reduxjs/toolkit";
import { getToday } from "../../utils/dateUtils";

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("searchParams");
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);

    if (parsedState.date) parsedState.date = new Date(parsedState.date);
    if (parsedState.returnDate)
      parsedState.returnDate = new Date(parsedState.returnDate);
    return parsedState;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const defaultSearchParams = {
  type: "flights",
  from: {
    code: "HYD",
    name: "Hyderabad",
    desc: "Rajiv Gandhi International Airport, India",
  },
  to: {
    code: "BLR",
    name: "Bengaluru",
    desc: "Kempegowda Int Airport, India",
  },
  date: getToday(),
  returnDate: null,
  travelers: {
    adults: 1,
    children: 0,
    infants: 0,
    class: "Economy/Premium Economy",
  },
  rooms: 1,
  trainClass: "ALL",
  time: "10:00 AM",
};

const initialState = {
  searchParams: loadState() || defaultSearchParams,
  user: null,
  currency: "INR",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };

      try {
        sessionStorage.setItem(
          "searchParams",
          JSON.stringify(state.searchParams),
        );
      } catch (err) {
        console.error("Could not save state", err);
      }
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { updateSearchParams, login, logout, setCurrency } =
  appSlice.actions;

export default appSlice.reducer;

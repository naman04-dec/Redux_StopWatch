// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRunning: false,
  elapsedTime: 0,
  laps: [],
  intervalId: null,
};

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState,
  reducers: {
    start: (state, action) => {
      state.isRunning = true;
      state.intervalId = action.payload;
    },
    stop: (state) => {
      state.isRunning = false;
      clearInterval(state.intervalId);
    },
    reset: (state) => {
      clearInterval(state.intervalId);
      return initialState;
    },
    tick: (state) => {
      state.elapsedTime += 10;
    },
    lap: (state) => {
      state.laps = [state.elapsedTime, ...state.laps];
    },
  },
});

export const { start, stop, reset, tick, lap } = stopwatchSlice.actions;

export const store = configureStore({
  reducer: {
    stopwatch: stopwatchSlice.reducer,
  },
});

// StopWatch.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { start, stop, reset, tick, lap } from "./store";

const formatTime = (time) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    `${hours.toString().padStart(2, "0")}:` +
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}.` +
    `${milliseconds.toString().padStart(2, "0")}`
  );
};

const StopWatch = () => {
  const dispatch = useDispatch();
  const { isRunning, elapsedTime, laps } = useSelector(
    (state) => state.stopwatch
  );

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        dispatch(tick());
      }, 10);
      dispatch(start(intervalId));
    }
  }, [isRunning, dispatch]);

  return (
    <div>
      <h1>{formatTime(elapsedTime)}</h1>
      <div>
        {!isRunning ? (
          <button onClick={() => dispatch(start())}>Start</button>
        ) : (
          <button onClick={() => dispatch(stop())}>Stop</button>
        )}
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(lap())} disabled={!isRunning}>
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div>
          <h3>Laps:</h3>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>{formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatch;

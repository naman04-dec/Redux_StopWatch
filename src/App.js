import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import StopWatch from "./StopWatch";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StopWatch />
      </div>
    </Provider>
  );
}

export default App;

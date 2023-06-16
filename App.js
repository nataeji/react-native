import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import AppNavigation from "./AppNavigation";

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
export default App;
